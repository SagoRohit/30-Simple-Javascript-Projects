const apikey = "f7b71d8fad73c4d6f1294d44c33a7af6";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchbox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const wathericon = document.querySelector(".wather-icon");

async function checkweather(city) {
    const response = await fetch(apiurl + city + `&appid=${apikey}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".wather").style.display = "none";
    } else {

        var data = await response.json();


        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " Km/h";

        if (data.weather[0].main == "Clouds") {
            wathericon.src = "images/clouds.png";
        } else if (data.weather[0].main == "Clear") {
            wathericon.src = "images/clear.png";
        } else if (data.weather[0].main == "Rain") {
            wathericon.src = "images/rain.png";
        } else if (data.weather[0].main == "Drizzle") {
            wathericon.src = "images/drizzle.png";
        } else if (data.weather[0].main == "Mist") {
            wathericon.src = "images/mist.png";
        }

        document.querySelector(".wather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }


}

searchbtn.addEventListener("click", () => {
    checkweather(searchbox.value);
})
