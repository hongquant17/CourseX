import { useEffect, useState } from "react";
import useNotificationPermissionStatus from "./useNotificationPermission"
import { getToken, isSupported } from "firebase/messaging";
import { messaging } from "@/lib/firebase";

const useFCMToken = () => {
    const permission = useNotificationPermissionStatus();
    const [fcmToken, setFCMToken] = useState<string | null>(null);

    useEffect(() => {
        const retrieveToken = async () => {
            if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
                if (permission === 'granted') {
                    const isFCMSupported = await isSupported();
                    if (!isFCMSupported) return;
                    const fcmToken = await getToken(messaging(), {
                        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
                    });
                    setFCMToken(fcmToken);
                }
            }
        };
        retrieveToken();
    }, [permission]);
    return fcmToken;
}

export default useFCMToken;