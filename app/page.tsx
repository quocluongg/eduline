import ChatPopover from "./components/ChatPopover";
import Homepage from "@/pages/Homepage";
import PublicLayout from "@/layout/PublicLayout";

export default function Home() {
    return (
        <PublicLayout>
            <Homepage />
            <ChatPopover />
        </PublicLayout>
    );
}
