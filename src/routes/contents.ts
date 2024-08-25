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

contentRouter.get(
    "/look/:filename",
    controller.look
);

contentRouter.get(
    "/download/:filename",
    controller.download
);

contentRouter.delete(
    "/delete/:filename",
    controller.delete
);

export default contentRouter;
