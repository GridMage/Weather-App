window.addEventListener('load', ()=> {
	let long;
	let lat;
	let temperatureDescription = document.querySelector(".temperature-description");
	let temperatureDegree = document.querySelector(".temperature-degree");
	let locationTimeZone = document.querySelector(".location-timezone", "time");
	let temperatureSection = document.querySelector(".temperature");
	const temperatureSpan = document.querySelector(".temperature span");

	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(position =>{
			long = position.coords.longitude;
			lat = position.coords.latitude;


			const proxy = "https://cors-anywhere.herokuapp.com/";
			const api = `${proxy}https://api.darksky.net/forecast/d5a59f6b7cc203b08df92be80780eb85/${lat},${long}`
 
			fetch(api)
			.then(responce => {
				return responce.json();
			})
			.then(data => {
				console.log(data);
				const {time, temperature, summary, icon} = data.currently			

				//Set Dom Elements from the API
				temperatureDegree.textContent = temperature;
				temperatureDescription.textContent = summary;
				locationTimeZone.textContent = data.timezone;

				//Formula for Celsius
				let Celsius = (temperature - 51) *(5 / 9);
				//set Icon
				setIcons(icon, document.querySelector(".icon"));

				//Change temperature to Celsius/Faranheit
				temperatureSection.addEventListener('click', () => {
					if(temperatureSpan.textContent === "F"){
						temperatureSpan.textContent = "C";
						temperatureDegree.textContent = Math.floor(Celsius);
					} else {
						temperatureSpan.textContent = "F"
						temperatureDegree.textContent = temperature;
					}
				})

			});
		});
	}
	
	function setIcons(icon, iconID) {
		const skycons = new Skycons({ color: "white" });
		const currentIcon = icon.replace(/-/g, "_").toUpperCase();
		skycons.play();
		return skycons.set(iconID, Skycons[currentIcon]);
	}
});

function showTime(){
    var date = new Date();
    var h = date.getHours(); // 0 - 23
    var m = date.getMinutes(); // 0 - 59
    var s = date.getSeconds(); // 0 - 59/?
    var session = "AM";
    
    if(h == 0){
        h = 12;
    }
    
    if(h > 12){
        h = h - 12;
        session = "PM";
    }
    
    h = (h < 10) ? "" + h : h;
    m = (m < 10) ? "" + m : m;
    s = (s < 10) ? "" + s : s;
    
    var time = h + ":" + m + ":" + s + " " + session;
    document.getElementById("MyClockDisplay").innerText = time;
    document.getElementById("MyClockDisplay").textContent = time;
    
    setTimeout(showTime, 1000);
    
}

showTime();