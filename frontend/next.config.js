// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   output: 'export',
//   trailingSlash: true,
//   experimental: {
//     optimizePackageImports: ['lucide-react'],
//   },
//   images: {
//     unoptimized: true
//   }
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'placehold.co'],
    unoptimized: true,
  },
  // Disable static export for dynamic routes
  output: undefined,
  trailingSlash: false,
}

module.exports = nextConfig