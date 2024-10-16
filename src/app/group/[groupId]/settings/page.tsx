import GroupSettingsForm from "@/components/forms/group-settings"

interface Props {
    params: { groupId: string }
}

const GroupSettingsPage = ({ params: { groupId } }: Props) => {
    return (
        <div className="flex flex-col w-full h-full gap-10 px-16 py-10 overflow-auto">
            <div className="flex flex-col">
                <h3 className="text-3xl font-bol">Group Settings</h3>

                <p className="text-sm text-themeGray">
                    Adjust your group settings here. These settings might take
                    time to reflect on the explore page.
                </p>
            </div>

            <GroupSettingsForm groupId={groupId} />
        </div>
    )
}

export default GroupSettingsPage
