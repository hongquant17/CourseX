"use client";
import useFCM from "@/utils/hooks/useFCM";
import Toaster from "../ui/sonner";
import { toast } from "sonner";
import { useEffect } from "react";

export const NotificationProvider = () => {
  const { messages, fcmToken } = useFCM();

  useEffect(() => {
    if (messages && messages.length != 0)
      var notiMessage = messages[messages.length - 1].notification?.title;
      toast(notiMessage);
  }, [messages]);
  return (
    <>
      <Toaster closeButton expand={true} position="bottom-left" />
    </>
  );
};
