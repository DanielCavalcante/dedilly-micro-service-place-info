import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const openMeteoBaseUrl = axios.create({
  baseURL:
    process.env.OPEN_METEO_BASE_URL ?? "https://api.open-meteo.com/v1/forecast",
});

export default openMeteoBaseUrl;
