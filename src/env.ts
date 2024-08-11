import { z } from "zod";

const envSchema = z.object({
    SERVER_HOST: z.string().url(),
    SERVER_PORT: z.coerce.number(),
    UPLOAD_PATH: z.string()
});

const env = envSchema.parse(process.env);

export default env;