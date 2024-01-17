const https = require('https');
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import fs from "fs"; 
require('dotenv').config();


const privateKey = fs.readFileSync("./certs/key.pem", "utf8"); 
const certificate = fs.readFileSync("./certs/cert.pem", "utf8");
const certificatePassword = process.env.CERTIFICATE_PASSWORD;

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    server: {
        https: {
            key: privateKey,
            cert: certificate,
            passphrase: certificatePassword, 
        },
    },
});
