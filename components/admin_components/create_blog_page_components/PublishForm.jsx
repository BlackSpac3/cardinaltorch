"use client";
import { useContext } from "react";
import { CreateBlogContext } from "@context/CreateBlogContext";
import { useRouter } from "next/navigation";
import Tags from "./Tags";
import toast from "react-hot-toast";
import axios from "axios";
import { useSession } from "next-auth/react";
import { blogImages } from "@utils";

const PublishForm = ({ blog_id }) => {
  const characterLimit = 200;
  const tagLimit = 5;
  const today = new Date();
  const route = useRouter();

  const { data: session } = useSession();
  const name = session?.user?.name;
  const profile_img = session?.user?.profile_img;

  let {
    blog,
    blog: { title, banner, content, tags, desc },
    setBlog,
    setEditorState,
  } = useContext(CreateBlogContext);

  const handleBlogTitleChange = (e) => {
    let input = e.target;
    setBlog({ ...blog, title: input.value });
  };

  const handleBlogDescChangeEvent = (e) => {
    let input = e.target;
    setBlog({ ...blog, desc: input.value });
  };

  const handleBlogDescKeyDown = (e) => {
    e.keyCode == 13 && e.preventDefault();
  };

  const handleTagsInputKeyDown = (e) => {
    if (e.keyCode == 13 || e.keyCode == 188) {
      e.preventDefault();

      let input = e.target.value.toLowerCase();

      let tag = input.replaceAll(" and ", " & ");

      if (tags.length < tagLimit) {
        if (!tags.includes(tag) && tag.length) {
          setBlog({ ...blog, tags: [...tags, tag] });
        }
      } else {
        toast.error(`You can only add ${tagLimit} tags`, {
          id: "taglimit-error",
        });
      }
      e.target.value = "";
    }
  };

  const publishBlog = async (e) => {
    e.preventDefault();
    e.target.disabled = true;

    if (!title.length) {
      e.target.disabled = false;
      return toast.error("Give your blog a title to publish", {
        id: "publish-form-no-title-error",
      });
    }

    if (!desc.length || desc.length > characterLimit) {
      e.target.disabled = false;
      return toast.error(
        `Write a description about your blog within ${characterLimit} characters to publish`,
        {
          id: "publish-form-no-desc-error",
        }
      );
    }

    if (!tags.length || tags.length > tagLimit) {
      e.target.disabled = false;
      return toast.error(`Add at least 1 tag to help us rank your blog`, {
        id: "publish-form-no-tag-error",
      });
    }

    const formData = new FormData();

    blog_id && formData.append("id", blog_id);
    formData.append("banner", banner);
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("tags", JSON.stringify(tags));
    formData.append("draft", false);
    formData.append("content", JSON.stringify(content));

    blogImages.map((imgData, index) => {
      formData.append(imgData.id, imgData.file, imgData.file.name);
    });

    const loadingToast = toast.loading("Publishing...");

    try {
      const res = await axios.post("/api/blogs/create", formData);
      console.log(res);
      toast.dismiss(loadingToast);
      toast.success(res.data.message, {
        id: "blog-published-successfully-toast",
      });
      setTimeout(() => {
        route.push("/admin/blogs");
      }, 750);
    } catch (error) {
      console.log(error);
      toast.dismiss(loadingToast);
      toast.error(error.response.data.message);
    } finally {
      e.target.disabled = false;
    }
  };

  return (
    <section className="flex flex-col h-full w-full overflow-hidden">
      <nav className="w-full px-[3vw]">
        <div className="flex gap-2 items-center py-2 border-b">
          <button onClick={() => setEditorState("edit")} className="">
            <i className="fi fi-rr-angle-left"></i>
          </button>
          <p className="text-lg">Preview</p>
        </div>
      </nav>

      <section className="overflow-y-scroll">
        <div className="grid grid-cols-2 gap-5 w-[90%] mx-auto py-5 ">
          <div className="w-full">
            <div className="relative w-full aspect-video overflow-hidden rounded-md">
              {tags.length != 0 && (
                <p className="absolute left-2 top-2 bg-gray-700 bg-opacity-20 backdrop-blur-sm rounded-full px-4 py-2 capitalize text-white text-sm">
                  {tags[0]}
                </p>
              )}
              <img
                src={
                  typeof banner == "string"
                    ? banner
                    : URL.createObjectURL(banner)
                }
                alt=""
                className="w-full aspect-video object-cover rounded-md"
              />
            </div>
            <h1 className="text-xl font-medium line-clamp-2 mt-2">{title}</h1>
            <p className="break-words text-sm text-gray-700 mt-1">{desc}</p>
            <div className="flex gap-2 items-center mt-4">
              <img
                src={profile_img}
                className="w-8 h-8 rounded-full bg-gray-50"
              />
              <p className="leading-none capitalize">{`${name} • ${today
                .toDateString()
                .slice(3)}`}</p>
            </div>
          </div>

          <form className="flex flex-col items-start w-full gap-8">
            <div className="form-field-div">
              <label className="form-label">Blog Title</label>
              <input
                type="text"
                placeholder="Blog Title"
                defaultValue={title}
                className="input-box px-3 py-2"
                onChange={handleBlogTitleChange}
              />
            </div>

            <div className="form-field-div">
              <label htmlFor="" className="form-label">
                Short description about your blog
              </label>
              <textarea
                defaultValue={desc}
                maxLength={characterLimit}
                name="desc"
                id="create-blog-desc-textarea"
                className="input-box px-3 py-2 h-40 resize-none leading-7"
                onChange={handleBlogDescChangeEvent}
                onKeyDown={handleBlogDescKeyDown}
              ></textarea>
              <p className="text-end text-xs text-gray-500">
                {characterLimit - desc.length} characters left
              </p>
            </div>

            <div className="form-field-div">
              <label className="form-label">
                Topics - ( Helps in searching and ranking your blog post )
              </label>
              <div
                className={` relative flex flex-col gap-2 px-3 py-2 bg-gray-100 rounded-md`}
              >
                <input
                  type="text"
                  name="tags"
                  placeholder="Topics"
                  className={`px-3 py-2 rounded-md bg-white sticky outline-none  w-full`}
                  onKeyDown={handleTagsInputKeyDown}
                />
                <div className="flex gap-2 flex-wrap">
                  {tags.map((tag, index) => (
                    <Tags tag={tag} tagIndex={index} key={index} />
                  ))}
                </div>
              </div>
              <p className="text-end text-xs text-gray-500">
                {tagLimit - tags.length}{" "}
                {tagLimit - tags.length == 1 ? "tag" : "tags"} left
              </p>
            </div>
            <button
              onClick={publishBlog}
              className="bttn-primary place-self-end"
            >
              Publish
            </button>
          </form>
        </div>
      </section>
    </section>
  );
};
export default PublishForm;
