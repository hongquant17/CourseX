import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { PRIVILEGES, ROLES } from "./constant"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function getRole(role: string | null) {
  var role1 = '';
  var role2 = '';
  if (!role) {
    return '';
  }
  if (role[PRIVILEGES["ADMIN"]] === String(ROLES["ADMIN"])) {
    role1 = 'Admin, ';
  }
  if (role[PRIVILEGES["OTHERS"]] === String(ROLES["TEACHER"])) {
    role2 = 'Teacher';
  }
  else role2 = 'User';
  return role1 + role2;
}