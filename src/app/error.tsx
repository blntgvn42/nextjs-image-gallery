'use client'

import {Button} from "react-bootstrap";

interface ErrorPageProps {
    error: Error;
    reset: () => void;
}

function Error({error, reset}: ErrorPageProps) {
    return (
        <>
            <div>This page is rendered when an error occurred</div>
            <Button onClick={reset}>Try Again</Button>
        </>
    );
}

export default Error;