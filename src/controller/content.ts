import { Request, Response } from "express";
import { z } from "zod";
import ContentService from "../service/content";
import path from "path";

const bucketSchema = z.object({
    bucket: z.string().uuid()
});

const filenameSchema = z.object({
    filename: z.string().uuid()
});

export default class ContentController {

    private service: ContentService;

    public constructor() {
        this.service = new ContentService();
        this.create = this.create.bind(this);
        this.look = this.look.bind(this);
        this.download = this.download.bind(this);
        this.delete = this.delete.bind(this);
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { filename } = filenameSchema.parse(req.params);

        await this.service.delete(filename);

        res.status(200).json({
            message: `content ${ filename } deleted`
        });
    }

    public async download(req: Request, res: Response): Promise<void> {

        const { filename } = filenameSchema.parse(req.params);

        const { diskPath } = await this.service.findById(filename);

        res.status(200).download(
            path.resolve(__dirname,"..", "..", diskPath)
        );
    }

    public async look(req: Request, res: Response): Promise<void> {

        const { filename } = filenameSchema.parse(req.params);

        const { diskPath } = await this.service.findById(filename);

        res.status(200).sendFile(
            path.resolve(__dirname,"..", "..", diskPath)
        );
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