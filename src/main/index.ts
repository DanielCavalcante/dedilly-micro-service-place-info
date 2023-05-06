import express from "express";
import { InMemoryPlaceInfoRepository } from "../infra/in-memory/in-memory-place-info-repository";
import { ExpressAdapter } from "./adapters/express-adapter";
import { PlaceInfoRouter } from "./routes/place-info-router";
import * as dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

const defaultAdapter = new ExpressAdapter(app);

const defaultPlaceInfoRepository = new InMemoryPlaceInfoRepository();

const routers = [
  new PlaceInfoRouter(defaultAdapter, defaultPlaceInfoRepository),
];

for (const router of routers) {
  router.register();
}

console.log(process.env.PORT);

app.listen(process.env.PORT, () => {
  console.log(`Place info is listening (${process.env.PORT ?? 3001})`);
});
