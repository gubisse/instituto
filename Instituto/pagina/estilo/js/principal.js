
//====================================================================
// MANIPULACAO DE TODO CONTEUDO QUE ESTIVER EM ALGUM PAINEL <GERALMENTE>
//=====================================================================
var dadosArray = {};

if(caminho.includes('index.html')){

	//Exibir o que existe
	exibirNaTabela('estoque','','')
	exibirNaTabela('venda','ano','2024');

	document.getElementById('selectAno').addEventListener('input',event=>{
		exibirNaTabela('venda','ano',event.target.value);
	})
	document.getElementById('selectMes').addEventListener('input',event=>{
		exibirNaTabela('venda','mes',event.target.value);
	})
	document.getElementById('selectData').addEventListener('input',event=>{
		exibirNaTabela('venda','data',event.target.value);
	})


}else if(caminho.includes('pv.html')){



}else if(caminho.includes('reserva.html')){

}

//todo button que estaa dentro de main

document.querySelectorAll('main button').forEach(elemento=>{
	elemento.addEventListener('click',event=>{
		if(elemento.name==='sair'){
			logout()
		}else if(elemento.name==='submitEstoque'){

			//inicializar estoque
			dadosArray = {
				produto: document.querySelector('input[name="nome-produto-estoque"]').value,
				quantidade: document.querySelector('input[name="qtdd-estoque"]').value,
				precoCompra: document.querySelector('input[name="preco-compra-estoque"]').value,
				precoVenda: document.querySelector('input[name="preco-venda-estoque"]').value,
				dataAt: document.querySelector('input[name="date-in-estoque"]').value
			}

			validarFormulario('add-estoque-form','addEstoque',dadosArray)
			conta = 1;
		}
	});
});