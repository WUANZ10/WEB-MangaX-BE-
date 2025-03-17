import cloudinary from "../cloudinary.js";

export const uploadImage = async (file, folder = "MangaX") => {
    try {
      if (!file){
          throw new Error("Không có file để upload!")    
    } 
      const dataUrl = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
      const result = await cloudinary.uploader.upload(dataUrl, { folder });
  
      return result.secure_url;
    } catch (err) {
      throw new Error("Lỗi upload ảnh: " + err.message);
    }
  };

  export const uploadMultiImage = async (files, folder = "MangaX") => {
    try {
      if (!files || files.length === 0) throw new Error("Không có file để upload!");
  
      const uploads = await Promise.all(
        files.map(async (file, index) => {
          const dataUrl = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
          const result = await cloudinary.uploader.upload(dataUrl, { folder });
          return { page_number: index + 1, image_url: result.secure_url };
        })
      );
  
      return uploads;
    } catch (err) {
      throw new Error("Lỗi upload ảnh: " + err.message);
    }
  };