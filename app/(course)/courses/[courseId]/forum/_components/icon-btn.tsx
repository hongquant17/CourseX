import { Heart, LucideProps } from "lucide-react";
import React from "react";


export interface IconProps {
    Icon: React.FC<LucideProps>;
    isActive: boolean;
    children: React.ReactNode | null;
    onClick: () => void;
    width: number;
}

export function IconBtn({Icon, isActive, children,onClick, ...props}: IconProps) {
    return (
        <button className="flex items-center mr-4" onClick={onClick}>
            <Icon className="mr-1" width={props.width}/>
            {children}
        </button>
    )
}