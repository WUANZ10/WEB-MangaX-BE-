import albumService from "../services/albumService.js";
import {
  validateCreateAlbumRequest,
  validateUpdateAlbumRequest,
} from "../middlewares/albumMiddleware.js";
import dotenv from "dotenv";
import multer from "multer";
import { uploadImage } from "../services/uploadService.js";
const storage=multer.memoryStorage()
const upload=multer({storage:storage}).array("images",20)

dotenv.config()

const handleError = (res, error, statusCode = 404) => {
  return res.status(statusCode).json({ message: error.message });
};

const albumController = {
  createAlbum: async (req, res) => {
    try {
      await validateCreateAlbumRequest(req, res, async () => {
        const {
          title,
          artist,
          author,
          tags,
          description,
          cover_image,
          status,
        } = req.body;        
        const uploader_id = req.user.id;
        
        if (!title || !artist || !author || !tags) {
          return res.status(400).json({
            status: "error",
            message: "Please fill all the required fields",
          });
        }
        
        let coverImageUrl=""
        if(req.file){
          coverImageUrl=await uploadImage(req.file,"MangaX/AlbumCover")
        }
        const newAlbum = {
          title,
          uploader_id,
          artist,
          author,
          tags,
          description,
          cover_image:coverImageUrl,
          status,
          chapter:[]
        };

        const response = await albumService.createAlbum(newAlbum);

        return res.status(200).json(response);
      });
    } catch (error) {
      return handleError(res, error);
    }
  },

  updateAlbum: async (req, res) => {
    try {
      await validateUpdateAlbumRequest(req, res, async () => {
        const albumId = req.params.id;
        const data = req.body;

        if (!albumId) {
          return res.status(400).json({
            status: "error",
            message: "Album ID is required",
          });
        }

        const response = await albumService.updateAlbum(albumId, data);
        return res.status(200).json(response);
      });
    } catch (error) {
      return handleError(res, error);
    }
  },

  getAllAlbum: async (req, res) => {
    try {
      const { keyword, page, pageSize, orderBy, orderDirection } = req.query;

      if (!page || page <= 0) page = 1;
      if (!pageSize || pageSize <= 0) pageSize = 15;
      if (!orderBy) orderBy = "createdAt";
      if (!orderDirection) orderDirection = "desc";

      const response = await albumService.getAllAlbum({
        keyword,
        page,
        pageSize,
        orderBy,
        orderDirection,
      });
      return res.status(200).json(response);
    } catch (error) {
      return handleError(res, error);
    }
  },

  detailedAlbum: async (req, res) => {
    try {
      const albumId = req.params.id;

      if (!albumId) {
        return res.status(400).json({
          status: "error",
          message: "Album ID is required",
        });
      }

      const response = await albumService.detailedAlbum(albumId);
      return res.status(200).json(response);
    } catch (error) {
      return handleError(res, error);
    }
  },
};

export default albumController;
