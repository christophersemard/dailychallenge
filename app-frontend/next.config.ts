import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    output: "standalone",

    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "image.tmdb.org",
                pathname: "**",
            },
            {
                protocol: "https",
                hostname: "cdn-images.dzcdn.net",
                pathname: "**",
            },
            // wrivqparegjwiklfzsuq.supabase.co
            {
                protocol: "https",
                hostname: "wrivqparegjwiklfzsuq.supabase.co",
                pathname: "/storage/v1/object/public/avatar/**",
            },
            {
                protocol: "https",
                hostname: "wrivqparegjwiklfzsuq.supabase.co",
                pathname: "/storage/v1/object/public/avatar/**/**",
            },
            {
                protocol: "https",
                hostname: "wrivqparegjwiklfzsuq.supabase.co",
                pathname: "/storage/v1/object/public/avatar/**/**/**",
            },
        ],
    },
};

export default nextConfig;
