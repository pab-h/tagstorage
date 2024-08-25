import path from "path";
import Content from "../entity/content";
import Repository from "./abstract";
import env from "../env";
import fs from "fs";

export default class ContentRepository extends Repository {
    public async delete({ id, diskPath }: Content): Promise<void> {
        await this.prisma.content.delete({
            where: { id }
        });

        if (fs.existsSync(diskPath)) {
            fs.unlinkSync(diskPath);
        }

    }

    public async findById(id: string): Promise<Content | null> {
        const contentData = await this.prisma.content.findUnique({
            where: { id }
        });

        if (!contentData) {
            return null;
        }

        const { name, bucketId } = contentData;

        return new Content(
            id,
            name,
            bucketId,
            path.join(env.UPLOAD_PATH, name)
        );
    }

    public async create(content: Pick<Content, "name" | "bucket">): Promise<Content>{
        const { name, bucket } = content;

        const { id } = await this.prisma.content.create({
            data: { name, bucketId: bucket }
        });

        return new Content(
            id,
            name,
            bucket,
            path.join(env.UPLOAD_PATH, name)
        );
    }

}