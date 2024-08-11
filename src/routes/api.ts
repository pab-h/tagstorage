import { Router } from "express";
import bucketRouter from "./buckets";

const apiRouter = Router();

apiRouter.use("/buckets", bucketRouter);

export default apiRouter;
