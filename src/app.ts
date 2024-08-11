import express from "express";
import { Express } from "express";
import apiRouter from "./routes/api";

export default class App {

    private express: Express;
    private host: string;
    private port: number;

    constructor(host: string, port: number) {
        this.express = express();
        this.host = host; 
        this.port = port;

        this.express.use(express.json());
        this.express.use("/api", apiRouter);
    }

    public run(): void {
        this.express.listen(this.port, () => {
            console.log(
                `Server listen on ${ this.host }:${ this.port }`
            );
        });

    }

}