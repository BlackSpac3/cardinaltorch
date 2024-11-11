import { useContext } from "react";
import { CreateBlogContext } from "@context/CreateBlogContext";

const Tags = ({ tag, tagIndex }) => {
  let {
    blog,
    setBlog,
    blog: { tags },
  } = useContext(CreateBlogContext);

  const deleteTag = (e) => {
    e.preventDefault();
    tags = tags.filter((previousTag) => previousTag != tag);
    setBlog({ ...blog, tags });
  };

  const handleTagEditKeydown = (e) => {
    if (e.keyCode == 13 || e.keyCode == 188) {
      e.preventDefault();
      let currentTag = e.target.innerText.toLowerCase();
      tags[tagIndex] = currentTag;
      setBlog({ ...blog, tags });
      console.log(tags);
      e.target.setAttribute("contentEditable", false);
      e.target.innerText = currentTag;
    }
  };

  const makeEditable = (e) => {
    e.target.setAttribute("contentEditable", true);
    e.target.focus();
  };
  return (
    <div className="relative flex gap-2 items-center rounded-full w-fit px-4 py-3 bg-white hover:bg-opacity-60">
      <p
        onClick={makeEditable}
        className="text-sm outline-none leading-none"
        onKeyDown={handleTagEditKeydown}
      >
        {tag}
      </p>
      <button onClick={deleteTag} className="rounded-full">
        <i className="fi fi-rr-cross text-[10px] pointer-events-none"></i>
      </button>
    </div>
  );
};
export default Tags;
