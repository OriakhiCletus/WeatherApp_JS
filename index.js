//weatherApp

//needed variables
const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "0c1a58cbf603030c50e1fe7be3343e02";

//listen for the submit event(after the user clicks 'get weather')
weatherForm.addEventListener("submit", async event => {

    event.preventDefault();

    const city = cityInput.value;

    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    } 
    else{
        displayError("Please enter a valid city")
    }

});

//function to get weather data on the input city
async function getWeatherData(city){

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(apiUrl);

    console.log(response);

    if(!response.ok){
        throw new Error("Could not fetch weather data")
    }

    return await response.json();

}

//function to display the weather info
function displayWeatherInfo(data){

    const {name: city, 
           main: {temp, humidity},
           weather: [{description, id}]} = data;
    
    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");
}

//get weather emoji based on what the weather is
function getWeatherEmoji(weatherId) {

}

//function to display errors if any
function displayError(message){

    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay") //add the css class(.errorDisplay)

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}