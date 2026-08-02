/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  // The codebase is type-clean as of this commit, so real type errors now fail
  // the build instead of shipping broken code. If a future change blocks you
  // and you need to deploy urgently, set this back to true temporarily.
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: true,
  },
  output: 'export',
}

export default nextConfig
