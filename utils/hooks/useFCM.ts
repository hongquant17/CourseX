import { useEffect, useState } from "react";
import useFCMToken from "./useFCMToken";
import { MessagePayload, onMessage } from "firebase/messaging";
import { messaging } from "@/lib/firebase";
import { toast } from "sonner";

const useFCM = () => {
  const fcmToken = useFCMToken();
  const [messages, setMessages] = useState<MessagePayload[]>([]);
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      const fcmMessaging = messaging();
      const unsubscribe = onMessage(fcmMessaging, (payload) => {
        toast(payload.notification?.title);
        setMessages((messages) => [...messages, payload]);
      });
      return () => unsubscribe();
    }
  }, [fcmToken]);
  return { fcmToken, messages };
};

export default useFCM;
