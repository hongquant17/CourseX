import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getSession } from "@/lib/auth"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface FormData {
    email: string | undefined | null,
    current: string,
    now: string,
}

export function PasswordDialog() {
    const router = useRouter();
    const { data: session } = useSession();
    const [formData, setFormData] = useState<FormData>({
        email: session?.user.email,
        current: '',
        now: '',
    });

    const [statusMessage, setstatusMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value;
        const name = e.target.name;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setstatusMessage("");
        const res = await fetch("/api/users/change/password", {
            method: "POST",
            body: JSON.stringify({ formData }),
            headers,
        });
        const response = await res.json();
        setstatusMessage(response.message);
        if (res.ok) {
          await new Promise(f => setTimeout(f, 300));
          signOut();
          router.refresh();
          router.push("/");
        };
    };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Change Password</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change password</DialogTitle>
          <DialogDescription>
            Change your password here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">
                Current
                </Label>
                <Input value={formData.current} type="password" name="current" className="col-span-3" required onChange={handleChange} placeholder="Your current password"/>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">
                New
                </Label>
                <Input value={formData.now} type="password" name="now" className="col-span-3" required onChange={handleChange} placeholder="New password"/>
            </div>
            </div>
            {statusMessage && (
                <p className="text-center py-4 mb-6 rounded">{statusMessage}</p>
             )}
             <Button type="submit">Save changes</Button>
        </form>
        <DialogFooter>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
