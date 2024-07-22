//=====================================================
//SEGUNDO A SER CHAMADO NA SEGUENCIA
//=====================================================

function addEstoque(argument) {
	estoque.push(argument)
	exibirNaTabela('estoque','','')
}


function atualizarSelectProduto(argument,ano,mes,data) {

	// Referenciamos o elemento select
	let lvvc = document.querySelector('#list-venda-view-celular');
	while (lvvc.options.length > 1) {
		lvvc.remove(1); // remove o segundo elemento em diante
	}

	if(argument==='ano'){

		var dataSelecionada = new Date(ano);

	    // Filtrar os produtos que correspondem à data selecionada
	    var produtosData = vendas.filter(function(venda) {
	        var dataVenda = new Date(venda.dataVenda);
	        return dataVenda.getFullYear() === dataSelecionada.getFullYear();
	    });

	    // Adicionar os produtos ao seletor de produtos
	    produtosData.forEach(function(venda) {
	        var option = document.createElement('option');
	        option.text = venda.produto;
	        option.value = venda.produto;
	        lvvc.add(option);
	    });

	}else if(argument==='mes'){
		var dataSelecionada = new Date(mes);

	    // Filtrar os produtos que correspondem à data selecionada
	    var produtosData = vendas.filter(function(venda) {
	        var dataVenda = new Date(venda.dataVenda);
	        return dataVenda.getMonth() === dataSelecionada.getMonth();
	    });

	    // Adicionar os produtos ao seletor de produtos
	    produtosData.forEach(function(venda) {
	        var option = document.createElement('option');
	        option.text = venda.produto;
	        option.value = venda.produto;
	        lvvc.add(option);
	    });

	}else if(argument==='data'){
		var dataSelecionada = new Date(data);

	    // Filtrar os produtos que correspondem à data selecionada
	    var produtosData = vendas.filter(function(venda) {
	        var dataVenda = new Date(venda.dataVenda);
	        return dataVenda.getFullYear() === dataSelecionada.getFullYear() &&
	               dataVenda.getMonth() === dataSelecionada.getMonth() &&
	               dataVenda.getDate() === dataSelecionada.getDate();
	    });

	    // Adicionar os produtos ao seletor de produtos
	    produtosData.forEach(function(venda) {
	        var option = document.createElement('option');
	        option.text = venda.produto;
	        option.value = venda.produto;
	        lvvc.add(option);
	    });

	}
	
	
}

function controlVendas(){
    // Controlar a venda de modo que os cálculos sejam bem feitos
    vendas.forEach(venda => {
        // Encontrar o produto correspondente no estoque
        const produtoEstoque = estoque.find(produto => produto.produto === venda.produto);
        if (produtoEstoque) {
            // Calcular o valor total a pagar
            const valorTotal = produtoEstoque.precoVenda * venda.vendidas;
            // Atualizar o valor de mznPagar na venda
            venda.mznPagar = valorTotal;
        } else {
            console.log(`Produto ${venda.produto} não encontrado no estoque.`);
        }
    });
}

function exibirNaTabela(argument,tipoSelect,valorSelect){
	console.log(argument)
	controlVendas()


	var tabela = document.getElementById('tabela-estoque');
	if(argument==='venda'){

		var totalVendas=0;

		let tabela = document.getElementById('tabela-venda');
		while (tabela.rows.length > 2) {
			tabela.deleteRow(2);
		}

		// Filtra as vendas que correspondem à data desejada
		var vendasFiltradas = vendas.filter(function(venda) {
			if(tipoSelect==='ano'){
				return venda.dataVenda.startsWith(valorSelect);
			}else if(tipoSelect==='mes'){
				return venda.dataVenda.startsWith(document.getElementById('selectAno').value+'-' + valorSelect);
			}else if(tipoSelect==='data'){
				return venda.dataVenda.startsWith(document.getElementById('selectAno').value+'-'+document.getElementById('selectMes').value+'-'+valorSelect);
			}else{
				return venda.dataVenda.startsWith(valorSelect);				
			}
		});



		// Variável para armazenar o total de vendas
		var totalVendas = 0;
		var quantidadeVendas = vendasFiltradas.length;

		// Itera sobre as vendas filtradas e as exibe na tabela
		vendasFiltradas.forEach(function(valor) {
		    // Cria uma nova linha na tabela
		    var row = tabela.insertRow();

		    // Insere as células para cada atributo da venda
		    row.insertCell(0).innerHTML = valor.vendedor;
		    row.insertCell(1).innerHTML = valor.caixa;
		    row.insertCell(2).innerHTML = valor.dataVenda;			    
		    var vendidasCell = row.insertCell(3);
		    vendidasCell.innerHTML = valor.vendidas;
		    vendidasCell.setAttribute('class','btn btn-secondary w-100')
		    vendidasCell.addEventListener('click', function() {
		        alert('Cliquei na célula de vendidas para ' + valor.vendedor);
		        // Aqui você pode adicionar a lógica que deseja executar ao clicar na célula
		    });
		    row.insertCell(4).innerHTML = valor.mznPagar;

		    totalVendas += valor.mznPagar;
		});

		// Exibe o total de vendas na tabela
		var rowTotal = tabela.insertRow();
		rowTotal.insertCell(0).innerHTML = 'Total';
		rowTotal.insertCell(1).innerHTML = '';
		rowTotal.insertCell(2).innerHTML = '';
		rowTotal.insertCell(3).innerHTML = '';
		rowTotal.insertCell(4).innerHTML = totalVendas + " MZN";

		document.querySelector('span[name="total-todas-vendas"]').innerHTML=totalVendas;
		document.querySelector('span[name="quantidade-venda"]').innerHTML=quantidadeVendas;
		document.querySelector('span[name="quantidade-caixa"]').innerHTML=caixas.length;

		// Extrair anos únicos das datas de venda
		var anos = [];
		vendas.forEach(function(venda) {
		    var ano = new Date(venda.dataVenda).getFullYear();
		    if (!anos.includes(ano)) {
		        anos.push(ano);
		    }
		});

		// Ordenar os anos em ordem decrescente
		anos.sort((a, b) => b - a);

		// Selecionar o elemento select
		var selectAno = document.getElementById('list-ano-view-celular');

		// Preencher o menu suspenso com os anos
		anos.forEach(function(ano) {
		    var option = document.createElement('option');
		    option.text = ano;
		    option.value = ano;
		    selectAno.add(option);
		});

		// Adicionar evento de input ao seletor de ano
		selectAno.addEventListener('input', function(event) {
		    var anoSelecionado = parseInt(event.target.value);
		    
		    // Extrair meses únicos das datas de venda para o ano selecionado
		    var meses = [];
		    vendas.forEach(function(venda) {
		        var dataVenda = new Date(venda.dataVenda);
		        if (dataVenda.getFullYear() === anoSelecionado) {
		            var mes = dataVenda.getMonth() + 1;
		            if (!meses.includes(mes)) {
		                meses.push(mes);
		            }
		        }
		    });

		    // Ordenar os meses
		    meses.sort((a, b) => a - b);

		    // Selecionar o elemento select dos meses
		    var selectMes = document.getElementById('list-mes-view-celular');
			while (selectMes.options.length > 1) {
				selectMes.remove(1); // remove o segundo elemento em diante
			}
		    // Preencher o menu suspenso com os meses
		    meses.forEach(function(mes) {
		        var option = document.createElement('option');
		        option.text = getMonthName(mes);
		        option.value = mes;
		        selectMes.add(option);
		    });

		    atualizarSelectProduto('ano',this.value,'','')
		});
		// Adicionar evento de input ao seletor de ano
		document.getElementById('list-mes-view-celular').addEventListener('input', function(event) {


		    var anoSelecionado = parseInt(selectAno.value); // Converter para número inteiro
		    // Extrair datas únicas das vendas para o ano e mês selecionados
		    var datas = [];
		    vendas.forEach(venda=>{
		        var dataVenda = new Date(venda.dataVenda);
		        if (dataVenda.getFullYear() === anoSelecionado && dataVenda.getMonth() + 1 === parseInt(this.value)) { // Converter para número inteiro
		            var dataFormatada = dataVenda.toISOString().split('T')[0]; // Formatar a data para 'YYYY-MM-DD'
		            if (!datas.includes(dataFormatada)) {
		                datas.push(dataFormatada);
		            }
		        }
		        
		    });

		    // Ordenar as datas
		    datas.sort();

		    // Selecionar o elemento select da data
		    var selectData = document.getElementById('list-data-view-celular');

			while (selectData.options.length > 1) {
				selectData.remove(1); // remove o segundo elemento em diante
			}
			// Preencher o menu suspenso com as datas
			datas.forEach(function(data) {
			    var dataForm = new Date(data);
			    var option = document.createElement('option');
			    option.text = dataForm.getDate(); // ou option.text = dataForm.toISOString().split('T')[0];
			    option.value = data;
			    selectData.add(option);
			});
			if(this.value===''){
			    atualizarSelectProduto('ano',selectAno.value,'','')

			}else{
			    atualizarSelectProduto('mes','',this.value,'')
			}

		});

		// Adicionar evento de input ao seletor de data
		document.getElementById('list-data-view-celular').addEventListener('input', function() {

		    atualizarSelectProduto('data','','',this.value)
		    
		});




		controlVendas();


	}else if(argument=='estoque'){
		document.querySelector('span[name="quatidade-estoque"]').innerHTML=estoque.length;
		// Obtém a referência da tabela

		// Remove todas as linhas existentes da tabela
		while (tabela.rows.length > 3) {
			tabela.deleteRow(3);
		}




		// Itera sobre a lista de valors
		estoque.forEach(function(valor) {
			// Cria uma nova linha na tabela
			var row = tabela.insertRow();
			

			// Insere as células para cada atributo da valor
			row.insertCell(0).innerHTML = valor.produto;
			row.insertCell(1).innerHTML = valor.quantidade;
			row.insertCell(2).innerHTML = valor.precoCompra;
			row.insertCell(3).innerHTML = valor.precoVenda;
			row.insertCell(4).innerHTML = valor.dataAt;

			var button = document.createElement('button');
			button.setAttribute('class','btn btn-secondary w-100')
			button.id=valor.produto;
			button.textContent="Mais";

			button.addEventListener('click',event=>{
				alert('clicou em: '+button.id)
			})
			row.insertCell(5).appendChild(button);



		});

		// Referenciamos o elemento select
		let listPVDview = document.querySelector('#list-estoque-view');
		// Remover todos os elementos, exceto o primeiro
		while (listPVDview.options.length > 1) {
			listPVDview.remove(1); // remove o segundo elemento em diante
		}
		// Iteramos sobre a lista de valores
		estoque.forEach(function(valor) {
			// Criamos um novo elemento option para adicionar ao primeiro select
			var optionAddEstoque = document.createElement("option");
			optionAddEstoque.text = valor.produto;

			// Adicionamos as opções aos selects correspondentes
			listPVDview.add(optionAddEstoque);
		});




	}else if(argument==='produto-requisitados'){
		let tabela = document.getElementById('tabela-produtos-requisitados');

		// Remove todas as linhas existentes da tabela
		while (tabela.rows.length > 1) {
			tabela.deleteRow(1);
		}



		var totalVendas=0;

		// Itera sobre a lista de valors
		listaProdutosRequisitados.forEach(function(valor) {
			// Cria uma nova linha na tabela
			var row = tabela.insertRow();
			

			// Insere as células para cada atributo da valor
			row.insertCell(0).innerHTML = valor.produto;
			row.insertCell(1).innerHTML = valor.precoUnitario;
			row.insertCell(2).innerHTML = valor.quantidade;
			row.insertCell(3).innerHTML = valor.precoTotal;
			var btnFinalizar = row.insertCell(4);
			btnFinalizar.classList.add('btn','bg-primary')
			btnFinalizar.innerHTML = 'Opcion';

			btnFinalizar.addEventListener('click',event=>{
				var valorCelula = event.target.parentNode.cells[0].innerHTML;
			})

			totalVendas += valor.precoTotal;
		});

		// Exibe o total de vendas na tabela
		var rowTotal = tabela.insertRow();
		rowTotal.insertCell(0).innerHTML = 'Total';
		rowTotal.insertCell(1).innerHTML = '';
		rowTotal.insertCell(2).innerHTML = '';
		rowTotal.insertCell(3).innerHTML = totalVendas + " MZN";

		var btnComprar = document.createElement('button');
		btnComprar.classList.add('btn', 'bg-success','w-100','my-2')
		btnComprar.innerHTML = 'Depurar para o pagamento';


		btnComprar.addEventListener('click',event=>{
			listaProdutosRequisitados.forEach(valor=>{
				console.log(valor.produto);
				document.getElementById('panelListaProdutoPesquisado').style.display="none"
				document.getElementById('formCaixaVenda').style.display="none"
				document.getElementById('panel-produtos-para-vender').style.display="block"
				document.getElementById('formPanelPagamento').style.display="block"
				document.querySelectorAll('#panel-produtos-para-vender button').forEach(valor=>{
					valor.style.display="none";
					if(valor.name==='btnVoltarParaPesquisarProduto'){
						document.querySelector('button[name="btnVoltarParaPesquisarProduto"]').style.display="block"
					}
				})
				//campo do pagamento
				var valorApagar = document.querySelector('#formPanelPagamento input[name="valorApagar"]').value=totalVendas;
				var valorPago = document.querySelector('#formPanelPagamento input[name="valorPago"]');
				valorPago.addEventListener('input',event=>{

					document.querySelector('#formPanelPagamento input[name="troco"]').value=parseInt(event.target.value)-parseInt(valorApagar);
					
				    if (document.querySelector('#formPanelPagamento input[name="troco"]').value.indexOf('-')) {
				        document.querySelector('#formPanelPagamento button[type="submit"]').style.display = "block";
				    } else {
				        document.querySelector('#formPanelPagamento button[type="submit"]').style.display = "none";
				    }
				})

			});
		});

		document.querySelector('#formCaixaVenda button[type="submit"]').style.display="none"


		var rowBtn = tabela.insertRow();

		rowBtn.appendChild(btnComprar);





	}
}


function divsNoMain(id){
	document.querySelectorAll('main > div').forEach(elemento=>{
		elemento.style.display="none"
	})
	document.querySelector(`main > #${id}`).style.display="block";
	if(id==='login'){		
		document.querySelector('nav').style.display="none";
	}else{
		document.querySelector('nav').style.display="block";
	}
}

//=============================================================
// Funcao pra encamsular as divs credencial
//=============================================================
function divsPanelCredencial(argument) {
	if(argument.includes('btnPanelCredencial')){
		document.querySelector('div[name="btns_panel_credencial"]').removeAttribute('hidden')
		document.querySelector('div[name="panel_credencial"]').setAttribute('hidden','')
	}else if(argument==='alterarTema'){
	}else{
		document.querySelector('div[name="panel_credencial"]').removeAttribute('hidden')
		document.querySelectorAll('div[name="panel_credencial"] > div').forEach(elemento=>{
			elemento.setAttribute('hidden','')
		})
		document.getElementById(argument).removeAttribute('hidden')
		document.querySelector('div[name="btns_panel_credencial"]').setAttribute('hidden','')
	}
}

function validarFormulario(idFormulario,nomeFunction,dadosArray){

	// Seletor para todos os inputs que você deseja verificar
	var inputs = document.querySelectorAll(`#${idFormulario} input`);

	// Converter NodeList em um array para usar forEach
	var inputsArray = Array.from(inputs);

	// Verificar se todos os inputs estão preenchidos
	var todosPreenchidos = inputsArray.every(function(input) {
	    return input.value.trim() !== ''; // Verifica se o valor do input não está vazio
	});
	console.log(inputs);
	inputs.forEach(elemento=>{
		// Se todos os inputs estiverem preenchidos, faça alguma coisa
		console.log(elemento.name);
		if (todosPreenchidos) {
		    // Faça algo aqui, por exemplo:
		    console.log('Todos os inputs estão preenchidos!');
		    document.querySelector(`#${idFormulario} input[name="${elemento.name}"]`).classList.remove('border','border-danger')
		    //manda os dados para
		    if(conta===1){
		    	console.log(dadosArray)
		    	// Chamada dinâmica da função com base no nome da variável
			    window[nomeFunction](dadosArray);
				conta++;
			    return

			}
		} else {
		    console.log('Preencha todos os campos!');
			console.log(elemento.value)
			if(elemento.value===''){
				document.querySelector(`#${idFormulario} input[name="${elemento.name}"]`).classList.add('border','border-danger')
			}else{				
				document.querySelector(`#${idFormulario} input[name="${elemento.name}"]`).classList.remove('border','border-danger')				
			}
		}
	})
}


function clickBtnSubmit(idFormulario,){
	btnSubmitIS.click();
	btnSubmitIS.addEventListener('click',event=>{
		var dadosIS = {
			nome: nomeis.value,
			senha: senhais.value 
		}
		validarFormulario(`${idFormulario}`,`login`,dadosIS)
	})
}

// AddUsuario
//----------------------------------------

function addUsuario(dados){
	usuario.push(dados);
	console.log(usuario)
}


// Login
//---------------------------------------

function login(dados){
	/*
	usuario.forEach(valor=>{
		if(valor.nome===dados.nome && valor.senha===dados.senha && caminho.includes(valor.tipo+".html")){
			divsNoMain('inicio');
			localStorage.setItem('credencial', JSON.stringify(dados));
			localStorage.setItem('tipois', valor.tipo+".html");
			return;
		}

		/*

		else if(!(caminho.includes(valor.tipo+".html"))){
			divsNoMain('login');
		}
		*
	});
*/
}

// Logout
//---------------------------------------
function logout(){	
	localStorage.setItem('credencial','null');
	divsNoMain('login');
}


function saiNomeDoMes(month) {
    const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    return months[month - 1];
}
