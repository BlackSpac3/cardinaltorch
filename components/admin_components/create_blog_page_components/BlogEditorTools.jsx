import Embed from "@editorjs/embed";
import List from "@editorjs/list";
import Image from "@editorjs/image";
import Header from "@editorjs/header";
import Marker from "@editorjs/marker";
import InlineCode from "@editorjs/inline-code";
import compressImg from "@utils/compressImg";
import { blogImages } from "@utils";

const uploadImageByFile = async (e) => {
  const compressedImage = await compressImg(e);
  const id = `${Date.now()}-${compressedImage.lastModified}-${
    compressedImage.name
  }`;

  compressedImage.name = id;
  const url = URL.createObjectURL(compressedImage);
  blogImages.push({ id, file: compressedImage });

  return { success: 1, file: { id, url } };
};

const uploadImageByURL = (e) => {
  let link = new Promise((resolve, reject) => {
    try {
      resolve(e);
    } catch (err) {
      reject(err);
    }
  });

  return link.then((url) => {
    return {
      success: 1,
      file: { url },
    };
  });
};

export const tools = {
  embed: Embed,
  list: {
    class: List,
    inlineToolbar: true,
  },
  image: {
    class: Image,
    config: {
      // endpoints: {
      //   byFile: `http://localhost:4000/api/blog/create/add-image`,
      // },
      uploader: {
        uploadByUrl: uploadImageByURL,
        uploadByFile: uploadImageByFile,
      },
    },
  },
  header: {
    class: Header,
    config: {
      placeholder: "Type heading...",
      levels: [2, 3],
      defaultLevel: 2,
    },
  },
  marker: Marker,
  inlineCode: InlineCode,
};
