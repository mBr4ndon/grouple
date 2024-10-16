import { Card } from "@/components/ui/card"
import { truncateString } from "@/lib/utils"
import Link from "next/link"

interface Props {
    id: string
    name: string
    category: string
    createdAt: Date
    userId: string
    thumbnail: string | null
    description: string | null
    privacy: "PUBLIC" | "PRIVATE"
    preview?: string
}

const GroupCard = ({
    id,
    name,
    category,
    createdAt,
    userId,
    thumbnail,
    description,
    privacy,
    preview,
}: Props) => {
    return (
        <Link href={`/about/${id}`}>
            <Card className="bg-themeBlack border-themeGray rounded-xl overflow-hidden">
                <img
                    src={preview || `https://ucarecdn.com/${thumbnail}/`}
                    alt="thumbnail"
                    className="w-full opacity-70 h-56"
                />

                <div className="p-6">
                    <h3 className="text-lg text-themeGray font-bold">{name}</h3>

                    <p className="text-base text-themeTextGray">
                        {description && truncateString(description)}
                    </p>
                </div>
            </Card>
        </Link>
    )
}

export default GroupCard
