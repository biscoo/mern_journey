// your API key — keep this safe, never share it publicly
const API_KEY = "e4dbe35ef427cf67312e89e5e6d5c0bd";

// async means this function can use await inside it
async function getWeather() {
  // get the city the user typed
  let city = document.querySelector("#city-input").value;
  // grab the result div
  let result = document.querySelector("#result");
  // stop here if the input is empty
  if (city === "") {
    result.innerHTML = `<p>Please enter a city</p>`;
    //alert("Please enter a city");
    return; // exits the function immediately
  }

  // build the URL — we attach the city and API key
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  // fetch() sends a request to that URL and waits for a response
  let response = await fetch(url);

  // convert the response to a JavaScript object we can read
  let data = await response.json();
  if (data.cod === "404") {
    result.innerHTML = `<p>City not found. Please try again.</p>`;
    return;
  }

  // build the HTML string and inject it into the div
  result.innerHTML = `
  <h2>${data.name}</h2>
  <p>Temperature: ${data.main.temp}°C</p>
  <p>Weather: ${data.weather[0].description}</p>
  <p>Humidity: ${data.main.humidity}%</p>
`;

  // log it so we can see what came back
  console.log(data);
}
