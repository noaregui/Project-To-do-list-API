import React, {useState, useEffect} from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {

	const [inputTarea, setInputTarea] = useState("")
	const [listaTareas, setListaTareas] = useState([])

	const obtenerListaTareasAPI = () => {
		fetch("https://playground.4geeks.com/todo/users/ainhoa")
			.then((response) => {
				if (response.ok) {
					return (response.json())
				} else {
					if(response.status === 404) {
						crearUsuario()
					}
				}
				}) 
			.then((result) => setListaTareas(result.todos))
			.catch((error) => console.error(error));
	}
	
	useEffect(() => {
		obtenerListaTareasAPI()
	}, [])
	useEffect(() => {
		obtenerListaTareasAPI()
	}, [listaTareas])
	
	function escribirInput(event) {
		setInputTarea(event.target.value);
	}

	const crearTarea = (inputTarea) => {
		const myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		const raw = JSON.stringify({
		"label": inputTarea,
		"is_done": false
		});

		const requestOptions = {
		method: "POST",
		headers: myHeaders,
		body: raw,
		redirect: "follow"
		};

		fetch("https://playground.4geeks.com/todo/todos/ainhoa", requestOptions)
			.then((response) => response.json())
			.then((result) => setListaTareas([...listaTareas, {label: inputTarea,
			is_done: false}]))
			.catch((error) => console.error(error));
	}

	const pulsarEnter = (e) => {
        if (e.key === "Enter" && inputTarea.trim() !== "") {
           crearTarea(inputTarea);
		   setInputTarea("");
        }
    };
		
	/*Crearemos un nuevo usuario si error 404, para eso utilizaremos POST*/
	const crearUsuario = () => {
		const requestOptions = {
			method: "POST",
			// redirect: "follow"
		  };
		  
		  fetch("https://playground.4geeks.com/todo/users/ainhoa", requestOptions)
			.then((response) => response.json())
			.then((result) => obtenerListaTareasAPI())
			.catch((error) => console.error(error));
	}

	const eliminarTarea = (id) => {
		const raw = "";

		const requestOptions = {
		method: "DELETE",
		body: raw,
		redirect: "follow"
		};

		fetch(`https://playground.4geeks.com/todo/todos/${id}`, requestOptions)
		
		.then((response) => response.json())
		.then((result) => console.log(result))
		.catch((error) => console.error(error));
	} 

	return (
		<div className="body">
			<div className="card">
				<h1>TO DO LIST</h1>
				<div className="input">
					<input
						type="text"
						placeholder="Do you have any tasks in mind?"
						value={inputTarea}
						onChange={escribirInput}
						onKeyDown={pulsarEnter}>
					</input>
				</div>
				<div className="listaTareas">
				{listaTareas.map((elemento, index) => 
				<p key={index}>
					{elemento.label}
					<button
						onClick={() => eliminarTarea(elemento.id)}
					>x</button>
				</p>,
				)}
				</div>
			</div>
			<div className="contador">
				<span> {listaTareas.length} item left</span>
			</div>
		</div>
	);
};

export default Home;
