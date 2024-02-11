let apikey = "37ed8113e8281e5f10a73c76a87ec9f9";
let apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

async function checkWeather(cityName) {
  try {
    const response = await fetch(apiurl + `&q=${cityName}&appid=${apikey}`);
    // console.log(response.status);
    const data = await response.json();
    return data;
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

function displayWeather() {
  let search_bar = document.getElementById("search_bar");

  document.getElementById("search_btn").addEventListener("click", () => {
    // if (!search_bar.value || search_bar.value === "")
    //   throw new Error("City name cannot be empty!");
    // else {
    //   checkWeather(search_bar.value);
    //   document.getElementById('city').innerText = search_bar.value;
    // }

    checkWeather(search_bar.value)
      .then((data) => {

        let cloud_img = document.getElementById("cloud-img");
        if (!data.name || data.name === "") {
          document.getElementById('error').style.display = 'block';
          document.getElementsByClassName('weather')[0].style.display = 'none';
          setTimeout(()=>{
            window.location.reload();
          },4000);
          
        }
        document.getElementById("city").innerText = data.name;
        if (data.weather[0].main === "Clouds") {
          cloud_img.src = "./img/cloud.svg";
        } else if (data.weather[0].main === "few clouds") {
          cloud_img.src = "./img/cloud-sun-fill.svg";
        } else if (data.weather[0].main === "rain") {
          cloud_img.src = "./img/cloud-rain-heavy-fill.svg";
        } else if (data.weather[0].main === "thunderstorm") {
          cloud_img.src = "./img/cloud-lightning-rain.svg";
        } else {
          cloud_img.src = "./img/brightness-high.svg";
        }
        console.log(data.weather[0].main);

        document.getElementById("temp").innerText = Math.floor(data.main.temp);
        document.getElementById("humidity").innerText = data.main.humidity;
        document.getElementById("windSpeed").innerText = data.wind.speed;
        document.getElementsByClassName('weather')[0].style.display = 'block'
        document.getElementById('error').style.display = 'none';
        console.log(data);
      })
      .catch((err) => {
        console.log("Enter Valid City name");
      });
  });
}
displayWeather();
