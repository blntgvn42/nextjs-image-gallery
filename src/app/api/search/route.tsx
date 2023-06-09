// create an example get request in nextjs convention
import {Request} from "next/dist/compiled/@edge-runtime/primitives/fetch";
import {NextResponse} from "next/server";
import {UnsplashImageResponse} from "@/models/unsplash-image";

export async function GET(req: Request) {
    const {searchParams} = new URL(req.url)
    const query = searchParams.get('query') || ''
    if (!query) {
        return NextResponse.json({error: 'no query provided'}, {status: 400})
    }

    const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`)
    const {results}: UnsplashImageResponse = await response.json()

    return NextResponse.json(results)
}
