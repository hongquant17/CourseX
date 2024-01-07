import { getSession } from "@/lib/auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
 
const f = createUploadthing();
 
const handleAuth = async () => {
    const session = await getSession();
    const userId = session?.user.uid;

    if (!userId) throw new Error("Unauthorized");
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
    userImage: f({ image: { maxFileSize: "2MB", maxFileCount: 1 } }) 
        .middleware(() => handleAuth()) 
        .onUploadComplete(() => {}), 
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;
