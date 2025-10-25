import ChatPopover from "../components/ChatPopover";
import ParentPortal from "../components/ParentPortal";
import PublicLayout from "@/layout/PublicLayout";

export default function ParentsPage() {
    return (
        <div>
            <PublicLayout>
                <ParentPortal />
                <ChatPopover />
            </PublicLayout>
        </div>
    );
}
