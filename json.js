const weatherform= document.querySelector(".weatherform");
const cityinp= document.querySelector(".cityinput");
const card =document.querySelector(".card");
const apikey = "335286eeac750af71bae38f91f60aeaa";

weatherform.addEventListener("submit",async event=>{
    event.preventDefault();
    const city= cityinp.value;
    if(city){
        try{
            const weatherdata= await getweatherdata(city);
            displayweatherinfo(weatherdata);
            

        }
        catch(error){
            console.error(error);
            erordisplay(error);

        }

    }
    else{
        erordisplay ("please enter a city");
    }
});
async function getweatherdata(city) { 
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    const Response = await fetch(apiurl);
    // console.log(Response);
    if(!Response.ok){
        throw new Error("could not fetch weather data")
    }
    return await Response.json();
}
function displayweatherinfo(data){
    const {name: city, 
           main: {temp, humidity}, 
           weather: [{description, id}]}=data;

    card.textContent ="";
    card.style.display="flex";

    const citydisplay = document.createElement("h1");
    const tempdisplay = document.createElement("p");
    const humiditydisplay = document.createElement("p");
    const descdisplay = document.createElement("p");
    const weatheremoji = document.createElement("p");

    citydisplay.textContent = city;
    tempdisplay.textContent =`${(temp-273.15).toFixed(1)}℃`;
    humiditydisplay.textContent =`Humidity: ${humidity}%`;
    descdisplay.textContent= description;
    weatheremoji.textContent= getweatheremoji(id);

    tempdisplay.classList.add("humiditydisplay");
    tempdisplay.classList.add("tempdisplay");
    citydisplay.classList.add("citydisplay");
    descdisplay.classList.add("descdisplay");
    weatheremoji.classList.add("weatheremoji");

    card.appendChild(citydisplay);
    card.appendChild(tempdisplay);
    card.appendChild(humiditydisplay);
    card.appendChild(descdisplay);
    card.appendChild(weatheremoji);

    }
function getweatheremoji(weatherid){
    switch(true){
        case(weatherid >= 200 && weatherid <300):
            return "⛈";
        case(weatherid >= 300 && weatherid<400):
            return "🌨";
        case(weatherid >= 500 && weatherid<600):
            return "🌨";
        case(weatherid >= 600 && weatherid< 700):
            return "❄";
        case(weatherid >= 700 && weatherid< 800):
            return "🌬";
        case(weatherid ===800):
            return "☀"; 
        case(weatherid >= 801 && weatherid< 810):
            return "☁"; 
        default:
            return "❓";                     

    }

}
function erordisplay(message){
    const errordisplay=document.createElement("p");
    errordisplay.textContent = message;
    errordisplay.classList.add("errordisplay");

    card.textContent="";
    card.style.display ="flex";
    card.appendChild(errordisplay);
}