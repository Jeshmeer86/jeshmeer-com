/** @type {import('next').NextConfig} */
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  images: { unoptimized: true },
  poweredByHeader: false,
  outputFileTracingRoot: __dirname,
  eslint: { ignoreDuringBuilds: false },
};

export default nextConfig;
