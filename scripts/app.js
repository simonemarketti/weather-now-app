// Query
const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");

// Retrieve city info from api
const updateCity = async (city) => {
  const cityDets = await getCity(city);
  const weather = await getWeather(cityDets.Key);

  return { cityDets, weather };

}

// update the UI
const updateUI = (data) => {
  const { cityDets, weather } = data;

  // display card
  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }

  // update weather info 
  details.innerHTML = `
    <p class="my-3 fs-3">${cityDets.EnglishName}</p>
    <p class="my-3 fs-5 fst-italic fw-bold">${weather.WeatherText}</p>
    <div class="display-4 my-4">
      <span>${weather.Temperature.Metric.Value}</span>
      <span>&deg; C</span>
    </div>
`;

  // update day/nigth image
  if (weather.IsDayTime) {
    time.setAttribute("src", "assets/day.svg")
  } else {
    time.setAttribute("src", "assets/night.svg")
  }

  // set icon
  icon.setAttribute("src", `assets/icons/${weather.WeatherIcon}.svg`)

};

// Add event listener and invoke functions
cityForm.addEventListener("submit", e => {
  e.preventDefault();

  const city = cityForm.city.value.trim();
  cityForm.reset();

  updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));

});

