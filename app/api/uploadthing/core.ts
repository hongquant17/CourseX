import { getSession } from "@/lib/auth";
import { auth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";
 
const f = createUploadthing();
 
const handleAuth = async () => {
    const session = await getSession();
    const userId = session?.user.uid;
    const role = session?.user.role;
    const isAuthorized = role == "admin" || role == "teacher"

    if (!userId || !isAuthorized) throw new Error("Unauthorized");
    return { userId }; 
} 

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
    courseImage: f({ image: { maxFileSize: "16MB", maxFileCount: 1 } }) 
        .middleware(() => handleAuth()) 
        .onUploadComplete(() => {}), 
    courseAttachment: f(["text", "image", "video", "audio", "pdf"]) 
        .middleware(() => handleAuth()) 
        .onUploadComplete(() => {}), 
    chapterVideo: f({ video: { maxFileCount: 1, maxFileSize: "512GB" } })
        .middleware(() => handleAuth()) 
        .onUploadComplete(() => {}),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;
