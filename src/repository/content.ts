import path from "path";
import Content from "../entity/content";
import Repository from "./abstract";
import env from "../env";

export default class ContentRepository extends Repository {

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