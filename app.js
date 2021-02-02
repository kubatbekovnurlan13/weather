const express = require('express');
const http = require('http');
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));


app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
});

app.post("/", function(req, res) {

  const city = req.body.cityName
  const apiKey = '5cd8e30231277cbeaf168f6805b0603f'
  const units = 'metric'
  const url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey + '&units=' + units;
  http.get(url, function(response) {

    response.on("data", function(data) {
      const weatherData = JSON.parse(data)
      // console.log(weatherData)
      const temp = weatherData.main.temp
      const description = weatherData.weather[0].description
      const icon = weatherData.weather[0].icon
      const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"

      res.write("<h1>The weather in: " + city + "<h1>");
      res.write("<h1>The weather is currently: " + description + "<h1>");
      res.write("<h2>The temperature is: " + temp + " degree Celcius.<h2>");
      res.write("<img src=" + imageUrl + ">");
      res.send();

    })
  });
})

app.listen(3000, function() {
  console.log("The server is running on port 3000 .. ")
});
