import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth";

const AuthLayout = async ({
    children, 
}: {
    children: React.ReactNode; 
}) => {

    const session = await getSession();
    
    if (!session) {
        return redirect("/auth/signin");
    }

    return ( 
        <div>
            <main>
                {children}
            </main>
        </div>
     );
}
 
export default AuthLayout;