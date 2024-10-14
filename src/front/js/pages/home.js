import React, { useContext,useRef,useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import ReactPlayer from "react-player";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const repro =  useRef(null);
	const [time, setTime] = useState("");
	const [highs, setHighs] = useState("");

	const verTiempo = () => {
		if (repro.current) {
			const currentTime = repro.current.getCurrentTime();
			const minutes = Math.floor(currentTime / 60);
			const seconds = Math.floor(currentTime % 60);
			setTime(`${minutes}:${seconds}`);
			setHighs([...highs, currentTime]),
			actions.addMovement(highs);
			console.log(store.highlights);	
		  }
	}

	return (
		<div className="text-center mt-5">
			<h1>Hello Rigo!!</h1>
			<ReactPlayer
				url="https://www.youtube.com/watch?v=KJYOUBhLsrc&t=180s"
				controls
				// autoPlay
				ref={repro}
			/>
			<button onClick={()=>verTiempo()}>ver tiempo</button>
			<div>{time && <p>Tiempo Reproducido: {time}</p>}</div>
			<div className="alert alert-info">
				{store.message || "Loading message from the backend (make sure your python backend is running)..."}
			</div>
			<p>
				This boilerplate comes with lots of documentation:{" "}
				<a href="https://start.4geeksacademy.com/starters/react-flask">
					Read documentation
				</a>
			</p>
		</div>
	);
};
