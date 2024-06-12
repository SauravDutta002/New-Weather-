const temperature = document.querySelector(".temperature");
const weatherType = document.querySelector(".description");
const windSpeed = document.querySelector("#windSpeed")
const winddeg = document.querySelector("#winddeg")
const sunrise = document.querySelector("#sunrise")
const sunset = document.querySelector("#sunset")
const Humidity = document.querySelector("#humi")
const feelslike = document.querySelector("#feelslike")
const Visibility = document.querySelector("#visibility")
const pressure = document.querySelector("#pressure")
const searchcontainer = document.querySelector(".search-cont")
const searchbtn = document.querySelector(".search-btn")
const place = document.querySelector("#place")
const date = document.querySelector("#date")
const weather_img = document.querySelector(".weather-images")
const NotFound = document.querySelector("#notfound")
const body = document.querySelector(".body")
const back = document.querySelector("#back")
const back2 = document.querySelector("#back2")


var Location_Btn = document.getElementById("#visibility");
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(

            function showPosition(position) {


                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                console.log(position.coords.latitude);
                console.log(position.coords.longitude);



                async function checklocation(latitude, longitude) {

                    const apikey = "0db59ec3ecc87d88349e9143bfd5771e";
                    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`;
                    const weatherdata = await fetch(`${url}`).then(response => response.json());
                    console.log(weatherdata);

                    temperature.innerHTML = `${Math.round(weatherdata.main.temp - 273.15)}°C`;

                    if (weatherdata.cod === `404`) {
                        temperature.innerHTML = "No data found....";
                        weather_img.style.display = "none"
                        Visibility.innerHTML = `---`;
                        windSpeed.innerHTML = `---`;
                        winddeg.innerHTML = `---`;
                        sunrise.innerHTML = `  ---`
                        sunset.innerHTML = `---`
                        pressure.innerHTML = `---`
                        Humidity.innerHTML = `---`
                        feelslike.innerHTML = `---`
                        date.innerHTML=`--- `
                        place.innerHTML=`--- `
                        console.log("error");
                    } else {
                
                        weather_img.style.display = "block"
                    }

                    temperature.innerHTML = `${Math.round(weatherdata.main.temp - 273.15)}°C`;
                    weatherType.innerHTML = `${weatherdata.weather[0].main}`
                    windSpeed.innerHTML = ` ${weatherdata.wind.speed} Km/ph`;
                    winddeg.innerHTML = ` ${weatherdata.wind.deg}° `;
                    sunrise.innerHTML = ` ${weatherdata.sys.sunrise}`;
                    sunset.innerHTML = ` ${weatherdata.sys.sunset}`;
                    Humidity.innerHTML = `${weatherdata.main.humidity}%`;
                    feelslike.innerHTML = `${Math.round(weatherdata.main.feels_like - 273.15)}°C`;
                    Visibility.innerHTML = `${weatherdata.visibility}`
                    pressure.innerHTML = `${weatherdata.main.pressure}hpa`
                    place.innerHTML = ` ${weatherdata.name}`;
                    date.innerHTML = `${weatherdata.dt}`


                    function convertUnixTimestampTo12HourTime(unixTimestamp) {
                        const date = new Date(unixTimestamp * 1000);
                        const hours = date.getHours();
                        const minutes = `0${date.getMinutes()}`.slice(-2);
                        const ampm = hours >= 12 ? 'PM' : 'AM';
                        const formattedHours = hours % 12 || 12;
                        const formattedTime = `${formattedHours}:${minutes} ${ampm}`;
                        return formattedTime;
                    }

                    const timeString = convertUnixTimestampTo12HourTime(sunset.innerHTML);
                    sunset.innerHTML = timeString;

                    const timeString2 = convertUnixTimestampTo12HourTime(sunrise.innerHTML);
                    sunrise.innerHTML = timeString2;

                    function formatTimestamp(timestamp) {
                        const day = new Date(timestamp * 1000);
                        const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

                        const weekday = weekdays[day.getDay()];
                        const dayOfMonth = day.getDate();
                        const month = months[day.getMonth()];

                        return `${weekday}, ${dayOfMonth} ${month}`;
                    }

                    const formattedDate = formatTimestamp(date.innerHTML);
                    console.log(formattedDate);
                    date.innerHTML = formattedDate;

                    function metersToKilometers(visibilityInMeters) {
                        const visibilityInKilometers = visibilityInMeters / 1000;
                        return `${visibilityInKilometers} km`;
                    }

                    Visibility.innerHTML = metersToKilometers(Visibility.innerHTML);


                    if (weatherdata.weather[0].main == "Clear") {
                        weather_img.src = "assets/clear.png";
                        // back.src = "assets/sunny.mp4";

                    }
                    else if (weatherdata.weather[0].main == "Clouds") {
                        weather_img.src = "assets/cloud.png";
                        back.src = "assets/cloud.mp4";
                    }
                    else if (weatherdata.weather[0].main == "Haze") {
                        weather_img.src = "assets/mist.png";
                        // back.src = "assets/haze.mp4";
                    }
                    else if (weatherdata.weather[0].main == "Rain") {
                        weather_img.src = "assets/rain.png";
                        // back.src = "assets/rain-bg.mp4";
                    }
                    else if (weatherdata.weather[0].main == "Mist") {
                        weather_img.src = "assets/mist.jpg";
                        // back.src = "assets/mist.mp4";

                    }
                    else if (weatherdata.weather[0].main == "Snow") {
                        weather_img.src = "assets/thunder.png";
                        back.src = "assets/snow.mp4";

                    }
                }

                checklocation(latitude, longitude);
            },
        );
    } else {
        message.innerHTML = "Geolocation is not supported by this browser.";
    }
}



async function checkwether(city) {

    const apikey = "0db59ec3ecc87d88349e9143bfd5771e";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    const weatherdata = await fetch(`${url}`).then(response => response.json());
    console.log(weatherdata);

    if (weatherdata.cod === `404`) {
        temperature.innerHTML = "No data found....";
        weather_img.style.display = "none"
        Visibility.innerHTML = `---`;
        windSpeed.innerHTML = `---`;
        winddeg.innerHTML = `---`;
        sunrise.innerHTML = `  ---`
        sunset.innerHTML = `---`
        pressure.innerHTML = `---`
        Humidity.innerHTML = `---`
        feelslike.innerHTML = `---`
        date.innerHTML=`--- `
        place.innerHTML=`--- `
        console.log("error");
    } else {

        weather_img.style.display = "block"
    }


    temperature.innerHTML = `${Math.round(weatherdata.main.temp - 273.15)}°C`;
    weatherType.innerHTML = `${weatherdata.weather[0].main}`
    windSpeed.innerHTML = ` ${weatherdata.wind.speed} Km/ph`;
    winddeg.innerHTML = ` ${weatherdata.wind.deg}° `;
    sunrise.innerHTML = ` ${weatherdata.sys.sunrise}`;
    sunset.innerHTML = ` ${weatherdata.sys.sunset}`;
    Humidity.innerHTML = `${weatherdata.main.humidity}%`;
    feelslike.innerHTML = `${Math.round(weatherdata.main.feels_like - 273.15)}°C`;
    Visibility.innerHTML = `${weatherdata.visibility}`
    pressure.innerHTML = `${weatherdata.main.pressure}hpa`
    place.innerHTML = ` ${weatherdata.name}`;
    date.innerHTML = `${weatherdata.dt}`


    function convertUnixTimestampTo12HourTime(unixTimestamp) {
        const date = new Date(unixTimestamp * 1000);
        const hours = date.getHours();
        const minutes = `0${date.getMinutes()}`.slice(-2);
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;
        const formattedTime = `${formattedHours}:${minutes} ${ampm}`;
        return formattedTime;
    }

    const timeString = convertUnixTimestampTo12HourTime(sunset.innerHTML);
    sunset.innerHTML = timeString;

    const timeString2 = convertUnixTimestampTo12HourTime(sunrise.innerHTML);
    sunrise.innerHTML = timeString2;

    function formatTimestamp(timestamp) {
        const day = new Date(timestamp * 1000);
        const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        const weekday = weekdays[day.getDay()];
        const dayOfMonth = day.getDate();
        const month = months[day.getMonth()];

        return `${weekday}, ${dayOfMonth} ${month}`;
    }

    const formattedDate = formatTimestamp(date.innerHTML);
    console.log(formattedDate);
    date.innerHTML = formattedDate;

    function metersToKilometers(visibilityInMeters) {
        const visibilityInKilometers = visibilityInMeters / 1000;
        return `${visibilityInKilometers} km`;
    }

    Visibility.innerHTML = metersToKilometers(Visibility.innerHTML);



    if (weatherdata.weather[0].main == "Clear") {
        weather_img.src = "assets/clear.png";
        // back.src = "assets/sunny.mp4";

    }
    else if (weatherdata.weather[0].main == "Clouds") {
        weather_img.src = "assets/cloud.png";
        back.src = "assets/cloud.mp4";
    }
    else if (weatherdata.weather[0].main == "Haze") {
        weather_img.src = "assets/mist.png";
        // back.src = "assets/haze.mp4";
    }
    else if (weatherdata.weather[0].main == "Rain") {
        weather_img.src = "assets/rain.png";
        // back.src = "assets/rain-bg.mp4";
    }
    else if (weatherdata.weather[0].main == "Mist") {
        weather_img.src = "assets/mist.jpg";
        // back.src = "assets/mist.mp4";

    }
    else if (weatherdata.weather[0].main == "Snow") {
        weather_img.src = "assets/thunder.png";
        back.src = "assets/snow.mp4";

    }

}

searchbtn.addEventListener("click", () => {
    checkwether(searchcontainer.value);
})

