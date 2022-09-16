import "./App.css";
import Input from "./component/Input";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [degree, setDegree] = useState(null);
  const [location, setLocation] = useState("");
  const [userLocation, setUserLocation] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState();
  const [country, setCountry] = useState("");
  const [dataFetched, setDataFetched] = useState(false);

  const API_KEY = "2f5bad01ebec2ce0703d97a15e499e3b";

  const fetchData = async (e) => {
    e.preventDefault();

    try{
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${userLocation}&appid=${API_KEY}&units=metric`
    );
    const data = await res.data;
    console.log(data);

    setDegree(data.main.temp);
    setLocation(data.name);
    setDescription(data.weather[0].description);
    setIcon(data.weather[0].icon);
    setCountry(data.sys.country);

    setDataFetched(true);
    } catch(err){
      console.log(err)
      alert("Please enter a valid location")
    }
  };

  const monthNames = ["January",
  "February",
  "March","April","May","June","July","August","September","Octomber","November","December",
]
  const time = new Date()
  console.log(time)

  const defaultDataFetched = async () => {
    if (!dataFetched) {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=nagpur&appid=${API_KEY}&units=metric`
      );
      const data = await res.data;
      // console.log(data)

      setDegree(data.main.temp);
      setLocation(data.name);
      setDescription(data.weather[0].description);
      setIcon(data.weather[0].icon);
      setCountry(data.sys.country);
    }
  };

  useEffect(() => {
    defaultDataFetched();
  }, []);
  return (
    <div className="App">
      <div className="weather">
        <Input
          text={(event) => setUserLocation(event.target.value)}
          submit={fetchData}
          func={fetchData}
        />
        <div className="weather_location ">
          <div className="info_section ">
            <h3>
              {location}, {country}
            </h3>
            <p className="weather_date">{monthNames[time.getMonth()]} {time.getDate()}</p>
          </div>

          <div className="deg_section ">
            <h1 className="weather_degrees">{degree} °C</h1>
          </div>

          <div className="weather_description">
            <span className="weather_icon">
              <img
                src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
                alt=""
              />
              <div className="icon_bg">

              </div>
            </span>

            <h4>{description}</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
