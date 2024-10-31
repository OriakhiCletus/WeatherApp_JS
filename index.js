//weatherApp

//needed variables
const weatherForm = document.querySelector(".weatherForm"); //select html element(the weather Form) with the class 'weatherForm'
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "714c4f023bc2a8d20f47f61271fdb02f"; //OpenWeather API key

//listen for the submit event(after the user clicks 'get weather')
weatherForm.addEventListener("submit", async event => {

    event.preventDefault(); //prevent the normal HTML action that refreshes forms after input

    const city = cityInput.value;

    if(city){
        try{
            const weatherData = await getWeatherData(city); //if Weather data is gotten, display it on the card using the displayWeatherInfo() function below
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error);        //else if it couldn't be gotten(fetched from API), display error message on the card using the displayError() function below
        }
    } 
    else{
        displayError("Please enter a valid city") //extreme case when the city isn't valid and couldn't be processed at all
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

//function to display the weather info in the card after the user searches
function displayWeatherInfo(data){

    //destructure the JSON data to extra pieces of weather data(name, main, weather) and store them in variables(city, temp, humidity, description, id)
    const {name: city, 
           main: {temp, humidity},
           weather: [{description, id}]} = data;
    
    card.textContent = ""; //initialize empty card content
    card.style.display = "flex"; //the display of the card in the html is none, this would then override it after the search is performed

    //define the variables for the html elements to be created
    const cityDisplay = document.createElement("h1"); //creates an h1 element in the html file to display the city
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    //add data from the destructured JSON above to the html elements that have been created by using varname.textContent
    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`; //alter the formula to display it in Celsius(default is kelvin)
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);

    //add css styling using appropriate class
    cityDisplay.classList.add("cityDisplay"); 
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");

    //add the data to the card to display it
    card.appendChild(cityDisplay); 
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);

}

//get weather emoji based on what the weather is by using the weatherId from the JSON data gotten as response from the API
function getWeatherEmoji(weatherId) {
    
    switch(true){
        case (weatherId >= 200 && weatherId < 300):  // display thunderstorm icon
            return "⛈️";
        case (weatherId >= 300 && weatherId < 400):  //display drizzle(light rain) icon
            return "☔";
        case (weatherId >= 500 && weatherId < 600):  //display heavy rain icon
            return "🌧️";
        case (weatherId >= 600 && weatherId < 700):   //display snow icon
            return "❄️";
         case (weatherId >= 700 && weatherId < 800):  //display icon for unclear atmosphere
            return "🌫️";
         case (weatherId === 800):   //display clear sky
            return "☀️";
        case (weatherId >= 801 && weatherId < 810):   //display cloudy icon
            return "☁️";
        default:
            return "❓";
    }

}

//function to display errors if any
function displayError(message){

    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay") //add the css class(.errorDisplay)

    //design content for card display when it is an error
    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay); //only this error message is added/appended and will display on the card
}