import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sh4gztvpq6.ufs.sh",
        pathname: "/f/*",
      },
    ]
  }
};

export default nextConfig;
