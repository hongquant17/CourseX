"use client";

import {
    Github,
    LifeBuoy,
    LogOut,
    Mail,
    MessageSquare,
    PlusCircle,
    User,
    UserPlus,
    Users,
} from "lucide-react"

import { useTheme } from "next-themes";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { signOut } from "next-auth/react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "./ui/button";
import { PasswordDialog } from "./dialog-password";


const UserButton = (data: any) => {

    const { theme, setTheme } = useTheme();
    const isDarkMode = theme === 'dark'
    const userSrc = isDarkMode ? '/light-no-ava.png' : '/no-avatar.svg';
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer transform transition-transform hover:scale-110">
                    <AvatarImage src={(data.user.image) ? data.user.image : userSrc} />
                    {/* <AvatarFallback>CS</AvatarFallback> */}
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>{data.user.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>{data.user.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                    <PasswordDialog></PasswordDialog>
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                <Github className="mr-2 h-4 w-4" />
                    <a href="https://github.com/hongquant17/CourseX" target="_blank">
                        <span>GitHub</span>
                    </a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <LifeBuoy className="mr-2 h-4 w-4" />
                    <a href="https://github.com/hongquant17/CourseX" target="_blank">
                        <span>Support</span>
                    </a>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuGroup className="flex items-center justify-center" >
                    <DropdownMenuItem asChild>
                        <AlertDialog>
                            <AlertDialogTrigger asChild >
                                <Button variant="ghost" className="Button">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Sign Out
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure to sign out?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        You have to sign in again to continue using CourseX.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => signOut()}>Continue</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
};
export default UserButton;
