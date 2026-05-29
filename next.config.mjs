/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Ignora erros de tipo no build da Vercel
    ignoreBuildErrors: true,
  },
  eslint: {
    // Ignora erros de linting no build da Vercel
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;