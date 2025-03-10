import Album from "../models/albumModel.js";

const handleSuccessResponse = (message, data = null) => ({
  status: "success",
  message,
  data,
});

const handleErrorResponse = (message) => ({
  status: "error",
  message,
});

const albumService = {
  createAlbum: async (newAlbum) => {
    const {
      title,
      uploader_id,
      artist,
      author,
      tags,
      description,
      cover_image,
      status,
    } = newAlbum;

    try {
      const existingAlbum = await Album.findOne({ title });

      if (existingAlbum) {
        return handleErrorResponse("The name of the album already exists");
      }

      const createdAlbum = await Album.create({
        title,
        uploader_id,
        artist,
        author,
        tags,
        description,
        cover_image,
        views: 0,
        favorites: 0,
        ratings: 5,
        status,
      });

      return handleSuccessResponse("Album created successfully", createdAlbum);
    } catch (error) {
      throw new Error(error.message);
    }
  },

  updateAlbum: async (id, data) => {
    try {
      const existingAlbum = await Album.findOne({ _id: id });

      if (!existingAlbum) {
        return handleErrorResponse("Album not found");
      }

      const updatedAlbum = await Album.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      });

      return handleSuccessResponse("Album updated successfully", updatedAlbum);
    } catch (error) {
      throw new Error("Failed to update album: " + error.message);
    }
  },

  getAllAlbum: async () => {
    try {
      const albums = await Album.find({});
      return handleSuccessResponse("Albums retrieved successfully", albums);
    } catch (error) {
      throw new Error("Failed to retrieve albums: " + error.message);
    }
  },

  detailedAlbum: async (id) => {
    try {
      const album = await Album.findOne({ _id: id });

      if (!album) {
        return handleErrorResponse("Album not found");
      }

      return handleSuccessResponse(
        "Successfully retrieved album details",
        album
      );
    } catch (error) {
      throw new Error("Failed to retrieve album details: " + error.message);
    }
  },
};

export default albumService;
