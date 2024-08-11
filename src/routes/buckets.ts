import { Router } from "express";
import BucketController from "../controller/bucket";

const bucketRouter = Router();
const controller = new BucketController();

bucketRouter.post("/create", controller.create);
bucketRouter.patch("/rename/:id", controller.rename);
bucketRouter.get("/all", controller.all);
bucketRouter.delete("/delete/:id", controller.delete);

export default bucketRouter;
