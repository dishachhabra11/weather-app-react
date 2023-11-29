import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [border, setBorder] = useState(false);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=2d5ec028934f38997db4acb6ce2b7de6`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setBorder(true);
    }
  };

  const imgurl = `http://openweathermap.org/img/w/${
    data.weather ? data.weather[0].icon : null
  }.png`;

  return (
    <div className="app">
      <div className="search">
        <input
          type="text"
          spellCheck="false"
          placeholder="Enter the location"
          value={location}
          onChange={(event) => {
            setLocation(event.target.value);
          }}
          onKeyDown={searchLocation}
        />
      </div>
      <div
        className="container"
        style={
          border === true
            ? { border: "solid rgba(0, 0, 0, 0.4)", borderRadius: "5px" }
            : null
        }
      >
        <div className="top">
          <div className="location">
            <div className="image">
              <img src={imgurl} alt=""></img>
            </div>
            <div>{data.name}</div>
          </div>
          <div className="temp">
            {data.main ? (
              <h1>
                {data.main.temp} <sup>o</sup>F
              </h1>
            ) : null}
          </div>
          <div className="description ">
            {data.weather ? <h2>{data.weather[0].main} </h2> : null}
          </div>
        </div>
        <div className="bottom">
          <div className="feels">
            {data.main ? (
              <p className="bold">
                {data.main.feels_like}
                <sup>o</sup>F
              </p>
            ) : null}
            <p>Feels like</p>
          </div>
          <div className="humidity">
            {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
            <p>Humidity</p>
          </div>
          <div className="wind">
            {data.wind ? <p className="bold">{data.wind.speed} km/hr</p> : null}
            <p>Wind</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
