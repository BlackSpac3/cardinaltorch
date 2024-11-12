import { getStaticBlogs } from "./actions";

export default async function sitemap() {
  let blogs = await getStaticBlogs();

  const blogEntries = blogs.map(({ blog_id, publishedAt }) => ({
    url: `${process.env.NEXTAUTH_URL}/blogs/${blog_id}`,
    lastModified: new Date(publishedAt),
  }));

  return [
    {
      url: `${process.env.NEXTAUTH_URL}/about-us`,
    },
    {
      url: `${process.env.NEXTAUTH_URL}/about-us/team`,
    },
    {
      url: `${process.env.NEXTAUTH_URL}/about-us/gallery`,
    },
    {
      url: `${process.env.NEXTAUTH_URL}/blogs`,
    },
    ...blogEntries,
    {
      url: `${process.env.NEXTAUTH_URL}/contact-us`,
    },
    {
      url: `${process.env.NEXTAUTH_URL}/services`,
    },
  ];
}
