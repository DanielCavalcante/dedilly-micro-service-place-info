import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const geoCodeBaseUrl = axios.create({
  baseURL: process.env.GEO_CODE_BASE_URL ?? "https://geocode.maps.co/",
});

export default geoCodeBaseUrl;
