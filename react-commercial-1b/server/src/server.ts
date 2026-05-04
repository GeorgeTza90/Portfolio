import express from "express";
import cors from "cors";
import "dotenv/config";
import router from "./router";
import helmet from "helmet";

const app = express();
app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: {policy: "cross-origin"}
}));

/* -------------------- Load environment variables -------------------- */
const PORT = Number(process.env.PORT ?? 3000);
const allowedOrigins =
    process.env.CLIENT_ORIGINS?.split(",").map(o => o.trim()) ?? [
        "https://icvacations.netlify.app",
        "http://localhost:5173"
    ];

/* -------------------- Core config -------------------- */
app.set("trust proxy", 1);
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json({ limit: "100kb" }));
app.use("/api", router);

/* -------------------- Start Server -------------------- */
app.listen(PORT, () => console.log(`Server is running!`));