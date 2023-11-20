import { NavbarRoutes } from "@/components/navbar-routes"
import { MobileSidebar } from "./mobile-sidebar"
import { ModeToggle } from "@/components/mode-toggle"

export const Navbar = () => {
    return (
        <div className="p-4 border-b h-full flex items-center bg-white shadow-sm w-">
            <MobileSidebar />
            <NavbarRoutes />
        </div>
    )
}