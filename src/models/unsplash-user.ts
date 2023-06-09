import {UnsplashImage} from "@/models/unsplash-image";

export interface UnsplashUser {
    id: string;
    username: string;
    first_name: string;
    last_name: string;
    profile_image: {
        large: string;
    },
    photos: UnsplashImage[],
    followers_count: number;
}