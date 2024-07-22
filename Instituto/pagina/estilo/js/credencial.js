



//=============================================================
// Condicionar a url
//=============================================================
if(localStorage.getItem('credencial')!=='null'){
	login(JSON.parse(localStorage.getItem('credencial')));
}else{		
	divsNoMain('login');
}


if(caminho.includes("index.html")){

	//Obter todos os valor dos campos
	//--------------------------------
	nomeis = document.querySelector(`div[name="credencial"] #form-login input[name="nomeis"]`);
	senhais = document.querySelector(`div[name="credencial"] #form-login input[name="senhais"]`);
	btnSubmitIS = document.querySelector(`div[name="credencial"] #form-login input[type="submit"]`);

	//
	//-----------------------------
	clickBtnSubmit("form-login");

}else if(caminho.includes("pv.html")){

	//Obter todos os valor dos campos
	//--------------------------------
	nomeis = document.querySelector(`div[name="credencial"] #form-login input[name="nomeis"]`);
	senhais = document.querySelector(`div[name="credencial"] #form-login input[name="senhais"]`);
	btnSubmitIS = document.querySelector(`div[name="credencial"] #form-login input[type="submit"]`);

	//
	//-----------------------------
	clickBtnSubmit("form-login");

}else if(caminho.includes("reserva.html")){

	//Obter todos elementos necessarios para a criacao de usuario (reserva)
	//------------------------------------------------------------------------

	var nomecc = document.querySelector('#panel_criar_conta input[name="nomecc"]');
	var apelidocc = document.querySelector('#panel_criar_conta input[name="apelidocc"]');
	var telefonecc = document.querySelector('#panel_criar_conta input[name="telefonecc"]');
	var moradacc = document.querySelector('#panel_criar_conta input[name="moradacc"]');

	var btnSubmitCC = document.querySelector('#panel_criar_conta input[type="submit"]');
	btnSubmitCC.addEventListener('click',event=>{
		

		var dadosCC = {
			nome: nomecc.value,
			apelido: apelidocc.value, 
			telefone: telefonecc.value, 
			morada: moradacc.value
		}
		validarFormulario('panel_criar_conta','addUsuario',dadosCC)

	})

	//=============================================================
	//Escutamos todos os buttons que estao na reserva independentes
	//=============================================================
	document.querySelectorAll('button').forEach(elemento=>{
		conta = 1;
		elemento.addEventListener('click',event=>{
			if(elemento.name==='btn_cancelar_is'){
				divsPanelCredencial(elemento.name+'btnPanelCredencial')
			}else if(!(elemento.name.includes('btnPanelCredencial'))){
				divsPanelCredencial(elemento.name)
			}
		})
	})


	//Iniciar sessao como reserva
	//-----------------------------

	nomeis = document.querySelector('#panel_login input[name="nomeis"]');
	senhais = document.querySelector('#panel_login input[name="senhais"]');

	btnSubmitIS = document.querySelector('#panel_login input[type="submit"]');
	clickBtnSubmit("panel_login");



	//===============================================================================
	// Funcao que valida e envia os dados para nas suas devidas funcoes dinamicamente
	//===============================================================================


}

