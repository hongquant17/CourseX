import { Heart, LucideProps } from "lucide-react";
import React from "react";

export interface IconProps {
  Icon: React.FC<LucideProps>;
  isActive: boolean;
  isHidden: boolean;
  children: React.ReactNode | null;
  onClick: () => void;
  width: number;
  isFill: boolean;
}

export function IconBtn({
  Icon,
  isActive,
  children,
  onClick,
  isHidden,
  ...props
}: IconProps) {
  return (
    <button
      className={`flex items-center mr-4 ${isHidden ? "hidden": ""}`}
      onClick={onClick}
    >
      <Icon className={`${props.isFill ? "fill-current" : ""} mr-1 ${isActive ? "scale-150" : ""}`} width={props.width}/>
      {children}
    </button>
  );
}
