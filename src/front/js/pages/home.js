import React, { useContext,useRef,useState,useEffect } from "react";
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
	const [playing, setPlaying] = useState(false);
	const [nombre,setNombre] = useState("");
	const [found, setFound] = useState([]);
	const [foundData, setFoundData] = useState([]);

	useEffect(() => {
		const verif = localStorage.getItem("player");
		if (verif) {
			const savedData = JSON.parse(verif);
			setFoundData(savedData); 
		  }
	  }, []);

	const  searchPlayer = async () => {
            await actions.getPlayer(nombre);
			console.log(store.player);
			// location.reload();
    }

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

	const playOrPause = () => {
		setPlaying(!playing);
	}

	const fastForward = () => {
		if (repro.current) {
			const currentTime = repro.current.getCurrentTime();
			repro.current.seekTo(currentTime+5, 'seconds')
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
						url="https://www.youtube.com/watch?v=2Pzx8pBMwXE"
						controls
						playing={playing}
						ref={repro}
					/>
					<button className="mt-3 btn-save" onClick={()=>playOrPause()}>{playing ? 'Pausa' : 'Play'}</button>
					<button className="mt-3 btn-save" onClick={()=>verTiempo()}>SAVE</button>
					<button className="mt-3 btn-save" onClick={()=>fastForward()}>FF</button>
					<div>{time && <p>Minuto Capturado: {time}</p>}</div>
				</div>
			</div>
			<div className="col-4 mt-5">
				<div>{highs.map((item,index)=>(<div key={index}><button className="my-2 btn-high" onClick={()=>goToTime(item)}>ver jugada {index+1} {time}</button></div>))}</div>

			</div>
		</div>
		<div className="row">
			<div className="container-fluid text-center">
				<input type="text" onChange={(e)=>setNombre(e.target.value)} value={nombre}></input>
				<button type="submit" className="mt-3 btn-save" onClick={()=>searchPlayer()}>Buscar</button>
				<div>{localStorage.getItem("player") && <p>{foundData.name}</p>}</div>
			</div>
		</div>
		</>
	);
};
