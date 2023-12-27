'use client'
import { NavbarRoutes } from "@/components/navbar-routes"
import { Logo } from "../../(dashboard)/_components/logo"

export const Navbar = () => {
    return (
        <div className="p-4 border-b h-full flex items-center bg-white shadow-sm w-">
            <Logo />
            <NavbarRoutes />
        </div>
    )
}