'use client'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  import { Button } from "@/components/ui/button";
  import { MoreHorizontal } from "lucide-react";
import { MouseEventHandler, useState } from "react";
import { PRIVILEGES, ROLES, TYPE_CHANGE } from "@/lib/constant";
import { useRouter } from "next/navigation";
import { setCharAt } from "@/lib/utils";


interface UserProps {
    id: string,
    role: string | null,
}
interface FormData {
    ids: Array<string>,
    role: string | null,
    type: number,
}

const UserActions = ({
    id,
    role,
}: UserProps) => {
    const router = useRouter();
    
      const [statusMessage, setstatusMessage] = useState("");
    
      const postData = (typeAction: number, newRole: string | null) => async() => {
        if (typeAction == TYPE_CHANGE["OTHER_ROLE"]) {
          var currentRole = role;
          currentRole = setCharAt(currentRole, PRIVILEGES["OTHERS"], newRole);
          newRole = currentRole;
        }

        const formData: FormData = {
            ids : [id],
            type: typeAction,
            role: newRole ? newRole : '',
        };
        handleSubmit(formData);
      };
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      const handleSubmit = async (formData: FormData) => {
          setstatusMessage("");
          const res = await fetch("/api/change/role", {
              method: "POST",
              body: JSON.stringify({ formData }),
              headers,
          });
          const response = await res.json();
          setstatusMessage(response.message);
          if (res.ok) {
            router.refresh();
            router.push("/admin/users");
          };
      };
    
    return (
      <>
        <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="font-extrabold mb-2"
                  onClick={postData((TYPE_CHANGE["ADMIN"]), role)}
                >
                  Toggle Admin
                </DropdownMenuItem>
                <DropdownMenuSeparator/>
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onClick={postData(TYPE_CHANGE["OTHER_ROLE"], ROLES["TEACHER"])}
                  >
                    Teacher
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={postData(TYPE_CHANGE["OTHER_ROLE"], ROLES["USER"])}
                  >
                    User
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={postData(TYPE_CHANGE["DELETE"], "")}>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
      </>
    );
}
export default UserActions;