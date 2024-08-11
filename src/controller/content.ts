import { Request, Response } from "express";
import { z } from "zod";
import ContentService from "../service/content";

const bucketSchema = z.object({
    bucket: z.string().uuid()
});

export default class ContentController {

    private service: ContentService;

    public constructor() {
        this.service = new ContentService();
        this.create = this.create.bind(this);
    }

    public async create(req: Request, res: Response): Promise<void> {

        const { bucket } = bucketSchema.parse(req.body);

        let filename = ""

        if (req.file) {
            filename = req.file.filename;
        }

        const content = await this.service.create({
            name: filename, 
            bucket
        });

        res.status(200).json(content);

    }
}