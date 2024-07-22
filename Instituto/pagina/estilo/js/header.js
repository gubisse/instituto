//este ficheiro manipula os buttons do navegado para visualizar os paineis em main


var navBtn = document.querySelectorAll(`nav button`);
navBtn.forEach(elemento=>{
	elemento.addEventListener('click',event=>{
		divsNoMain(elemento.name)
	});
});
	


