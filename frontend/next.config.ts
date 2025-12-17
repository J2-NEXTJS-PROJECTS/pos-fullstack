import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    unoptimized: true, //para que se puedan mostrar imagenes servidas enlocalhost
    remotePatterns: [
      //   {
      //     protocol: "http",
      //     hostname: process.env.DOMAIN!
      //   },
      //   {
      //      protocol: "http",
      //      hostname: process.env.NEXT_PUBLIC_API_URL!
      //   },

      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
