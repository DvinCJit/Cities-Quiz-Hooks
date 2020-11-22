import React, { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import api from "../api";
import history from "../history";

console.log(process.env);
mapboxgl.accessToken = `${process.env.REACT_APP_MAPBOX_TOKEN}`;

const GameScreen = () => {
  const [result, setResult] = useState("");
  const [modalText, setModalText] = useState("");
  const [play, setPlay] = useState([]);
  const [highScore, setHighScore] = useState(0);
  const [lat, setLat] = useState(49.541342);
  const [lng, setLng] = useState(11.507795);
  const [zoom, setZoom] = useState(3.5);
  const [currentCoords, setCurrentCoords] = useState({});
  const [modalClass, setModalClass] = useState("modal fade");
  const [disabled, setDisabled] = useState(false);
  const mapContainer = useRef(null);

  useEffect(() => {
    window.map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/judithrn/ckd0gl8210h161in8g3guwz60",
      center: [lng, lat],
      zoom: zoom,
    });

    window.marker = new mapboxgl.Marker({
      draggable: true,
    })
      .setLngLat([lng, lat])
      .addTo(window.map);

    const onDragEnd = () => {
      const lngLat = window.marker.getLngLat();
      setCurrentCoords(lngLat);
    };

    window.marker.on("dragend", onDragEnd);

    const data = window.localStorage.getItem("play");
    const obj = JSON.parse(data);
    console.log(obj.data);
    setPlay(obj.data);
  }, [lat, lng, zoom]);

  const handlePlaceCity = async (e) => {
    e.preventDefault();
    const data = window.localStorage.getItem("play");
    const obj = JSON.parse(data);
    const _id = obj.data._id;
    api.placeCity([currentCoords, _id]).then((data) => {
      const playData = data.data

      const popup = new mapboxgl.Popup({ offset: 25 }).setText(
        `You were ${Math.round(playData.distance)} km off from ${
          playData.prev_coords.capitalCity
        }.`
      );
  
      const elem = document.createElement("div");
      elem.className = "marker";
  
      console.log(playData);
  
      new mapboxgl.Marker(elem)
        .setLngLat([playData.prev_coords.long, playData.prev_coords.lat])
        .setPopup(popup)
        .addTo(window.map);
  
      console.log("map after", window.map);
      console.log("marker after", window.marker);
  
      if (playData.km_left <= 0) {
        setResult("Game Over");
        setModalText("You run out of kilometres!");
        fetchHighScore();
        setModalClass("modal-visible fade");
        setDisabled(true);
      } else if (playData.placed_cities.length === 10 && playData.score !== 9) {
        setResult("Game Over");
        setModalText("Those were all the cities!");
        fetchHighScore();
        setModalClass("modal-visible fade");
        disabled(true);
      } else if (playData.score === 9) {
        result("You Win!");
        modalText("You placed all the cities correctly!");
        fetchHighScore();
        modalClass("modal-visible fade");
        disabled(true);
      }
      setPlay(data.data);
      console.log("playData", playData);
    });

    // const popup = new mapboxgl.Popup({ offset: 25 }).setText(
    //   `You were ${Math.round(play.distance)} km off from ${
    //     play.prev_coords.capitalCity
    //   }.`
    // );

    // const elem = document.createElement("div");
    // elem.className = "marker";

    // console.log(play);

    // new mapboxgl.Marker(elem)
    //   .setLngLat([play.prev_coords.long, play.prev_coords.lat])
    //   .setPopup(popup)
    //   .addTo(window.map);

    // console.log("map after", window.map);
    // console.log("marker after", window.marker);

    // if (play.km_left <= 0) {
    //   setResult("Game Over");
    //   setModalText("You run out of kilometres!");
    //   fetchHighScore();
    //   setModalClass("modal-visible fade");
    //   setDisabled(true);
    // } else if (play.placed_cities.length === 10 && play.score !== 9) {
    //   setResult("Game Over");
    //   setModalText("Those were all the cities!");
    //   fetchHighScore();
    //   setModalClass("modal-visible fade");
    //   disabled(true);
    // } else if (play.score === 9) {
    //   result("You Win!");
    //   modalText("You placed all the cities correctly!");
    //   fetchHighScore();
    //   modalClass("modal-visible fade");
    //   disabled(true);
    // }
  };

  const fetchHighScore = async () => {
    await api.getHighScore().then((data) => {
      console.log(data.data[0].score);
      setHighScore(data.data[0].score);
    });
  };

  const handleClose = () => {
    setModalClass("modal fade");
  };

  const handlePlayAgain = () => {
    history.push("/");
    window.location.reload();
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="gameHeader" onClick={() => handlePlayAgain()}>
          {" "}
          Cities Quiz
        </h1>
        <p className="info">Drag marker to {play.current_city} </p>
      </header>
      <div className="scoreboard">
        <p className="scoreboard-text">City: {play ? play.current_city : ""}</p>
        <p className="scoreboard-text">Score: {play ? play.score : 0}</p>
        <p className="scoreboard-text">Km: {play ? play.km_left : 1500}</p>
      </div>

      <div
        ref={(el) => (mapContainer.current = el)}
        className="mapContainer"
        // onClick={() => handleClick()}
      />
      <button
        className="place-city btn"
        onClick={(e) => handlePlaceCity(e)}
        disabled={disabled}
      >
        Place City
      </button>

      <div className={modalClass} id="myModal" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button
                onClick={() => handleClose()}
                className="close-button btn"
              >
                &times;
              </button>
              <h3 className="modal-title">{result}</h3>
            </div>
            <div className="modal-body">
              <p>{modalText}</p>
              <p>High Score: {highScore}</p>
              <p>Your Score: {play.score} </p>
              <p>
                Click on the markers to check your results! Less than 50km off
                is a point.
              </p>
            </div>
            <div className="modal-footer">
              <button
                className="play-button btn"
                onClick={() => handlePlayAgain()}
              >
                Play Again
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameScreen;
