export default class Weather {
  constructor(api_key) {
    this.apiKey = api_key;

    // check if timestamp from localstorage is older than 1 hour
    if (
      localStorage.getItem("weather") &&
      Date.now() - localStorage.getItem("timestamp") < 3600000
    ) {
      // get data from localstorage
      const weatherData = JSON.parse(localStorage.getItem("weather"));
      this.displayWeather(weatherData);
      console.log("from localstorage");
    } else {
      this.getLocation();
    }
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.getWeather.bind(this));
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  getWeather(position) {
    console.log(this);
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    const url = `https://api.weatherapi.com/v1/current.json?key=${this.apiKey}&q=${lat},${lon}&aqi=no`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // save to localstorage
        localStorage.setItem("weather", JSON.stringify(data));
        // save timestamp
        localStorage.setItem("timestamp", Date.now());

        this.displayWeather(data);
      });
  }

  displayWeather(data) {
    const temp = data.current.temp_c;
    document.querySelector(".weather__temp").innerHTML = temp + "°C";

    const weather = data.current.condition.text;
    document.querySelector(".weather__summary").innerHTML = weather;

    const icon = data.current.condition.icon;
    const img = document.createElement("img");
    img.src = icon;
    document.querySelector(".weather__icon").appendChild(img);

    if (temp < 15) {
      this.getColdMeal();
    } else {
      this.getHotMeal();
    }
  }

  getColdMeal() {
    fetch(
      "https://api.spoonacular.com/recipes/649933/information?apiKey=0bda489a00e14eb0ab0909c2d4e675d7&includeNutrition=false"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.displayMeal(data);
      });
  }

  getHotMeal() {
    fetch(
      "https://api.spoonacular.com/recipes/1096207/information?apiKey=0bda489a00e14eb0ab0909c2d4e675d7&includeNutrition=false"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.displayMeal(data);
      });
  }

  displayMeal(data) {
    const title = data.title;
    const image = data.image;
    document.querySelector(".meal__title").innerHTML = title;
    document.querySelector(".meal__image").src = image;
  }
}
