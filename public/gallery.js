const toggleButton 	= document.querySelector('.toggle-button');
const navLinks 		= document.querySelector('.menu');

toggleButton.addEventListener('click', ()=>{
	navLinks.classList.toggle('active');
});

let main = document.querySelector('.main');
let bigImage = document.querySelector('.BigImage');
let carousel = document.querySelector('.carousel');

loadItems();

async function loadItems(){
	const send_message = { method: 'POST' };

	const result = await fetch('/market/load-items', send_message);
	const arr = JSON.parse( await result.text() );

	let bigImgInDiv = document.createElement('img');
	bigImgInDiv.src = arr[0]['img'];
	// console.log(bigImgInDiv.src);
	bigImage.appendChild(bigImgInDiv);

	for(let i = 0; i < arr.length; i++){
		let smallImgInDiv = document.createElement('img');
		smallImgInDiv.src = arr[i]['img'];
		carousel.appendChild(smallImgInDiv);

		smallImgInDiv.addEventListener('click', fnSmall);

		function fnSmall(){
			bigImage.href = '/market/item-'+(i+1);
			bigImgInDiv.src = smallImgInDiv.src;
			// bigImgInDiv.appendChild(smallImgInDiv);
			console.log(i+1);
		}
	}
}