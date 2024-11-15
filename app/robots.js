export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin"],
      },
    ],
    sitemap: `${process.env.NEXTAUTH_URL}/sitemap.xml`,
  };
}
