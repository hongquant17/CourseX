'use client'
import useFCM from "@/utils/hooks/useFCM"
import Toaster from "../ui/sonner";

export const NotificationProvider = () => {
    const { messages, fcmToken } = useFCM();
    return (
      <>
        <Toaster closeButton expand={true} position="bottom-left" />
      </>
    );

}