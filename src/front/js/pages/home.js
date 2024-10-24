import React, { useContext,useRef,useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import ReactPlayer from "react-player";
import { Navigate } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const repro =  useRef(null);
	const [time, setTime] = useState("");
	const [highs, setHighs] = useState([]);

	const verTiempo = () => {
		if (repro.current) {
			const currentTime = repro.current.getCurrentTime();
			const minutes = Math.floor(currentTime / 60);
			const seconds = Math.floor(currentTime % 60);
			setTime(`${minutes}:${seconds}`);
			setHighs(prevHighs => [...prevHighs, currentTime]),
			actions.addMovement(highs);
			console.log(highs);	
			console.log(store.highlights);	
		  }
	}

	const goToTime = (time) => {
		if (repro.current) {
		  repro.current.seekTo(time, 'seconds'); 
		}
	  };

	return (
		<>
		<div className="row mx-2">
			<div className="col-8">
				<div className="text-center mt-5">
					<ReactPlayer
						url="https://www.youtube.com/watch?v=KJYOUBhLsrc&t=180s"
						controls
						autoPlay
						ref={repro}
					/>
					<button onClick={()=>verTiempo()}>ver tiempo</button>
					<div>{time && <p>Tiempo Reproducido: {time}</p>}</div>
					<button onClick={()=>Navigate("/misjugadas")}> ver Jugadas</button>
				</div>
			</div>
			<div className="col-4">
				<div>{highs.map((item,index)=>(<div key={index}><button onClick={()=>goToTime(item)}>ver jugada {index+1}</button></div>))}</div>

			</div>
		</div>
		</>
	);
};
