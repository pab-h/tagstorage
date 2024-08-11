import { PrismaClient } from "@prisma/client";

export default class Repository {
    protected prisma: PrismaClient;

    public constructor() {
        this.prisma = new PrismaClient();
    }

}