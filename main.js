///Game of clue version The office

//Variables of games

let containerCharacters;

let selectUser = 0;

const suspectsArray = [
	{ id: 0, nombre: "Michael Scott", name_image: "michael" },
	{ id: 1, nombre: "Jim Halpert", name_image: "jim" },
	{ id: 2, nombre: "Dwight Schrute", name_image: "dwight" },
	{ id: 3, nombre: "Pam Beesly", name_image: "pam" },
	{ id: 4, nombre: "Ryan Howard", name_image: "ryan" },
	{ id: 5, nombre: "Oscar Martinez", name_image: "oscar" },
	{ id: 6, nombre: "Angela Martin", name_image: "angela" },
	{ id: 7, nombre: "Andy Bernard", name_image: "andy" },
	{ id: 8, nombre: "Kevin Malone", name_image: "kevin" },
];

const roomsArray = [
	{ id: 0, nombre: "Recepción", name_image: "recepcion" },
	{ id: 1, nombre: "Oficina Michael", name_image: "ofi_michael" },
	{ id: 2, nombre: "Zona de Estacionamiento", name_image: "estacionamiento" },
	{ id: 3, nombre: "Bodega", name_image: "bodega" },
	{ id: 4, nombre: "Sala de Juntas", name_image: "juntas" },
];

const weaponsArray = [
	{ id: 0, nombre: "Olla", name_image: "olla" },
	{ id: 1, nombre: "Limonada", name_image: "limonada" },
	{ id: 2, nombre: "Pistola", name_image: "pistola" },
	{ id: 3, nombre: "Soplete", name_image: "soplete" },
	{ id: 4, nombre: "Engrapadora en gelatina", name_image: "engrapadora" },
];

//Function generate number random depending of size of array
let doRandom = (arrSearch) =>
	Math.round(Math.random() * (arrSearch.length - 1));

//Generate array without person die because he dont cant be the murder
let listWithoutMurder = (nameDiedPerson) => {
	newList = suspectsArray.filter((item) => item.nombre !== nameDiedPerson);
	return newList;
};

//Generate array only with assasin and person died

let genereAssesinMurder = () => {
	let arrayAssesinDied = [],
		numDiedPerson = parseInt(doRandom(suspectsArray)),
		listNew = listWithoutMurder(suspectsArray[numDiedPerson].nombre);
	arrayAssesinDied[1] = suspectsArray[numDiedPerson].id;
	arrayAssesinDied[0] = listNew;

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
};

let generateListSuspects = (arrSuspects) => {
	containerListSuspects.innerHTML = "";
	arrSuspects.forEach((character) => {
		let list = document.createElement("li");

		list.innerHTML = `<p > ${character.id}.- ${character.nombre} \n </p> `;

		containerListSuspects.appendChild(list);
	});
};

let generateListWeapons = (arrWeapons) => {
	console.log("arrWeapons---list", arrWeapons);

	containerListWeapons.innerHTML = "";
	arrWeapons.forEach((weapons) => {
		let list = document.createElement("li");
		list.innerHTML = `<p class="list-weapons" > ${weapons.id}.- ${weapons.nombre} \n </p> `;
		containerListWeapons.appendChild(list);
	});
};

let generateListRooms = (arrRooms) => {
	console.log("arrWeapons---list", arrRooms);

	containerListRooms.innerHTML = "";
	arrRooms.forEach((rooms) => {
		let list = document.createElement("li");
		list.innerHTML = `<p class="list-Rooms" > ${rooms.id}.- ${rooms.nombre} \n </p> `;
		containerListRooms.appendChild(list);
	});
};

//Verify who is the killer
let checkAssasin = (asseMurder, idSuspect) => {
	let arrWitMurd = asseMurder;
	const copyArrWitMurd = asseMurder;

	for (element in copyArrWitMurd) {
		console.log(
			`despues cut "${copyArrWitMurd[element].id}  ${copyArrWitMurd[element].nombre}`
		);
	}

	id_assasin = localStorage.getItem("id_assasin");
	console.log("id_assasin", id_assasin);

	let gameWin = 0;

	console.log(
		"---asesino rela",
		suspectsArray[id_assasin].nombre,
		"--- sospechosos",
		idSuspect
	);

	if (suspectsArray[id_assasin].id !== idSuspect) {
		arrWitMurd = arrWitMurd.filter((item) => item.id !== idSuspect);

		paintingCharacters(arrWitMurd);
		generateListSuspects(arrWitMurd);

		name_suspect.innerHTML = `No es el asesino ${suspectsArray[idSuspect].nombre}`;
		name_suspect.classList = "name_incorrect";

		// alert(`no es el asesino ${suspectsArray[idSuspect].nombre}`);
	} else if (suspectsArray[id_assasin].id == idSuspect) {
		console.log("-------------------------- entro");

		name_suspect.innerHTML = `Si es el asesino ${suspectsArray[idSuspect].nombre}`;
		name_suspect.classList = "name_correct";
		// alert(`si es el asesino ${suspectsArray[idSuspect].nombre}`);

		showAssasin();
		// localStorage.clear();
	}
};

let checkWeapons = (arrayWeapons, idWeapon) => {
	console.log("arrya llega ", arrayWeapons, "id de arma", idWeapon);

	console.log("---arma tecleada id", weaponsArray[idWeapon].nombre);

	const copyArrWeapons = arrayWeapons;

	for (element in copyArrWeapons) {
		console.log(
			`despues cut "${copyArrWeapons[element].id}  ${copyArrWeapons[element].nombre}`
		);
	}

	id_weapon = localStorage.getItem("id_weapon");

	let gameWin = 0;

	if (weaponsArray[id_weapon].id !== idWeapon) {
		arrayWeapons = arrayWeapons.filter((item) => item.id !== idWeapon);

		paintingWeapons(arrayWeapons);
		generateListWeapons(arrayWeapons);

		name_weapon.innerHTML = `No es el arma ${weaponsArray[idWeapon].nombre}`;
		name_weapon.classList = "name_incorrect";
	} else if (weaponsArray[id_weapon].id == idWeapon) {
		// console.log("-------------------------- entro");
		name_weapon.innerHTML = `Si es el arma ${weaponsArray[id_weapon].nombre}`;
		name_weapon.classList = "name_correct";

		showWeapon();
	}
};

let checkRooms = (arrayRooms, idRoom) => {
	console.log("arrya llega ", arrayRooms, "id de lugar", idRoom);

	console.log("---lugar tecleada id", roomsArray[idRoom].nombre);

	const copyArrRooms = arrayRooms;

	for (element in copyArrRooms) {
		console.log(
			`despues cut "${copyArrRooms[element].id}  ${copyArrRooms[element].nombre}`
		);
	}

	id_room = localStorage.getItem("id_room");

	let gameWin = 0;

	if (roomsArray[id_room].id !== idRoom) {
		arrayRooms = arrayRooms.filter((item) => item.id !== idRoom);

		paintingRooms(arrayRooms);
		generateListRooms(arrayRooms);

		name_rooms.innerHTML = `No es el lugar la ${roomsArray[idRoom].nombre}`;
		name_rooms.classList = "name_incorrect";
	} else if (roomsArray[id_room].id == idRoom) {
		// console.log("-------------------------- entro");
		name_rooms.innerHTML = `Si es el lugar ${roomsArray[id_room].nombre}`;
		name_rooms.classList = "name_correct";

		showRooms();
	}
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
    	<p class="card-title text-white">${roomsArray[id_room].nombre}</p>  
			<a href="#" id="btn-poss-weapon-${roomsArray[id_room].id}" class="btn btn-primary">con está arma</a> 
  	</div>
	</div>`;

	containerRooms.append(column);

	containerListRooms.innerHTML = "";
	let list = document.createElement("li");
	list.innerHTML = `<p class="list-Rooms" > ${id_room}.- ${roomsArray[id_room].nombre} \n </p> `;
	containerListRooms.appendChild(list);
};

let showAssasin = () => {
	let column = document.createElement("div");
	id_assasin = localStorage.getItem("id_assasin");

	containerCharacters.innerHTML = "";

	column.className = "col-md-3 mt-3";
	column.id = `character-${suspectsArray[id_assasin].id}`;
	column.innerHTML = `
	<div class="card card-special bg-success text-white"  >
  	<img src="./characters/${suspectsArray[id_assasin].name_image}.png" id="imgId-${suspectsArray[id_assasin].id}" class="card-img-top " alt="...">
  	<div class="card-body">
    	<pclass="cardz-title">${suspectsArray[id_assasin].nombre}</p>
    	<a href="#" id="btn-possAssesin-${suspectsArray[id_assasin].id}" class="btn btn-danger text-white">Asesino Encontrado</a>
  	</div>
	</div>`;

	containerCharacters.append(column);
	containerListSuspects.innerHTML = "";
	let list = document.createElement("li");
	list.innerHTML = `<p > ${id_assasin}.- ${suspectsArray[id_assasin].nombre} \n </p> `;
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
			<p class="card-title">${weaponsArray[id_weapon].nombre}</p>
			<a href="#" id="btn-poss-weapon-${weaponsArray[id_weapon].id}" class="btn btn-primary">con está arma</a>
		</div>
	</div>`;

	containerWeapons.append(column);

	containerListWeapons.innerHTML = "";
	let list = document.createElement("li");
	list.innerHTML = `<p class="list-weapons" > ${id_weapon}.- ${weaponsArray[id_weapon].nombre} \n </p> `;
	containerListWeapons.appendChild(list);
};

let paintingCharacters = (arrSuspects) => {
	containerCharacters.innerHTML = "";

	arrSuspects.forEach((character) => {
		let column = document.createElement("div");

		column.className = "col-md-2 mt-3";
		column.id = `character-${character.id}`;
		column.innerHTML = `

		<a href="#" id="btn-possAssesin-${character.id}"  >
			<div class="cardz">		
				<img src="./characters/${character.name_image}.png" id="imgId-${character.id}" class="rounded"  style="width:100%" >
				<div class="container">
					<p class="cardz-title">${character.nombre}</p>
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

		// console.log("weapon id----------------------", weapon.id);
		// console.log("weapon name----------------------", weapon.nombre);

		column.className = "col-md-2  mt-3";
		column.id = `weapon-${weapon.id}`;
		column.innerHTML = `
 
		<a href="#" id="btn-possWeapon-${weapon.id}"  >
			<div class="cardz"  >
				<img src="./weapons/${weapon.name_image}.png" id="imgId-${weapon.id}" class="rounded"  style="width:100%" >
				<div class="container">
					<p class="cardz-title">${weapon.nombre}</p>
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

		column.className = "col-md-2 mt-3";
		column.id = `rooms-${rooms.id}`;
		column.innerHTML = `
		 
		<a href="#" id="btn-poss-rooms-${rooms.id}"  >
			<div class="cardz"  >
				<img src="./rooms/${rooms.name_image}.png" id="imgId-${rooms.id}" class="rounded"  style="width:100%" >
				<div class="container">
					<p class="cardz-title">${rooms.nombre}</p>
				</div>
			</div>
		</a> `;

		containerRooms.append(column);
		let btnRooms = document.getElementById(`btn-poss-rooms-${rooms.id}`);

		btnRooms.onclick = () => checkRooms(arrRooms, rooms.id);
	});
};

//Generete Murder, weapon and room where the person died
let genereMistery = (arrCompleteDied) => {
	let numAssesin = parseInt(doRandom(arrCompleteDied[0]));

	// console.log(
	// 	"numAssesin",
	// 	numAssesin,
	// 	"arrCompleteDied[1].id",
	// 	arrCompleteDied[1]
	// );

	numAssesin == arrCompleteDied[1]
		? (numAssesin = parseInt(doRandom(arrCompleteDied[0])))
		: console.log("no son iguales");

	console.log(
		"numAssesin 2",
		numAssesin,
		"arrCompleteDied[1].id 2",
		arrCompleteDied[1]
	);

	let numWeapon = parseInt(doRandom(weaponsArray));
	let numRoom = parseInt(doRandom(roomsArray));

	localStorage.setItem("id_assasin", numAssesin);
	localStorage.setItem("id_died", arrCompleteDied[1]);
	localStorage.setItem("id_weapon", numWeapon);
	localStorage.setItem("id_room", numRoom);
};

//Put te mistery and said who died
let paintCase = (id_murder) =>
	(person_murder.innerHTML = `Mataron a <span> ${suspectsArray[id_murder].nombre} </span> tienes que adivinar quien fue, con que lo mataron y donde lo mato`);

let main = () => {
	//Stores elements in variables
	initElements();

	//Generate name person murder and array without person murdered
	arrToPlay = genereAssesinMurder();

	//Generete suspects, weapons and rooms
	generateListSuspects(arrToPlay[0]);
	generateListWeapons(weaponsArray);
	generateListRooms(roomsArray);

	//paints suspects, weapons and rooms in the dom
	paintCase(arrToPlay[1]);
	paintingCharacters(arrToPlay[0]);
	paintingWeapons(weaponsArray);
	paintingRooms(roomsArray);

	//generates  assasin, person murder, where die and what weapon was use
	genereMistery(arrToPlay);
};

main();
