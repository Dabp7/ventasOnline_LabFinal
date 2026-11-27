import { config } from "dotenv";
import { initServer } from "./configs/server.js";

config();
initServer().catch(() => { console.error('Startup failed. Check local database and configuration.'); process.exitCode = 1; });
