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

	let template = `<form action='/item_list/update` + this.id + `' method='POST'>
						<label for="name">Item name:</label><br>
						<input type="text" id="name" name="name" size="54"><br><br>
						<label for="description">Description:</label><br>
						<textarea id="description" name="description" rows="4" cols="50"></textarea><br><br>
						<label for="price">Price:</label><br>
						<input type="number" id="price" name="price"><br><br>
						<label for="file_img">Image_url:</label>
						<input type="file" id="file_img" name="img"><br><br>
 						<input type="submit" value="Submit">
					</form>`;
	
	content.innerHTML = template;
	popup.appendChild(content);
	backStage.appendChild(popup);
}