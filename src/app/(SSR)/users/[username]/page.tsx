import {UnsplashUser} from "@/models/unsplash-user";
import Image from "next/image";
import {Metadata} from "next";
import {notFound} from "next/navigation";
import {cache} from "react";
import {Alert} from "@/components/bootstrap";

interface PageProps {
    params: {
        username: string
    }
}

async function getUser(username: string): Promise<UnsplashUser> {
    const response = await fetch(`https://api.unsplash.com/users/${username}?client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
        , {
            cache: 'force-cache'
        })

    if (response.status === 404) notFound()

    return await response.json()
}

// const getUserCached = cache(getUser)
// cache'i sadece native fetch kullanmadığımız senaryolarda kullanabiliriz.

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
    const user = await getUser(params.username)
    return {
        title: [user.first_name, user.last_name].filter(Boolean).join(' ')
            || user.username + ' - NextJS 13.4 Image Gallery'
    }
}

const Page = async ({params}: PageProps) => {
    const {username} = params
    const user = await getUser(username)

    return (
        <div>
            <Alert>
                This profile page uses <strong>generateMetadata</strong> to set the <strong>page title</strong>
                dynamically from the API response.
            </Alert>

            <h1>{user.first_name + ' ' + user.last_name}</h1>
            <Image src={user.profile_image.large} alt={user.username} width={128} height={128}/>
            <p>He has {user.followers_count} follower</p>
        </div>
    );
}

export default Page;