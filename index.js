import "dotenv/config";
import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const weatherURL = "https://api.open-meteo.com/v1/forecast";

app.use(express.static("public"));

app.get("/", async (req, res) => {
  const result = await axios.get(weatherURL, {
    params: {
      latitude: 51.5,
      longitude: -0.1,
      hourly: "temperature_2m",
      timezone: "auto"
    }
  });
  res.render("index.ejs", {apiResponse: result.data.hourly.temperature_2m});
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});