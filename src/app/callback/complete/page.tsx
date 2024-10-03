import { onSignUpUser } from "@/actions/auth"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

const CompleteOAuthAfterCallback = async () => {
    const user = await currentUser()

    if (!user) {
        redirect("/sign-in")
    }

    const complete = await onSignUpUser({
        firstName: user.firstName as string,
        lastName: user.lastName as string,
        image: user.imageUrl,
        clerkId: user.id,
    })

    if (complete.status == 200) {
        redirect(`/group/create`)
    } else {
        redirect("/sign-in")
    }
}

export default CompleteOAuthAfterCallback
