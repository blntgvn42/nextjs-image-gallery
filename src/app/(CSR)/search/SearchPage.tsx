'use client'
import {Alert, Button, Form, Spinner} from "react-bootstrap";
import {FormEvent, useState} from "react";
import {UnsplashImage} from "@/models/unsplash-image";
import Image from "next/image";
import styles from './SearchPage.module.css'

function SearchPage() {
    const [searchResults, setSearchResults] = useState<UnsplashImage[] | null>([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formData = new FormData(e.currentTarget as HTMLFormElement)
        const query = formData.get('query')?.toString().trim()
        if (query) {
            try {
                setIsLoading(true)
                setIsError(false)
                const response = await fetch(`/api/search?query=${query}`)
                const images: UnsplashImage[] = await response.json()
                setSearchResults(images)
            } catch (e) {
                setIsError(true)
            } finally {
                setIsLoading(false)
            }
        }
    }

    return (
        <>
            <Alert>
                This page fetches data <strong>client-side</strong>. In order to not leak API
                credentials, the request is sent to NextJS <strong>route handler</strong> that runs on the server. This route handlers then fetches the data from the
                Unsplash API and returns it to the client.
            </Alert>

            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="search-input">
                    <Form.Label>Search Query</Form.Label>
                    <Form.Control name="query" type="text" placeholder="e.g. cats, hotdogs, ..."/>
                    <Form.Text className="text-muted">Search for anything</Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit" disabled={isLoading} className='mt-3'>
                    Search
                </Button>
            </Form>

            <div className="d-flex flex-column align-items-center">
                {isLoading && <Spinner animation="border" variant="primary"/>}
                {isError && <p className="text-danger">Something went wrong. Please try again...</p>}
                {searchResults?.length === 0 && <p>No results found</p>}
            </div>
            {searchResults && searchResults.map((image, i) => (
                <Image
                    key={image.urls.raw}
                    src={image.urls.raw}
                    alt={image.description}
                    width={Math.min(250, image.width)}
                    height={Math.min(250, image.height)}
                    className={styles.image}/>
            ))}
        </>
    );
}

export default SearchPage;