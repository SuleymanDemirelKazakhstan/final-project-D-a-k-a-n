let backStage = document.querySelector('.back');

let boxes = document.querySelectorAll('.box');
let right = document.querySelectorAll('.update');


for(var i = 0; i < boxes.length; i++){
	right[i].addEventListener('click', updateItem);
}

function updateItem(event){
	event.preventDefault();

	backStage.style.display = 'block';

	let popup = document.createElement('div');
	let content = document.createElement('div');
	popup.classList.add("popup");
	content.classList.add('content');

	console.log(this.id);

	let template = `<form action='/news_list/update` + this.id + `' method='POST'>
						<label for="header">Header:</label><br>
						<input type="text" id="header" name="header" size="54"><br><br>
						<label for="main">Main_text:</label><br>
						<textarea id="main" name="main" rows="4" cols="50"></textarea><br><br>
						<label for="file_img">Image_url:</label>
						<input type="file" id="file_img" name="img"><br><br>
 						<input type="submit" value="Submit">
					</form>`;
	
	content.innerHTML = template;
	popup.appendChild(content);
	backStage.appendChild(popup);
}