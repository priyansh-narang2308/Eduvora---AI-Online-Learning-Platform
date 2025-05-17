"use client";

import { Button } from "@/components/ui/button";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
} from "@/components/ui/sidebar";
import {
    Book,
    Compass,
    LayoutDashboardIcon,
    PencilRulerIcon,
    UserCircle2Icon,
    Wallet2
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AddNewCourseDialog from "./add-new-course-dialog";

const sidebarOpt = [
    {
        title: "Dashboard",
        icon: LayoutDashboardIcon,
        path: "/workspace"
    },
    {
        title: "My Learning",
        icon: Book,
        path: "/workspace/my-courses"
    },
    {
        title: "Explore Courses",
        icon: Compass,
        path: "/workspace/explore"
    },
    {
        title: "AI Tools",
        icon: PencilRulerIcon,
        path: "/workspace/ai-tools"
    },
    {
        title: "Billing",
        icon: Wallet2,
        path: "/workspace/billing"
    },
    {
        title: "Profile",
        icon: UserCircle2Icon,
        path: "/workspace/profile"
    }
];

export function AppSidebar() {
    const pathname = usePathname();

    return (
        <Sidebar className="min-h-screen w-64 bg-white border-r shadow-sm">
            <SidebarHeader className="p-4 border-b flex justify-center">
                <Image src="/logo.png" alt="Eduvora Logo" width={120} height={120} />
            </SidebarHeader>

            <SidebarContent className="p-4">
                <SidebarGroup className="mb-6">
                    <AddNewCourseDialog>
                        <Button className="w-full bg-blue-600 hover:bg-blue-800 cursor-pointer text-white font-semibold">
                            Create New Course
                        </Button>
                    </AddNewCourseDialog>
                </SidebarGroup>

                <SidebarGroup className="space-y-2">
                    {sidebarOpt.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.path;
                        return (
                            <Link
                                key={item.title}
                                href={item.path}
                                className={`flex items-center px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium ${isActive
                                    ? "bg-blue-100 text-blue-600"
                                    : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                                    }`}
                            >
                                <Icon className="mr-3 h-5 w-5" />
                                {item.title}
                            </Link>
                        );
                    })}
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="p-4 text-sm text-gray-500 border-t">
                © {new Date().getFullYear()} Eduvora. All rights reserved.
            </SidebarFooter>
        </Sidebar>
    );
}
