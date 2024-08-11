import Repository from "./abstract";

import Bucket from "../entity/bucket";

export default class BucketRepository extends Repository {

    public async delete(id: string): Promise<boolean> {
        const bucketDeleted = await this.prisma.bucket.delete({ 
            where: { id } 
        });

        return Boolean(bucketDeleted);
    }

    public async findById(id: string): Promise<Bucket | null> {
        const bucketFound = await this.prisma.bucket.findUnique({
            where: { id } 
        });

        if (!bucketFound) {
            return null;
        }

        return new Bucket(
            bucketFound.id,
            bucketFound.name
        );
    }

    public async all(): Promise<Bucket[]> {
        const buckets: Bucket[] = [];

        const bucketsFound = await this.prisma.bucket.findMany();

        for(const { id, name } of bucketsFound) {
            buckets.push(new Bucket(
                id,
                name
            ));
        }

        return buckets;
    }

    public async rename({ id, name }: Bucket): Promise<Bucket> {
        const bucketData = await this.prisma.bucket.update({
            data: { name },
            where: { id }
        });

        return new Bucket(
            bucketData.id,
            bucketData.name
        ); 
    }

    public async create({ name }: Omit<Bucket, "id">): Promise<Bucket> {
        const bucketData = await this.prisma.bucket.create({ 
            data: { name }
        });

        return new Bucket(
            bucketData.id,
            bucketData.name
        );
    }

}