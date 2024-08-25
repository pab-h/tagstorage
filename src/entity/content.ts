export default class Content {

    readonly id: string;
    public name: string;
    public bucket: string;
    public diskPath: string;

    public constructor(id: string, name: string, bucket: string, diskPath: string) {
        this.id = id;
        this.name = name;
        this.bucket = bucket;
        this.diskPath = diskPath;
    }
}
