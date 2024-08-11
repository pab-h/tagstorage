import Bucket from "../entity/bucket";
import BucketRepository from "../repository/bucket";

export default class BucketService {

    private repository: BucketRepository;

    public constructor() {
        this.repository = new BucketRepository();
    }

    public async delete(id: string): Promise<boolean> {
        const bucketFound = await this.repository.findById(id);

        if (!bucketFound) {
            throw Error("bucket not found");
        }

        return await this.repository.delete(id);
    }

    public async all(): Promise<Bucket[]> {
        return await this.repository.all();
    }

    public async rename({ id, name }: Bucket): Promise<Bucket> {
        const bucketFound = await this.repository.findById(id);

        if (!bucketFound) {
            throw Error("bucket not found");
        }

        return await this.repository.rename({ id, name });
    }

    public async create({ name }: Omit<Bucket, "id">): Promise<Bucket> {
        return await this.repository.create({ name });
    }

}