const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			highlights: [],
			player: [],
		},

		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			addMovement: (interval) => {
				const store = getStore();
				setStore({highlights: interval});
			},


			getPlayer: async (search) => {
				const store = getStore()
				try{
					const resp = await fetch(`https://cors-anywhere.herokuapp.com/https://transfermarkt-api.fly.dev/players/search/${search}`, {
						// mode: 'no-cors',
						headers:{
							"accept": "application/json",
        					"X-Requested-With": "XMLHttpRequest",
						},
					});
					const data = await resp.json()
					if (resp.status === 200){
					localStorage.setItem("player",JSON.stringify(data.results))
					setStore({ player: data.results })
					// don't forget to return something, that is how the async resolves
					
					}
				}catch (err) {
					console.error("Error:", err);
				}
			},


			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
