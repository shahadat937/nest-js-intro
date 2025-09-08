import { registerAs } from "@nestjs/config";

export default registerAs('database', () => ({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT ?? '5432', 10),
    name: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    syncronize: process.env.DB_SYNC === 'true' ? true : false,
    autoLoadEntities: process.env.DB_AUTO_LOAD === 'true' ? true : false
}))