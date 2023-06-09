import {UnsplashImage} from "@/models/unsplash-image";
import Image from "next/image";
import Link from "next/link";
import {Alert} from "@/components/bootstrap";
import {Metadata} from "next";

interface PageProps {
    params: {
        topic: string
    }
}

export function generateMetadata({params}: PageProps): Metadata {
    return {
        title: `${params.topic} - NextJS 13.4 Image Gallery - Generate Static Params Fetching`,
    }
}

// dynamic params ile sadece izin verilen parametrelerin gelmesini sağlayabiliriz.
// diğer türlü error sayfasına yönlendirilir
// @ts-ignore
export const dynamicParams = false;

export function generateStaticParams() {
    return ['health', 'nature', 'food']
        .map(topic => ({topic}))
}

const Page = async ({params}: PageProps) => {
    const {topic} = params

    const response = await fetch(`,`
        , {
            cache: 'force-cache'
        })
    const images: UnsplashImage[] = await response.json()

    return (
        <div className='d-flex flex-column align-items-center'>
            <Alert>
                This page uses <strong>generateStaticParams</strong> to render and cache static pages at build time
                even though the URL has a dynamic parameter. Pages that are not included in generateStaticParams will be
                fetched & rendered on first access and then <strong>cached for subsequent requests</strong> (this can be
                disabled)
            </Alert>


            {images.map((image: UnsplashImage, i: number) => (
                <>
                    <Image
                        src={image.urls.raw}
                        alt=''
                        width={Math.min(500, image.width)}
                        height={Math.min(500, image.width) * image.height / image.width}
                        className='rounded shadow mw-100 mh-100'/>
                    by
                    <Link href={`/users/${image.user.username}`}>{image.user.username}</Link>
                </>
            ))}
        </div>
    );
}

export default Page;