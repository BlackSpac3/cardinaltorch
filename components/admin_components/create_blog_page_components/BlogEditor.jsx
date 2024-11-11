"use client";
import { useContext, useRef } from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { CreateBlogContext } from "@context/CreateBlogContext";
import { useEffect } from "react";
import EditorJS from "@editorjs/editorjs";
import axios from "axios";
import { tools } from "./BlogEditorTools";
import { useRouter } from "next/navigation";
import { blogImages } from "@utils";
import ConfirmDelDialog from "../ConfirmDelDialog";
import { useSession } from "next-auth/react";
import AddImgDropZone from "@components/AddImgDropZone";

const BlogEditor = ({ blog_id }) => {
  const route = useRouter();
  const bannerRef = useRef(null);
  const confirmDelModalIdName = "confirm-delete-blog-modal";
  const [deleting, setDeleting] = useState(false);

  let {
    blog,
    blog: { title, banner, content, tags, desc },
    setBlog,
    textEditor,
    setTextEditor,
    setEditorState,
  } = useContext(CreateBlogContext);

  const { data: session } = useSession();
  const user_type = session?.user.user_type;

  const handleBannerUpload = (e) => {
    const img = e.target.files[0];

    if (img) {
      if (img.size > 1024 * 1024 * 6) {
        toast.error("Image should be less than 6MB");
      } else {
        toast.success("Uploaded 👍 ");
        setBlog({ ...blog, banner: img });
      }
    }
  };

  const handleTitleKeyDown = (e) => {
    e.keyCode == 13 && e.preventDefault();
  };

  const handleTitleChange = (e) => {
    let input = e.target;

    input.style.height = "auto";
    input.style.height = input.scrollHeight + "px";
    setBlog({ ...blog, title: input.value });
  };

  const handleSaveDraft = (e) => {
    e.preventDefault();
    e.target.disabled = true;

    if (!title.length) {
      e.target.disabled = false;
      return toast.error("Give your blog a title to save draft", {
        id: "editor-no-title-error",
      });
    }

    if (textEditor.isReady) {
      textEditor.save().then(async (data) => {
        const formData = new FormData();

        blog_id && formData.append("id", blog_id);

        formData.append("banner", banner);
        formData.append("title", title);
        formData.append("desc", desc);
        formData.append("tags", JSON.stringify(tags));
        formData.append("content", JSON.stringify(data));
        formData.append("draft", true);

        blogImages.map((imgData, index) => {
          formData.append(imgData.id, imgData.file, imgData.file.name);
        });

        const loadingToast = toast.loading("Saving Draft...");

        try {
          const res = await axios.post("/api/blogs/create", formData);
          console.log(res);
          toast.dismiss(loadingToast);
          toast.success(res.data.message, {
            id: "blog-published-successfully-toast",
          });
          setTimeout(() => {
            route.push("/admin/drafts");
          }, 750);
        } catch (error) {
          console.log(error);
          toast.dismiss(loadingToast);
          toast.error(error.response.data.message);
        } finally {
          e.target.disabled = false;
        }
      });
    }
  };

  const handlePublishEvent = (e) => {
    e.preventDefault();

    if (!title) {
      return toast.error("Add a title to your blog");
    }
    if (!banner) {
      return toast.error("Upload a blog banner");
    }
    if (textEditor.isReady) {
      textEditor
        .save()
        .then((data) => {
          if (!data.blocks.length) {
            toast.error("Write content for your blog", {
              id: "no-blog-content-error",
            });
          } else {
            setBlog({ ...blog, content: data });
            setEditorState("publish");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const deleteBlog = async (e) => {
    e.preventDefault();
    e.target.disabled = true;
    setDeleting(true);

    try {
      const response = await axios.post("/api/blogs/remove", {
        blog_id,
        draft: blog.draft,
      });

      toast.success(response.data.message, { id: "blog-deleted-successfully" });
      route.back();
    } catch (error) {
      toast.error("Something went wrong somewhere", {
        id: "something-went-wrong-somewhere",
      });
    } finally {
      setDeleting(false);
      e.target.disabled = false;
    }
  };

  useEffect(() => {
    setTextEditor(
      new EditorJS({
        holder: "textEditor",
        data: Array.isArray(content) ? content[0] : content,
        tools: tools,
        placeholder: "Let's write an awesome story ",
      })
    );
  }, []);

  return (
    <div className="flex flex-col w-full h-full overflow-hidden">
      <nav className="w-full px-[3vw]">
        <div className="flex w-full phone:flex-col-reverse  gap-2 items-start py-2 border-b ">
          {blog_id && (user_type == "admin" || blog.draft) && (
            <button
              onClick={() =>
                document.getElementById(confirmDelModalIdName).showModal()
              }
              className="bttn-red text-xs"
            >
              Delete
            </button>
          )}
          <textarea
            defaultValue={title}
            name="title"
            id=""
            rows="1"
            placeholder="Title"
            className="text-2xl font-medium w-full resize-none outline-none leading-tight placeholder:opacity-40 px-2"
            onKeyDown={handleTitleKeyDown}
            onFocus={handleTitleChange}
            onChange={handleTitleChange}
          ></textarea>

          <div className="flex phone:w-full gap-3 min-w-fit text-xs">
            <button
              onClick={handleSaveDraft}
              className="bttn-outline phone:w-full"
            >
              Save Draft
            </button>

            <button
              onClick={handlePublishEvent}
              className="bttn-primary phone:w-full"
            >
              Publish
            </button>
          </div>
        </div>
      </nav>

      <section className="overflow-y-scroll">
        <div className="flex flex-col py-5 gap-5 mx-auto max-w-[80%] tab-m:max-w-[90%]">
          <div className="relative aspect-video overflow-hidden ">
            <label htmlFor="upload-banner" className="cursor-pointer">
              {!banner ? (
                <AddImgDropZone />
              ) : (
                <img
                  ref={bannerRef}
                  src={
                    typeof banner == "string"
                      ? banner
                      : URL.createObjectURL(banner)
                  }
                  alt=""
                  className="w-full h-full object-cover bg-gray-50 hover:opacity-90"
                />
              )}
              <input
                id="upload-banner"
                type="file"
                accept=".png, .jpg, .jpeg, .webp"
                hidden
                onChange={handleBannerUpload}
              />
            </label>
          </div>
          <hr />
          <div id="textEditor" className="blog-content"></div>
        </div>
      </section>

      <ConfirmDelDialog
        id_name={confirmDelModalIdName}
        delfunc={deleteBlog}
        loadingState={deleting}
        warningText="This blog will be permanently deleted, and this action cannot be
            reversed."
      />
    </div>
  );
};
export default BlogEditor;
