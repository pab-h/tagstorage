import { z } from "zod";
import { Request, Response, NextFunction } from "express";
import BucketService from "../service/bucket";

const nameSchema = z.object({
    name: z.string()
});

const idSchema = z.object({
    id: z.string()
});

export default class BucketController {
    
    private service: BucketService;

    public constructor() {
        this.service = new BucketService();

        this.create = this.create.bind(this);
        this.rename = this.rename.bind(this);
        this.all = this.all.bind(this);
        this.delete = this.delete.bind(this);

    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = idSchema.parse(req.params);

        const isDeleted = await this.service.delete(id);

        if (!isDeleted) {
            res.status(400).json({
                message: `bucket ${ id } cannot be deleted`
            });
            return;
        }

        res.status(200).json({
            message: `bucket ${ id } deleted`
        });
    }

    public async all(req: Request, res: Response): Promise<void> {
        const buckets = await this.service.all();

        res.status(200).json(buckets);
    }

    public async create(req: Request, res: Response,): Promise<void> {
        const { name } = nameSchema.parse(req.body);

        const bucket = await this.service.create({ name });

        res.status(200).json(bucket);        
    }

    public async rename(req: Request, res: Response): Promise<void> {
        const { id } = idSchema.parse(req.params);
        const { name } = nameSchema.parse(req.body);

        const renamedBucket = await this.service.rename({ 
            id, 
            name 
        });

        res.status(200).json(renamedBucket);
    }

}