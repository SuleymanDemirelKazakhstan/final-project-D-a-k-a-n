let main = document.querySelector(".main");

let news_link = document.querySelector("#bar1");
let server_link = document.querySelector("#bar2");
let item_link = document.querySelector("#bar3");

news_link.addEventListener('click', add_news);

function add_news(event){
	event.preventDefault();
	
	main.innerHTML = "";
	let wall = document.createElement('div');
	wall.classList.add("wall");
	main.appendChild(wall);
	let wall_text = document.createElement('div');
	wall_text.innerHTML = "Add News";
	wall.appendChild(wall_text);
}