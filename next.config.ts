import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "encrypted-tbn0.gstatic.com",
      "vivolabs.es",
      // añade aquí cualquier otro dominio externo que uses
    ],
  },
};

export default nextConfig;
