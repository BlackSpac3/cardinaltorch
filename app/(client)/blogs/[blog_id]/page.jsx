import { getStaticBlogs } from "@app/actions";
import BlogContent from "@components/blog_components/BlogContent";
import SimilarBlogs from "@components/blog_components/SimilarBlogs";
import axios from "axios";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cache } from "react";

const fetchData = cache(async (blog_id) => {
  try {
    const response = await axios.post(
      `${process.env.NEXTAUTH_URL}/api/blogs/get-blog`,
      { blog_id }
    );

    return response.data.data;
  } catch (error) {
    console.log("error");
    console.log(error.status);
    if (error.status === 404) {
      return null;
    }
  }
});

export async function generateStaticParams() {
  const blogs = await getStaticBlogs();

  return blogs.map(({ blog_id }) => blog_id);
}

export async function generateMetadata({ params }, parent) {
  const { blog_id } = await params;
  const blog = await fetchData(blog_id);

  return {
    title: blog?.title,
    description: blog?.desc,
    keywords: blog?.tags,
    creator: "Jacobs Oluwatoyin",
    publisher: `${blog?.author.personal_info.first_name} ${blog?.author.personal_info.last_name}`,
    openGraph: {
      siteName: "Cardinal Torch",
      images: [
        {
          url: blog?.banner,
        },
      ],
      locale: "en_US",
      type: "article",
    },
  };
}

const page = async ({ params }) => {
  const blog = await fetchData(params.blog_id);

  if (!blog) {
    notFound();
  }

  const formattedDate = new Date(blog?.publishedAt);
  const date = formattedDate.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <section>
      <div className="bg-slate-100 h-full px-8 pb-32 flex flex-col gap-7 items-center pt-[120px]">
        <h1 className="section-big-text w-[60%] text-center capitalize">
          {blog?.title}
        </h1>
        <div className="flex gap-5 items-center text-gray-500">
          <div className="flex gap-3 items-center">
            <Image
              src={blog?.author.personal_info.profile_img}
              width={30}
              height={30}
              alt="Profile Image"
              className="w-[30px] h-[30px] object-cover rounded-full "
            />
            <p className="capitalize">{`${blog?.author.personal_info.first_name} ${blog?.author.personal_info.last_name}`}</p>
          </div>

          <div className="flex gap-3 items-center">
            <i className="fi fi-sr-calendar-day"></i>
            <p>{date}</p>
          </div>

          <div className="flex gap-3 items-center">
            <i className="fi fi-sr-folder-open"></i>
            <p className="capitalize">{blog?.tags[0]}</p>
          </div>
        </div>
      </div>

      <div className="mb-14">
        <Image
          src={blog?.banner}
          alt={blog?.title}
          width={0}
          height={0}
          sizes="100vw"
          className="w-[50%] h-[400px] object-cover phone:w-[80%] m-auto relative -top-20 border-4 border-white duration-100 bg-gray-50"
        />

        <div className="w-[65%] m-auto phone:w-[90%]">
          {blog?.content.length &&
            blog.content[0].blocks.map((block, index) => (
              <div className="mt-4 blog-content" key={index}>
                <BlogContent block={block} />
              </div>
            ))}
        </div>

        <SimilarBlogs tags={blog?.tags} blog_id={params.blog_id} />
      </div>
    </section>
  );
};
export default page;
