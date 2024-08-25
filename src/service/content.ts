import Content from "../entity/content";
import BucketRepository from "../repository/bucket";
import ContentRepository from "../repository/content";

export default class ContentService {

    private bucketRepository: BucketRepository;
    private contentRepository: ContentRepository;

    public constructor() {
        this.bucketRepository = new BucketRepository();
        this.contentRepository = new ContentRepository();
    }

    public async delete(id: string): Promise<void> {
        const content = await this.findById(id);

        return await this.contentRepository.delete(content);
    }

    public async findById(id: string): Promise<Content> {
        const content = await this.contentRepository.findById(id);

        if (!content) {
            throw new Error(`content ${ id } not found`);
        }

        return content;
    }

    public async create(content: Pick<Content, "name" | "bucket">): Promise<Content> {
        const { name, bucket } = content;
        
        if (!name) {
            throw Error(`content not uploaded`);
        }

        const bucketFound = await this.bucketRepository.findById(bucket);

        if (!bucketFound) {
            throw Error(`bucket ${ bucket } not exists`);
        }

        return await this.contentRepository.create({ name, bucket });
    }

}