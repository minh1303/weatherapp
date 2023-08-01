import "./style.css";

const button = document.getElementById("getweatherbutton");
const locationInput = document.getElementById("locationinput");
const weather = document.getElementById("mainweather");
const temp = document.getElementById("temp");
const feelslike = document.getElementById("feelslike");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const weatherinfo = document.getElementById("weatherinfo");



const fetchWeather = async (location = "Ho Chi Minh") => {
  const apikey = "f54120370a6e98c099df2e323705992e";
  const geodata = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${apikey}`
  );
  const locationData = await geodata.json();

  const data = await fetch(
    `http://api.openweathermap.org/data/2.5/forecast?id=524901&lat=${locationData[0].lat}&lon=${locationData[0].lon}&appid=${apikey}&units=metric`
  );
  const dataJSON = await data.json();
  return dataJSON.list[0];
};

const main = () => {
  button.addEventListener("click", async () => {
  
    if (!locationInput.value) return alert("You have to input location")
    const data = await fetchWeather(locationInput.value);
    weather.innerText = data.weather[0].main
    temp.innerText = data.main.temp
    feelslike.innerText = data.main.feels_like
    humidity.innerText = data.main.humidity
    wind.innerText = data.wind.speed
    weatherinfo.classList.remove("hidden")
  });
};

main()