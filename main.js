///Game of clue version The office

//Variables of games

let containerCharacters;

const suspectsArray = [
	{ id: 0, name: "Michael Scott", name_image: "michael" },
	{ id: 1, name: "Jim Halpert", name_image: "jim" },
	{ id: 2, name: "Dwight Schrute", name_image: "dwight" },
	{ id: 3, name: "Pam Beesly", name_image: "pam" },
	{ id: 4, name: "Ryan Howard", name_image: "ryan" },
	{ id: 5, name: "Oscar Martinez", name_image: "oscar" },
	{ id: 6, name: "Angela Martin", name_image: "angela" },
	{ id: 7, name: "Andy Bernard", name_image: "andy" },
	{ id: 8, name: "Kevin Malone", name_image: "kevin" },
];

const roomsArray = [
	{ id: 0, name: "Recepción", name_image: "recepcion" },
	{ id: 1, name: "Oficina Michael", name_image: "ofi_michael" },
	{ id: 2, name: "Zona de Parking", name_image: "estacionamiento" },
	{ id: 3, name: "Bodega", name_image: "bodega" },
	{ id: 4, name: "Sala de Juntas", name_image: "juntas" },
];

const weaponsArray = [
	{ id: 0, name: "Olla", name_image: "olla" },
	{ id: 1, name: "Limonada Mexicana", name_image: "limonada" },
	{ id: 2, name: "Pistola", name_image: "pistola" },
	{ id: 3, name: "Soplete", name_image: "soplete" },
	{ id: 4, name: "Engrapadora en gelatina", name_image: "engrapadora" },
];

//Function generate number random depending of size of array
let doRandom = (arrSearch) =>
	Math.round(Math.random() * (arrSearch.length - 1));

//Generate array without person die because he dont cant be the murder
let listWithoutMurder = (nameDiedPerson) => {
	newList = suspectsArray.filter((item) => item.name !== nameDiedPerson);
	return newList;
};

//Generate array only with assasin and person died

let genereAssesinMurder = () => {
	let arrayAssesinDied = [],
		numDiedPerson = parseInt(doRandom(suspectsArray)),
		listNoMurdered = listWithoutMurder(suspectsArray[numDiedPerson].name);

	[arrayAssesinDied[0], arrayAssesinDied[1]] = [
		listNoMurdered,
		suspectsArray[numDiedPerson].id,
	];

	// console.log("arrayAssesinDied[0]", arrayAssesinDied[0]);
	// console.log("arrayAssesinDied[1]", arrayAssesinDied[1]);

	return arrayAssesinDied;
};

let oportunities = [false, false, false];

//initialize all variables

let initElements = () => {
	containerCharacters = document.getElementById("containerCharacters");
	containerListSuspects = document.getElementById("containerListSuspects");
	containerListWeapons = document.getElementById("containerListWeapons");
	containerWeapons = document.getElementById("containerWeapons");
	containerListRooms = document.getElementById("containerListRooms");
	containerRooms = document.getElementById("containerRooms");
	containerMurder = document.getElementById("containerMurder");
	points = document.getElementById("points");
	name_suspect = document.getElementById("name_suspect");
	name_weapon = document.getElementById("name_weapon");
	name_rooms = document.getElementById("name_rooms");
	person_murder = document.getElementById("person_murder");
	container_hearts = document.getElementById("hearts");
	localStorage.setItem("num_hearts", 2);
};

let crossListSuspect = (idSuspect) => {
	// console.log("idSuspect--------->", idSuspect);
	id_suspect = idSuspect;
	suspect_list = document.getElementById(`list-suspect-${id_suspect}`);
	console.log("suspect_list", suspect_list);
	suspect_list.classList = "cross-text";
};

let crossListWeapon = (idWeapon) => {
	// console.log("idWeapon--------->", idWeapon);
	id_weapon = idWeapon;
	suspect_list = document.getElementById(`list-weapons-${id_weapon}`);
	console.log("weapon_list", suspect_list);
	suspect_list.classList = "cross-text";
};

let crossListRoom = (idRoom) => {
	console.log("idRoom--------->", idRoom);
	id_room = idRoom;
	suspect_list = document.getElementById(`${id_room}`);
	suspect_list.classList = "cross-text";
};

let generateListSuspects = (arrSuspects) => {
	containerListSuspects.innerHTML = "";

	arrSuspects.forEach((character) => {
		list = document.createElement("li");
		list.innerHTML = `<p class="" id="list-suspect-${character.id}"> ${character.id}.- ${character.name} \n </p> `;
		containerListSuspects.appendChild(list);
	});
};

let generateListWeapons = (arrWeapons) => {
	containerListWeapons.innerHTML = "";
	arrWeapons.forEach((weapons) => {
		let list = document.createElement("li");
		list.innerHTML = `<p class="list-weapons" id="list-weapons-${weapons.id}">   ${weapons.id}.- ${weapons.name} \n </p> `;
		containerListWeapons.appendChild(list);
	});
};

let generateListRooms = (arrRooms) => {
	// console.log("arrWeapons---list", arrRooms);

	containerListRooms.innerHTML = "";
	arrRooms.forEach((rooms) => {
		let list = document.createElement("li");
		list.innerHTML = `<p class="list-Rooms" id="list-room-${rooms.id} > ${rooms.id}.- ${rooms.name} \n </p> `;
		containerListRooms.appendChild(list);
	});
};

//Verify who is the killer
let checkAssasin = (asseMurder, idSuspect) => {
	let arrWitMurd = [...asseMurder];

	num_hearts = parseInt(localStorage.getItem("num_hearts"));
	id_assasin_mistery = parseInt(localStorage.getItem("id_assasin"));

	console.log("id_assasin real", id_assasin_mistery);
	console.log("id_assasin", idSuspect);
	console.log("num_hearts", num_hearts);

	if (num_hearts > 0) {
		if (id_assasin_mistery !== idSuspect) {
			arrWitMurd = arrWitMurd.filter((item) => item.id !== idSuspect);

			// console.log("idSuspect======>>>>", arrWitMurd);

			num_hearts--;

			localStorage.setItem("num_hearts", num_hearts);

			paintHearts(num_hearts);
			paintingCharacters(arrWitMurd);
			crossListSuspect(idSuspect);

			name_suspect.innerHTML = `No es el asesino <span> ${suspectsArray[idSuspect].name} </span>`;
			name_suspect.classList = "name_incorrect";

			playSound("lose");
			swatSuspectFail(
				(suspect = suspectsArray[idSuspect].name),
				(name_image = suspectsArray[idSuspect].name_image),
				"error"
			);
		} else if (id_assasin_mistery === idSuspect) {
			playSound("win");

			console.log("=========son iguales==0");

			name_suspect.innerHTML = `Si es el asesino <span> ${suspectsArray[idSuspect].name} </span>`;
			name_suspect.classList = "name_correct";
			showAssasin();
		}
	} else {
		showLose(id_assasin_mistery);
	}
};

let showLose = (id_assasin) => {
	localStorage.setItem("num_hearts", 5);

	Swal.fire({
		toast: true,
		imageUrl: `./characters/${suspectsArray[id_assasin].name_image}.png`,
		title: `Perdiste el asesino era ${suspectsArray[id_assasin].name}`,
		position: "center",
		showConfirmButton: false,
		timer: 3500,
		timerProgressBar: true,
	});

	console.log("coraqzone", localStorage.getItem("num_hearts"));

	main();
};

let showLoseWeapon = (idWeapon) => {
	localStorage.setItem("num_hearts", 5);

	Swal.fire({
		imageUrl: `./weapons/${weaponsArray[idWeapon].name_image}.png`,
		title: `Perdiste el arma era la ${weaponsArray[idWeapon].name}`,
		position: "center",
		showConfirmButton: true,

		timerProgressBar: true,
	});

	console.log("coraqzone", localStorage.getItem("num_hearts"));

	main();
};

let checkWeapons = (arrayWeapons, idWeapon) => {
	// console.log("array llega ", arrayWeapons, "id de arma", idWeapon);
	// console.log("---arma tecleada id", weaponsArray[idWeapon].name);

	let copyArrWeapons = [...arrayWeapons];

	num_hearts = parseInt(localStorage.getItem("num_hearts"));
	id_weapon_mistery = parseInt(localStorage.getItem("id_weapon"));

	console.log("id_weapon real", id_weapon_mistery);
	console.log("id_weapon misterio", idWeapon);

	if (num_hearts != 0) {
		if (id_weapon_mistery !== idWeapon) {
			copyArrWeapons = copyArrWeapons.filter((item) => item.id !== idWeapon);

			num_hearts--;
			localStorage.setItem("num_hearts", num_hearts);

			paintHearts(num_hearts);
			paintingWeapons(copyArrWeapons);
			crossListWeapon(idWeapon);

			swatWeaponsFail(
				(suspect = weaponsArray[idWeapon].name),
				(name_image = weaponsArray[idWeapon].name_image),
				"error"
			);

			// function pintarUsuario() {
			// 	let user = localStorage.getItem("nombreUsuario");
			// 	nombreUsuario.innerHTML = ` Bienvenido ${user}`;
			// 	nombreUsuario.classList.add("usuario-registrado");
			// }

			name_weapon.innerHTML = `No es el arma ${weaponsArray[id_weapon_mistery].name}`;
			name_weapon.classList = "name_incorrect";
		} else if (id_weapon_mistery == id_weapon_mistery) {
			console.log("es igual");

			name_weapon.innerHTML = `Si es el arma ${weaponsArray[id_weapon].name}`;
			name_weapon.classList = "name_correct";

			showWeapon();
		}
	} else {
		showLoseWeapon(idWeapon);
	}
};

let checkRooms = (arrayRooms, idRoom) => {
	const copyArrRooms = arrayRooms;

	for (element in copyArrRooms) {
		console.log(
			`despues cut "${copyArrRooms[element].id}  ${copyArrRooms[element].name}`
		);
	}

	id_room = localStorage.getItem("id_room");

	let gameWin = 0;

	if (roomsArray[id_room].id !== idRoom) {
		arrayRooms = arrayRooms.filter((item) => item.id !== idRoom);

		paintingRooms(arrayRooms);
		generateListRooms(arrayRooms);

		name_rooms.innerHTML = `No es el lugar la ${roomsArray[idRoom].name}`;
		name_rooms.classList = "name_incorrect";
	} else if (roomsArray[id_room].id == idRoom) {
		name_rooms.innerHTML = `Si es el lugar ${roomsArray[id_room].name}`;
		name_rooms.classList = "name_correct";

		showRooms();
	}
};

let showAssasin = () => {
	let column = document.createElement("div");
	id_assasin = localStorage.getItem("id_assasin");

	containerCharacters.innerHTML = "";

	column.className = "col-6  col-md-3  mt-3";
	column.id = `character-${suspectsArray[id_assasin].id}`;
	column.innerHTML = `
	<div class="card card-special bg-success text-white"  >
  	<img src="./characters/${suspectsArray[id_assasin].name_image}.png" id="imgId-${suspectsArray[id_assasin].id}" class="card-img-top " alt="...">
  	<div class="card-body">
    	<pclass="cardz-title">${suspectsArray[id_assasin].name}</p>
    	<a href="#" id="btn-possAssesin-${suspectsArray[id_assasin].id}" class="btn btn-danger text-white">Asesino Encontrado</a>
  	</div>
	</div>`;

	containerCharacters.append(column);
	containerListSuspects.innerHTML = "";
	let list = document.createElement("li");
	list.innerHTML = `<p > ${id_assasin}.- ${suspectsArray[id_assasin].name} \n </p> `;
	containerListSuspects.appendChild(list);
};

let showWeapon = () => {
	let column = document.createElement("div");

	id_weapon = localStorage.getItem("id_weapon");
	containerWeapons.innerHTML = "";

	column.className = "col-md-3 mt-3";
	column.id = `weapon-${weaponsArray[id_weapon].id}`;
	column.innerHTML = `
	<div class="card card-special bg-success text-white">
		<img src="./weapons/${weaponsArray[id_weapon].name_image}.png" id="imgId-${weaponsArray[id_weapon].id}" class="card-img-top " alt="...">
		<div class="card-body">
			<p class="card-title">${weaponsArray[id_weapon].name}</p>
			<a href="#" id="btn-poss-weapon-${weaponsArray[id_weapon].id}" class="btn btn-primary">Arma encontrada</a>
		</div>
	</div>`;

	containerWeapons.append(column);

	containerListWeapons.innerHTML = "";
	let list = document.createElement("li");
	list.innerHTML = `<p class="list-weapons" > ${id_weapon}.- ${weaponsArray[id_weapon].name} \n </p> `;
	containerListWeapons.appendChild(list);
};

let showRooms = () => {
	let column = document.createElement("div");

	id_room = localStorage.getItem("id_room");
	containerRooms.innerHTML = "";

	column.className = "col-md-3 mt-3";
	column.id = `weapon-${roomsArray[id_room].id}`;
	column.innerHTML = `
	<div class="card bg-success">
  	<img src="./rooms/${roomsArray[id_room].name_image}.png" id="imgId-${roomsArray[id_room].id}" class="card-img-top " alt="...">
	 	<div class="container">
    	<p class="card-title text-white">${roomsArray[id_room].name}</p>  
			<a href="#" id="btn-poss-weapon-${roomsArray[id_room].id}" class="btn btn-primary">Lugar  encontrada</a> 
  	</div>
	</div>`;

	containerRooms.append(column);
	containerListRooms.innerHTML = "";
	list = document.createElement("li");
	list.innerHTML = `<p class="list-Rooms" > ${id_room}.- ${roomsArray[id_room].name} \n </p> `;
	containerListRooms.appendChild(list);
};

let paintingCharacters = (arrSuspects) => {
	containerCharacters.innerHTML = "";

	arrSuspects.forEach((character) => {
		let column = document.createElement("div");

		column.className = "col-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 mt-3 ";
		column.id = `character-${character.id}`;
		column.innerHTML = `
			<a href="#" id="btn-possAssesin-${character.id}" " > 
				<div class="cardz">		
					<img src="./characters/${character.name_image}.png" id="imgId-${character.id}" class="rounded"  style="width:100%" >
					<div class="container">			
						<p class="cardz-title ">${character.name}</p>
					</div>
				</div>		
			</a>
		`;

		containerCharacters.append(column);
		let btnAccuse = document.getElementById(`btn-possAssesin-${character.id}`);
		btnAccuse.onclick = () => checkAssasin(arrSuspects, character.id);
	});
};

let paintingWeapons = (arrWeapons) => {
	containerWeapons.innerHTML = "";
	let id_weapon = 0;

	arrWeapons.forEach((weapon) => {
		let column = document.createElement("div");

		column.className = "col-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 mt-3";
		column.id = `weapon-${weapon.id}`;
		column.innerHTML = `
 
		<a href="#" id="btn-possWeapon-${weapon.id}"  >
			<div class="cardz"  >
				<img src="./weapons/${weapon.name_image}.png" id="imgId-${weapon.id}" class="rounded"  style="width:100%" >
				<div class="container">
					<p class="cardz-title">${weapon.name}</p>
				</div>
			</div>
		</a> 
		`;

		containerWeapons.append(column);
		let btnWeapons = document.getElementById(`btn-possWeapon-${weapon.id}`);
		btnWeapons.onclick = () => checkWeapons(arrWeapons, weapon.id);
	});
};

let paintingRooms = (arrRooms) => {
	containerRooms.innerHTML = "";
	let id_rooms = 0;

	arrRooms.forEach((rooms) => {
		let column = document.createElement("div");

		column.className = "col-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 mt-3";
		column.id = `rooms-${rooms.id}`;
		column.innerHTML = `
		 
		<a href="#" id="btn-poss-rooms-${rooms.id}"  >
			<div class="cardz"  >
				<img src="./rooms/${rooms.name_image}.png" id="imgId-${rooms.id}" class="rounded"  style="width:100%" >
				<div class="container">
					<p class="cardz-title">${rooms.name}</p>
				</div>
			</div>
		</a> `;

		containerRooms.append(column);
		let btnRooms = document.getElementById(`btn-poss-rooms-${rooms.id}`);

		btnRooms.onclick = () => checkRooms(arrRooms, rooms.id);
	});
};

//Generete Murder, weapon and room where the person died
let genereMistery = (arrayWithoutMurdered, numPersonMurdered) => {
	// console.log("-------------->", arrayWithoutMurdered);
	// console.log("-------------->", arrayWithoutMurdered);

	let numAssesin = parseInt(doRandom(arrayWithoutMurdered));

	numAssesin == arrayWithoutMurdered
		? (numAssesin = parseInt(doRandom(arrayWithoutMurdered)))
		: console.log(" ");

	let numWeapon = parseInt(doRandom(weaponsArray));
	let numRoom = parseInt(doRandom(roomsArray));

	localStorage.setItem("id_assasin", numAssesin);
	localStorage.setItem("id_died", numPersonMurdered);
	localStorage.setItem("id_weapon", numWeapon);
	localStorage.setItem("id_room", numRoom);
};

//Put te mistery and said who died
let paintCase = (id_murder) =>
	(person_murder.innerHTML = `Mataron a <span> ${suspectsArray[id_murder].name} </span> tienes que adivinar quién fue, con qué lo mataron y donde lo mató`);

//painting hearts

let paintHearts = (num_hearts) => {
	num_hearts = parseInt(localStorage.getItem("num_hearts"));

	container_hearts.innerHTML = "";
	for (i = 1; i <= num_hearts; i++) {
		heart_ele = document.createElement("span");

		heart_ele.innerHTML = `<i class="fa-solid fa-heart"></i>`;
		container_hearts.append(heart_ele);
	}
};

// Play sound win o lose
let playSound = (win_lose) => {
	let sound = new Audio();

	win_lose == "lose"
		? (sound.src = "./sounds/risa.mp3")
		: (sound.src = "./sounds/aplauso.mp3");

	sound.play();
};

let swatSuspectFail = (suspect, suspect_name) => {
	Swal.fire({
		toast: true,
		imageUrl: `./characters/${suspect_name}_cross.png`,
		title: `Fallaste, el asesino no es ${suspect}`,
		position: "center",
		showConfirmButton: false,
		timer: 1500,
		timerProgressBar: true,
	});
};

let swatWeaponsFail = (weapon, weapon_name) => {
	Swal.fire({
		toast: true,
		imageUrl: `./weapons/${weapon_name}_cross.png`,
		title: `Fallaste, el armas no es la ${weapon}`,
		position: "center",
		showConfirmButton: false,
		timer: 1500,
		timerProgressBar: true,
	});
};

let main = () => {
	//Stores elements in variables
	initElements();

	//Generate name person murder and array without person murdered
	[arrayWithoutMurdered, numPersonMurdered] = genereAssesinMurder();

	// console.log("arrToPlay[0]", arrayWithoutMurdered);
	// console.log("arrToPlay[1]", numPersonMurdered);

	//Generete suspects, weapons and rooms
	generateListSuspects(arrayWithoutMurdered);
	generateListWeapons(weaponsArray);
	generateListRooms(roomsArray);

	//paints suspects, weapons and rooms in the dom
	paintCase(numPersonMurdered);
	paintingCharacters(arrayWithoutMurdered);
	paintingWeapons(weaponsArray);
	paintingRooms(roomsArray);

	num_hearts = 5;

	paintHearts(num_hearts);

	//generates  assasin, person murder, where die and what weapon was use
	genereMistery(arrayWithoutMurdered, numPersonMurdered);
};

main();
