import express from "express";
import { Express } from "express";

export default class App {

    private express: Express;
    private host: string;
    private port: number;

    constructor(host: string, port: number) {
        this.express = express();
        this.host = host; 
        this.port = port;

        this.express.use(express.json());

    }

    public run(): void {
        this.express.listen(this.port, () => {
            console.log(
                `Server listen on ${ this.host }:${ this.port }`
            );
        });

    }

}