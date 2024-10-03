"use server"

import { client } from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs/server"

export const onAuthenticatedUser = async () => {
    try {
        const clerk = await currentUser()

        if (!clerk) {
            return { status: 404 }
        }

        const user = await client.user.findUnique({
            where: { clerkId: clerk.id },
            select: {
                id: true,
                firstName: true,
                lastName: true,
            },
        })
    } catch (error: any) {
        console.error(error.message)
    }
}
