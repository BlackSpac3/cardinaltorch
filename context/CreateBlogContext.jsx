"use client";

import { createContext, useState } from "react";

export const CreateBlogContext = createContext(null);

const CreateBlogContextProvider = (props) => {
  const blogStructure = {
    title: "",
    banner: "",
    content: [],
    tags: [],
    desc: "",
    author: { personal_info: {} },
  };

  const [blog, setBlog] = useState(blogStructure);
  const [editorState, setEditorState] = useState("edit");
  const [textEditor, setTextEditor] = useState({ isReady: false });

  const contextvalue = {
    blog,
    setBlog,
    editorState,
    setEditorState,
    textEditor,
    setTextEditor,
  };
  return (
    <CreateBlogContext.Provider value={contextvalue}>
      {props.children}
    </CreateBlogContext.Provider>
  );
};

export default CreateBlogContextProvider;
