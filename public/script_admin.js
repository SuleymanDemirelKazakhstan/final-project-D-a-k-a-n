let main = document.querySelector(".main");

let news_link = document.querySelector("#bar1");
let server_link = document.querySelector("#bar2");
let item_link = document.querySelector("#bar3");

news_link.addEventListener('click', add_news);

function add_news(event){
	event.preventDefault();
	
	main.innerHTML = "";//clear main part

	let wall_add = document.createElement('div');
	wall_add.classList.add("news_wall");
	main.appendChild(wall_add);
	let wall_text = document.createElement('div');
	wall_text.innerHTML = "Add Latest News";
	wall_add.appendChild(wall_text);
		let form_action = document.createElement('div');
		form_action.classList.add("input_section");
		let template = `<form action='/news_list' method='POST'>
							<label for="header">Header:</label><br>
							<input type="text" id="header" name="header" size="54"><br><br>
							<label for="main">Main_text:</label><br>
							<textarea id="main" name="main" rows="4" cols="50"></textarea><br><br>
							<label for="file_img">Image_url:</label>
							<input type="text" id="file_img" name="img"><br><br>
 							<input type="submit" value="Submit">
						</form>`;
		form_action.innerHTML = template;
		main.appendChild(form_action);

	


	//in bottom
	let available_wall = document.createElement('div');
	available_wall.classList.add("news_wall");
	main.appendChild(available_wall);
	let available_news = document.createElement('div');
	available_news.innerHTML = "Available News";
	available_wall.appendChild(available_news);
}