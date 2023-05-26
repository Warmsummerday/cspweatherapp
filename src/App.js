//https://www. youtube.com/watch?v=UjeXpct3p7M tutorial followed
import './App.css';
import {useState} from 'react'
import axios from "axios"



function App() {
  //handling the logic
  //state for the data received from the api call
  const [data, setData] = useState({})
  //state for the location entered
  const [location, setLocation] = useState('')
  //api url
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=7630db4c978ec8f1b738c4d4d01382bd`

  //Function to handle the api call, if the user presses enter, the function makes an api call to the weather api
const searchLocation = (event) => {
  if(event.key === 'Enter'){
    //https://levelup.gitconnected.com/3-ways-to-make-an-api-call-in-react-3734d025d92 tutorial used
    axios.get(url).then((response) => {
      //set state to the receive dresponse
      setData(response.data)
    }).catch(error => {
      //if invalid city name, ask for a valid city name
      alert("please enter a valid city")
    })
    
    setLocation('')
  } 
}

//displaying the app
  return (
    <div className="App">
      <div className = "search">
        <input 
        //input box for the user, sets value to the given location, when they press enter, find the location in the ap
        value={location}
        type = "text"
        onChange={event => setLocation(event.target.value)}
        onKeyDown={searchLocation}
        placeholder='enter your location'
        ></input>
      </div>
      <div className = "container">
        <div className = "top">
          <div className = "location">
            <p>{data.name}</p>
          </div>
          <div className = "temp">
          {data.main ? <h1>{Math.round((data.main.temp-273) * 1.8 + 32)}°F</h1> : null}
          </div>
          <div className = "description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
        {data.name !== undefined &&
        <div className = "bottom">
          <div className = "feels">
          {data.main ? <p>{Math.round((data.main.feels_like-273) * 1.8 + 32)}°F</p> : null}
            <p>feels like</p>
          </div>
          <div className = "humidity">
            {data.main.humidity ? <p>{data.main.humidity}%</p> : null}
            <p>humidity</p>
          </div>
          <div className = "wind">
            <p>{data.wind.speed} mph</p>
            <p>wind speed</p>
          </div>
        </div>
        }
      </div>
    </div>
  );
}

export default App;
