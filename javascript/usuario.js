function carregarBanco()
{
	var tamanho = localStorage.length;
	if (tamanho == 1) 
	{
		window.localStorage.setItem("subzero", "123456");
		window.localStorage.setItem("cliente1","João,Silva Rabelo,01/01/1989,00000000000,000000000,SSPGO");

	}
	
	console.log(window.localStorage.getItem("subzero"));
	

}

function verificacaoDeLogin()
{
	var valor = localStorage.getItem("SituacaoLogin");
	if (valor == 0) 
	{
		window.location.href = "index.html";
	}
}

function Cliente( nome, sobrenome, dataNascimento, cpf, rg, orgaoExpedidor)
{
	this.nome = nome;
	this.sobrenome = sobrenome;
	this.dataNascimento = dataNascimento;
	this.cpf = cpf;
	this.rg = rg;
	this.orgaoExpedidor = orgaoExpedidor;
}


function Usuario( nome, senha)
{
	this.nome = nome;
	this.senha = senha;
}

function criarCliente(){

	var clientes = new Array();
	var keys = new Array();
	var key = "";
	var tamanho = localStorage.length;
	var contador;										

	for(contador = 0; contador < tamanho; contador++){
		key = localStorage.key(contador);
		if (key.includes("cliente")) 
		{
			keys.push(key);
			clientes.push(localStorage.getItem(key));
		}
	}

	var nome = document.getElementById('nome').value;
	var sobrenome = document.getElementById('sobrenome').value;
	var dataNascimentoC = document.getElementById('data').value;
	var dataNascimentoF = dataNascimentoC.split('-');
	var dataNascimento = dataNascimentoF[2] + '/' + dataNascimentoF[1] + '/' + dataNascimentoF[0];
	var cpf = document.getElementById('cpf').value;
	var rg = document.getElementById('rg').value;
	var orgaoExpedidor = document.getElementById('ogExp').value;
	var validacaoClie = validarCamposCliente(nome,sobrenome,dataNascimento,cpf, rg,orgaoExpedidor);
	if (validacaoClie == true) {
		var cliente = new Cliente(nome, sobrenome, dataNascimento, cpf, rg, orgaoExpedidor);

		var id = clientes.length+1;
		var keyNova = "cliente"+id; 
		tamanho = clientes.length;


		for(contador = 0; contador < tamanho; contador++){
			var cliente_temp = clientes[contador];
			if (cliente_temp.includes(cpf)) 
			{
				break;
			}
		}

		var clienteFinal = cliente.nome + "," + cliente.sobrenome + "," + cliente.dataNascimento + "," + cliente.cpf + "," + cliente.rg + "," + cliente.orgaoExpedidor;
		if (contador == tamanho) 
		{
			localStorage.setItem(keyNova, clienteFinal);
			window.location.href = "home.html";
		}
		else{
			alert("Cliente já cadastrado!");
		}
	}else{
			alert("Preencha todos os campos!");
		}
}

function criarUsuario(){

	var nome = document.getElementById('usuario').value;
	var senha = document.getElementById('senha').value;
	var validacao = validarCamposUsuario(nome, senha);
	if (validacao == true) {
			var user = new Usuario(nome,senha);

		var key = "";
		var tamanho = localStorage.length;
		var contador;

		for(var contador = 0; contador < tamanho; contador++){
			key = localStorage.key(contador);
			if (key == nome) 
			{
				break;
			}
		}

		if (contador == tamanho) 
		{
			localStorage.setItem(user.nome, user.senha);
			return true;
		}
		else{
			alert("Usuário já cadastrado!");
			return false;
		}
	}else{
		alert("Preencha todos os campos!");
		return false;
	}


}

function login(){
	var nome = document.getElementById('usuario').value;
	var senha = document.getElementById('senha').value;

	var key = "";
	var tamanho = localStorage.length;
	var contador;

	for(var contador = 0; contador < tamanho; contador++){
		key = localStorage.key(contador);
		if (key == nome) 
		{
			if (senha == localStorage.getItem(key)) 
			{
				localStorage["SituacaoLogin"] = 1;
				window.location.href = "home.html";
			}
		}
	}
}

function sair(){
	localStorage["SituacaoLogin"] = 0;
	window.location.href = "index.html";
}

function situacaoDeLogin()
{
	localStorage.setItem("SituacaoLogin", 1);
}


function excluir(id){
	var valor = document.getElementById(id).value;
	result = window.confirm("Deseja realmente excluir esse registro?");
	if (result == true) 
	{
		window.localStorage.removeItem(valor);
		location.reload();
	}

}

function alterar(id){
	var valor = document.getElementById(id).value;
	//alert(valor);
	window.localStorage.setItem("alterarCliente", valor);
	window.location.href = "alterar.html";

}

function carregarTabelaCliente()
{
	var clientes = new Array();
	var keys = new Array();
	var key = "";
	var tamanho = localStorage.length;
	var contador;										

	for(var contador = 0; contador < tamanho; contador++){
		key = localStorage.key(contador);
		if (key.includes("cliente")) 
		{
			keys.push(key);
			clientes.push(localStorage.getItem(key));
		}
	}


	
	for(var i = 0; i < clientes.length; i++)
	{
		cliente = new Array();
		cliente = clientes[i].split(',');
		var nome = cliente[0];
		var sobrenome = cliente[1];
		var data_Nascimento = cliente[2];
		var cpf = cliente[3];
		var rg = cliente[4];
		var orgao_expedidor = cliente[5];

		var table = document.getElementById("tabelaClientes");
  		var row = table.insertRow(i+ 1);
  		var cell0 = row.insertCell(0);
  		var cell1 = row.insertCell(1);
  		var cell2 = row.insertCell(2);
  		var cell3 = row.insertCell(3);
  		var cell4 = row.insertCell(4);
  		var cell5 = row.insertCell(5);
  		var cell6 = row.insertCell(6);
  		cell0.innerHTML = nome;
  		cell1.innerHTML = sobrenome;
  		cell2.innerHTML = data_Nascimento;
  		cell3.innerHTML = cpf;
  		cell4.innerHTML = rg;
  		cell5.innerHTML = orgao_expedidor;
  		cell6.innerHTML = '<button class="excluir" value="' + keys[i] + '" id="alterar' + i +  '" onclick="alterar(this.id)"> alterar</button> <button class="excluir" value="'+ keys[i] + '" id="excluir' + i + '" onclick="excluir(this.id)"> excluir</button>';
 	
	}
}

function limparDados(){
	window.localStorage.clear();
	location.reload();
}

function validarCamposUsuario(nome, senha)
{
	if (nome == "" || senha == "") {
		return false;
	}else{
		return true;
	}
}

function validarCamposCliente(nome,sobrenome, dataNascimento, cpf, rg, orgaoExpedidor)
{
	if (nome == "" || sobrenome == "" || dataNascimento == ""  || cpf == "" || rg == "" || orgaoExpedidor == "") {
		return false;
	}else{
		return true;
	}

}


function alterarCliente(){
	
	var key = document.getElementById('key').value;
	var nome = document.getElementById('nome').value;
	var sobrenome = document.getElementById('sobrenome').value;
	var dataNascimentoC = document.getElementById('data').value;
	var dataNascimentoF = dataNascimentoC.split('-');
	var dataNascimento = dataNascimentoF[2] + '/' + dataNascimentoF[1] + '/' + dataNascimentoF[0];
	var cpf = document.getElementById('cpf').value;
	var rg = document.getElementById('rg').value;
	var orgaoExpedidor = document.getElementById('ogExp').value;
	var validacaoClie = validarCamposCliente(nome,sobrenome,dataNascimento,cpf, rg,orgaoExpedidor);
	if (validacaoClie == true) {
		var cliente = new Cliente(nome, sobrenome, dataNascimento, cpf, rg, orgaoExpedidor);

		var clienteFinal = cliente.nome + "," + cliente.sobrenome + "," + cliente.dataNascimento + "," + cliente.cpf + "," + cliente.rg + "," + cliente.orgaoExpedidor;
		localStorage.setItem(key, clienteFinal);
		window.location.href = "home.html";
	}
}

function preencherCampos(){
	ckey = document.getElementById('key');
	ckey.value = localStorage.getItem('alterarCliente');
	if (ckey.value == "" || ckey.value == undefined) {
		window.stop();
		window.location.href = "home.html";

    }else{
       		
			var clienteFinal = localStorage.getItem(ckey.value);
			var cliente = clienteFinal.split(',');
			var nome = cliente[0];
			var sobrenome = cliente[1];
			var dataNascimentoC = cliente[2].split('/');
			var dataNascimento = dataNascimentoC[2] + '-' + dataNascimentoC[1] + '-' + dataNascimentoC[0];
			var cpf = cliente[3];
			var rg = cliente[4];
			var orgao_expedidor = cliente[5];

			document.getElementById('nome').value = nome;
			document.getElementById('sobrenome').value = sobrenome;
			document.getElementById('data').value = dataNascimento;
			document.getElementById('cpf').value = cpf;
			document.getElementById('rg').value = rg;
    		document.getElementById('ogExp').value = orgao_expedidor;
    }

}

function verificacoes(){
	var v = localStorage.getItem("SituacaoLogin");
	var v2 = localStorage.getItem("alterarCliente");
	
	if (v == undefined) {
		localStorage.setItem("SituacaoLogin", 0);
	}

	if (v2 == undefined) 
	{
		localStorage.setItem("alterarCliente", "");
	}

	var valor = localStorage.getItem("SituacaoLogin");
	var v3 = localStorage.getItem("alterarCliente");
	if (valor == 0) 
	{
		window.stop();
		window.location.href = "index.html";
	}

	if (v3.length > 0 ) {
		localStorage["alterarCliente"] = "" ;
	}
}
