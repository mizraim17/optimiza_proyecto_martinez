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

const roomsArray = ["Cocina", "Oficina", "Zona de Estacionamiento", "Bodega"];

const weaponsArray = [
	{ id: 0, nombre: "Olla", name_image: "olla" },
	{ id: 1, nombre: "Sai", name_image: "sai" },
	{ id: 2, nombre: "Pistola", name_image: "pistola" },
	{ id: 3, nombre: "Soplete", name_image: "soplete" },
	{ id: 4, nombre: "Engrapadora en gelatina", name_image: "engrapadora" },
];

//Function generate number random depending of size of array
let doRandom = (arrSearch) => {
	let x = Math.round(Math.random() * (arrSearch.length - 1));

	return x;
};

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

//Generate prompr for inputs values and validate if the user win or lose

//init

let initElements = () => {
	containerCharacters = document.getElementById("containerCharacters");
	containerListSuspects = document.getElementById("containerListSuspects");
	containerListWeapons = document.getElementById("containerListWeapons");
	containerWeapons = document.getElementById("containerWeapons");
	containerMurder = document.getElementById("containerMurder");
	points = document.getElementById("points");
	name_suspect = document.getElementById("name_suspect");
	name_weapon = document.getElementById("name_weapon");
	person_murder = document.getElementById("person_murder");
	// localStorage.clear();
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

let showAssasin = () => {
	let column = document.createElement("div");
	id_assasin = localStorage.getItem("id_assasin");

	containerCharacters.innerHTML = "";

	column.className = "col-md-3 mt-3";
	column.id = `character-${suspectsArray[id_assasin].id}`;
	column.innerHTML = `<div class="card card-special"  >
  <img src="./characters/${suspectsArray[id_assasin].name_image}.png" id="imgId-${suspectsArray[id_assasin].id}" class="card-img-top " alt="...">
  <div class="card-body">
    <pclass="card-title">${suspectsArray[id_assasin].nombre}</p>
    <a href="#" id="btn-possAssesin-${suspectsArray[id_assasin].id}" class="btn btn-primary">tú fuiste</a>
  </div>
</div>`;

	containerCharacters.append(column);
};

let showWeapon = () => {
	let column = document.createElement("div");
	id_weapon = localStorage.getItem("id_weapon");

	console.log("id_weapon===========>", id_weapon);

	containerWeapons.innerHTML = "";

	console.log("containerWeapons", containerWeapons);

	console.log("weapon id----------------------", weaponsArray[id_weapon].id);
	console.log(
		"weapon name----------------------",
		weaponsArray[id_weapon].nombre
	);

	column.className = "col-md-3 mt-3";
	column.id = `weapon-${weaponsArray[id_weapon].id}`;
	column.innerHTML = `<div class="card card-special" >
  <img src="./weapons/${weaponsArray[id_weapon].name_image}.jpg" id="imgId-${weaponsArray[id_weapon].id}" class="card-img-top " alt="...">
  <div class="card-body">
    <pclass="card-title">${weaponsArray[id_weapon].nombre}</p>
    <a href="#" id="btn-poss-weapon-${weaponsArray[id_weapon].id}" class="btn btn-primary">con está arma</a>
  </div>
</div>`;

	containerWeapons.append(column);
};

let paintingCharacters = (arrSuspects) => {
	containerCharacters.innerHTML = "";

	arrSuspects.forEach((character) => {
		let column = document.createElement("div");

		column.className = "col-md-3 mt-3";
		column.id = `character-${character.id}`;
		column.innerHTML = `<div class="card card-special" >
  <img src="./characters/${character.name_image}.png" id="imgId-${character.id}" class="card-img-top " alt="...">
  <div class="card-body">
    <pclass="card-title">${character.nombre}</p>
    <a href="#" id="btn-possAssesin-${character.id}" class="btn btn-primary">tú fuiste</a>
  </div>
</div>`;

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

		column.className = "col-md-3 mt-3";
		column.id = `weapon-${weapon.id}`;
		column.innerHTML = `<div class="card card-special"  >
  	<img src="./weapons/${weapon.name_image}.jpg" id="imgId-${weapon.id}" class="card-img-top " alt="...">
  	<div class="card-body">
    <pclass="card-title">${weapon.nombre}</p>
    <a href="#" id="btn-poss-weapon-${weapon.id}" class="btn btn-primary">tú fuiste</a>
		</div>
		</div>`;

		containerWeapons.append(column);
		let btnWeapons = document.getElementById(`btn-poss-weapon-${weapon.id}`);

		btnWeapons.onclick = () => checkWeapons(arrWeapons, weapon.id);
	});
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

		// alert(`no es el asesino ${suspectsArray[idSuspect].nombre}`);
	} else if (weaponsArray[id_weapon].id == idWeapon) {
		console.log("-------------------------- entro");

		name_weapon.innerHTML = `Si es el arma ${weaponsArray[id_weapon].nombre}`;
		name_weapon.classList = "name_correct";
		// alert(`si es el asesino ${suspectsArray[idSuspect].nombre}`);

		showWeapon();
		// localStorage.clear();
	}
};

let matchSuspects = (idCharacter) => {
	let num = String(idCharacter);

	let idLlega = `imgId-${num}`;

	console.log("dide", idLlega);

	let blurCharacter = "";

	blurCharacter = document.getElementById(idLlega);

	console.log("elemento sostenido", blurCharacter);
	blurCharacter.classList = "blur-image";
};

let play = (arrToPlay) => {
	btn = document.getElementById("btnStarPlay");

	btn.onclick = () => menu(arrToPlay);
};

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

let paintMurder = (id_murder) =>
	(person_murder.innerHTML = `Mataron a <span> ${suspectsArray[id_murder].nombre} </span> tienes que adivinar quien fue, con que lo mataron y donde lo mato`);

let main = () => {
	arrToPlay = genereAssesinMurder();
	// console.log("arrToPlay", arrToPlay[0], "arrToPlay-1", arrToPlay[1]);
	// console.log("=====A", arrToPlay[1]);

	paintMurder(arrToPlay[1]);
	paintingWeapons(weaponsArray);
	genereMistery(arrToPlay);

	// menu(arrToPlay);

	initElements();

	generateListSuspects(arrToPlay[0]);
	generateListWeapons(weaponsArray);

	paintingCharacters(arrToPlay[0]);

	play(arrToPlay[0]);
};

main();
