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
      const hotmeal ="Ooooh, it's cold🥶 outside. This will warm you up!";
      document.querySelector(".meal__temp").innerHTML = hotmeal;
    } else {
      this.getHotMeal();
      const coldmeal ="Ooooh, it's hot😎 outside. This will cool you off!";
      document.querySelector(".meal__temp").innerHTML = coldmeal;
    }
  }

  getColdMeal() {
    fetch(
      "https://api.spoonacular.com/recipes/665307/information?apiKey=d77d984bfea44e87bd12c1827d291ea5&includeNutrition=false"
    )
      .then((response) => response.json())
      .then((data) => {
        this.displayMeal(data);
      });
  }

  getHotMeal() {
    fetch(
      "https://api.spoonacular.com/recipes/1096207/information?apiKey=d77d984bfea44e87bd12c1827d291ea5&includeNutrition=false"
    )
      .then((response) => response.json())
      .then((data) => {
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
