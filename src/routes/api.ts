import { Router } from "express";
import bucketRouter from "./buckets";
import contentRouter from "./contents";

const apiRouter = Router();

apiRouter.use("/buckets", bucketRouter);
apiRouter.use("/contents", contentRouter);

export default apiRouter;
