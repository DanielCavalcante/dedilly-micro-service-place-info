import axios from "axios";

const geoCodeBaseUrl = axios.create({
  baseURL: "https://geocode.maps.co/",
});

export default geoCodeBaseUrl;
