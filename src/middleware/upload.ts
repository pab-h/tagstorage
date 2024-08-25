import multer from "multer";
import env from "../env";
import { randomBytes } from "crypto";
import path from "path";

const diskStorage = multer.diskStorage({
    destination: (req, file, callback) =>  {
        callback(null, env.UPLOAD_PATH);
    },
    filename: (req, file, callback) => {
        const filename = randomBytes(32).toString("hex");
        const extname = path.extname(file.originalname);

        callback(null, `${ filename }${ extname }`);
    },
})

const upload = multer({ storage: diskStorage });

export default upload;
