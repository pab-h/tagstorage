import App from "./app";
import env from "./env";

const app = new App(
    env.SERVER_HOST,
    env.SERVER_PORT
);

app.run();