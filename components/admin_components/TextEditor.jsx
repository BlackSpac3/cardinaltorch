import { useEffect } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { useState } from "react";

const TextEditor = ({ sendData }) => {
  const theme = "snow";

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike", "image"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ size: ["small", false, "large", "huge"] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],

      ["clean"],
    ],
  };

  const placeholder = "Write blog content here...";

  const { quill, quillRef } = useQuill({ theme, modules, placeholder });
  const [value, setValue] = useState();
  if (quill) {
    quill.on("text-change", () => {
      sendData(quillRef.current.firstChild.innerHTML);
    });
  }
  return <div ref={quillRef} className="h-full" />;
};
export default TextEditor;
