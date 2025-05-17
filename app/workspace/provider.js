import { SidebarProvider} from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/app-sidebar";
import AppHeader from "./_components/app-header";

const WorkspaceProvider = ({ children }) => {
    return (
        <SidebarProvider>
            <AppSidebar/>
           
            <div className="w-full">
                <AppHeader/>
                <div className="p-10">

                {children}
                </div>
            </div>
        </SidebarProvider>
    );
};

export default WorkspaceProvider;