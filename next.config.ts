import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  headers: async () => {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Cross-Origin-Resource-Policy",
            value: "cross-origin",
          },
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
