export default class Bucket {

    readonly id: string;
    public name: string;

    public constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
    }
}
