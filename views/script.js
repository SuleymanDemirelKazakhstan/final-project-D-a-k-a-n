const toggleButton 	= document.querySelector('.toggle-button')
const navLinks 		= document.querySelector('.menu')

toggleButton.addEventListener('click', ()=>{
	navLinks.classList.toggle('active')
})
