const toggleButton 	= document.querySelector('.toggle-button');
const navLinks 		= document.querySelector('.menu');
const searchCon		= document.querySelector('.search-container');

toggleButton.addEventListener('click', ()=>{
	navLinks.classList.toggle('active');
	searchCon.classList.toggle('active');
});

//find part
let textarea = document.querySelector('.search');
let btClick	 = document.querySelector('.btClick');

btClick.addEventListener('click', fnFind);

async function fnFind(event){
	event.preventDefault();

	console.log(textarea.value);

	const message = { name: textarea.value };
	const send_message = {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(message)
	};

	const result = await fetch('/market/find-item', send_message);
	const arr = JSON.parse( await result.text() );

	load_items(arr);
}
// const message = {
// 	brand: brand
// };
// const send_message = {
// 	method: 'POST',
// 	headers: {
// 		'Accept': 'application/json',
// 		'Content-Type': 'application/json'
// 	},
// 	body: JSON.stringify(message)
// };


//main part
let all_cards = document.querySelector('.all_cards');
let star_cards = document.querySelector('.star_cards');
async function onLoad(){
	const message = { method: 'POST' };

	const result = await fetch('/market/load-items', message);
	const arr = JSON.parse( await result.text() );

	load_items(arr);

	//sort part
	let sortUp = document.querySelector('.btSortUp');
	let sortDown = document.querySelector('.btSortDown');

	sortUp.addEventListener('click', fnUp);
	sortDown.addEventListener('click', fnDown);

	function fnUp(event){
		event.preventDefault();

		arr.sort(function(a,b){
			if(a.price < b.price)
				return 1;
			if(a.price > b.price)
				return -1;
			return 0;
		});

		load_items(arr);
	}
	function fnDown(event){
		event.preventDefault();

		arr.sort(function(a,b){
			if(a.price < b.price)
				return -1;
			if(a.price > b.price)
				return 1;
			return 0;
		});

		load_items(arr);
	}
}

async function load_items(arr){
	all_cards.innerHTML = "";
	star_cards.innerHTML = "";
		
	//for star item
	let cookArr = document.cookie;
	cookArr = cookArr.substring(11);

	let setStarElems = new Set( cookArr.split("") );

	for(let i of arr){
		if(setStarElems.has(i['id'].toString())){
			let card = document.createElement('a');
			card.classList.add("card");
			card.href = "/market/item-"+i['id'];
			star_cards.appendChild(card);

			let desc = document.createElement('div');
			desc.classList.add("desc");
				card.appendChild(desc);

			let image = document.createElement('img');
			image.src = i['img'];
			desc.appendChild(image);

			let title = document.createElement('h3');
			title.innerHTML = i['name'];
			desc.appendChild(title);

			let price = document.createElement('h4');
			price.innerHTML = `<strong>Price: </strong>` + i['price'] + '$';
			desc.appendChild(price);

			let star = document.createElement('p');
			star.innerHTML = "&#9733";
			star.style.background = "orange";
			card.appendChild(star);


			// star.addEventListener('click', stopLink);
			star.addEventListener('click', async function(event){
				event.preventDefault();
				console.log(i['id']);


				if(star.style.background == "orange"){
					star.style.background = "white";
					
					const message = { id: i['id'] };
					const messageIn = {
						method: 'POST',
						headers: {
							'Accept': 'application/json',
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(message)
					};

					const resultIn = await fetch('/market/removeStar', messageIn);
					const arrIn = JSON.parse( await resultIn.text() );
					
					// if(arrIn == {}){
					// 	load_items(arrIn);
					// }
					load_items(arr);
				}
				else{
					star.style.background = "orange";

					const message = { id: i['id'] };
					const messageIn = {
						method: 'POST',
						headers: {
							'Accept': 'application/json',
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(message)
					};

					const resultIn = await fetch('/market/setStar', messageIn);
					const arrIn = JSON.parse( await resultIn.text() );

					// if(arrIn == {}){
					// 	load_items(arrIn);
					// }
					let cookArr = document.cookie;
					cookArr = cookArr.substring(11);

					console.log(cookArr);

					load_items(arr);

				}
			});
		}
		else{
			let card = document.createElement('a');
			card.classList.add("card");
			card.href = "/market/item-"+i['id'];
			all_cards.appendChild(card);

			let desc = document.createElement('div');
			desc.classList.add("desc");
			card.appendChild(desc);

			let image = document.createElement('img');
			image.src = i['img'];
			desc.appendChild(image);

			let title = document.createElement('h3');
			title.innerHTML = i['name'];
			desc.appendChild(title);

			let price = document.createElement('h4');
			price.innerHTML = `<strong>Price: </strong>` + i['price'] + '$';
			desc.appendChild(price);

			let star = document.createElement('p');
			star.innerHTML = "&#9733";
			star.style.background = "white";
			card.appendChild(star);


			star.addEventListener('click', async function(event){
				event.preventDefault();
				console.log(i['id']);


				if(star.style.background == "orange"){
					star.style.background = "white";
					
					const message = { id: i['id'] };
					const messageIn = {
						method: 'POST',
						headers: {
							'Accept': 'application/json',
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(message)
					};

					const resultIn = await fetch('/market/removeStar', messageIn);
					const arrIn = JSON.parse( await resultIn.text() );
					
					// if(arrIn == {}){
					// 	load_items(arrIn);
					// }
					load_items(arr);
				}
				else{
					star.style.background = "orange";

					const message = { id: i['id'] };
					const messageIn = {
						method: 'POST',
						headers: {
							'Accept': 'application/json',
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(message)
					};

					const resultIn = await fetch('/market/setStar', messageIn);
					const arrIn = JSON.parse( await resultIn.text() );

					// if(arrIn == {}){
					// 	load_items(arrIn);
					// }
					let cookArr = document.cookie;
					cookArr = cookArr.substring(11);

					console.log(cookArr);

					load_items(arr);

				}
			});
		}

		async function stopLink(event){
			event.preventDefault();
			console.log(i['id']);


			if(star.style.background == "orange"){
				star.style.background = "white";
				
				const message = { id: i['id'] };
				const messageIn = {
					method: 'POST',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(message)
				};

				const resultIn = await fetch('/market/removeStar', messageIn);
				const arrIn = JSON.parse( await resultIn.text() );
				
				// if(arrIn == {}){
				// 	load_items(arrIn);
				// }
				load_items(arr);
			}
			else{
				star.style.background = "orange";

				const message = { id: i['id'] };
				const messageIn = {
					method: 'POST',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(message)
				};

				const resultIn = await fetch('/market/setStar', messageIn);
				const arrIn = JSON.parse( await resultIn.text() );

				// if(arrIn == {}){
				// 	load_items(arrIn);
				// }
				let cookArr = document.cookie;
				cookArr = cookArr.substring(11);

				console.log(cookArr);

				load_items(arr);

			}

		}
	}
}



onLoad();
