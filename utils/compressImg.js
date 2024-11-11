import Compressor from "compressorjs";

const compressImg = (img) => {
  return new Promise((resolve, reject) => {
    new Compressor(img, {
      quality: 0.6,
      mimeType: "image/webp",
      success(result) {
        resolve(result);
      },
      error(error) {
        reject(error);
      },
    });
  });
};

export default compressImg;
