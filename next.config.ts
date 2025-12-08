/** @type {import('next').NextConfig} */
const nextConfig = {

  typescript: {
    // Isso permite que o build seja concluído mesmo com erros de tipo
    ignoreBuildErrors: true,
  },

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
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },
    ],
  },
}

export default nextConfig

