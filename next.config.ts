/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.tcdn.com.br",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "instagram.fssa25-1.fna.fbcdn.net",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "blessedchoice.com.br",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "cdn.sistemawbuy.com.br",
        pathname: "**",
      },
    ],
  },
}

export default nextConfig

