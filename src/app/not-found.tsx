'use client'

import React from 'react';
import {useRouter} from "next/navigation";

type Props = {}

function NotFound() {
    const router = useRouter();
    return (
        <>
            <div>This page is rendered when there is no appropriate route</div>
            <button onClick={() => router.back()}>Press here to go back</button>
        </>
    );
}

export default NotFound;