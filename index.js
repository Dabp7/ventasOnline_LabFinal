import mongoose from 'mongoose';
import { config } from "dotenv";
import { initServer } from "./configs/server.js";

config();
initServer().catch(async () => { await mongoose.disconnect(); console.error('Startup failed. Check local database and configuration.'); process.exitCode = 1; });
