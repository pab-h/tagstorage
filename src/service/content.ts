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

    public async create(content: Pick<Content, "name" | "bucket">): Promise<Content> {
        const { name, bucket } = content;
        
        const bucketFound = await this.bucketRepository.findById(bucket);

        if (!bucketFound) {
            throw Error(`bucket ${ bucket } not exists`)
        }

        return await this.contentRepository.create({ name, bucket });
    }

}