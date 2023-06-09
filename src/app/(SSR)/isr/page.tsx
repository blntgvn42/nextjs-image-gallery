import {UnsplashImage} from "@/models/unsplash-image";
import Image from "next/image";
import Link from "next/link";
import {Alert} from "@/components/bootstrap";

interface PageProps {
}

export const metadata = {
    title: 'NextJS 13.4 Image Gallery - Incremental Static Regenerating',
}

// 15 saniye boyunca cache'le.
export const revalidate = 15
const Page = async () => {
    const response = await fetch(`https://api.unsplash.com/photos/random?client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`)
    const image: UnsplashImage = await response.json()

    const width = Math.min(500, image.width)
    const height = width * image.height / image.width

    return (
        <div className='d-flex flex-column align-items-center'>
            <Alert>
                This page uses <strong>incremental site regeneration</strong>. A new image is rendered
                every 15 seconds. (after refreshing the page) and then served
                from the cache for that duration.
            </Alert>

            <Image
                src={image.urls.raw}
                alt={image.description}
                width={width}
                height={height}
                className='rounded shadow mw-100 mh-100'/>
            by
            <Link href={`/users/${image.user.username}`}>{image.user.username}</Link>
        </div>
    );
}

export default Page;