'use client'
import React from 'react';
import { requestForToken } from '@/lib/firebase';

export const Notification = () => {
    requestForToken();
    return (
        <div>sida</div>
    )
}

