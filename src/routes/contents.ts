import { Router } from "express";
import ContentController from "../controller/content";
import upload from "../middleware/upload";

const contentRouter = Router();
const controller = new ContentController();

contentRouter.post(
    "/create", 
    upload.single("content"), 
    controller.create
);

export default contentRouter;
