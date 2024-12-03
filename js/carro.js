async function enviaFormulario() {
    //recuperar as informações do formulário e colocar em objeto JSON
    const carroDTO = {
        "marca": document.querySelectorAll("input")[0].value,
        "modelo": document.querySelectorAll("input")[1].value,
        "ano": Number(document.querySelectorAll("input")[2].value),
        "cor": document.querySelectorAll("input")[3].value
    }

    try {
        const respostaServidor = await fetch("http://localhost:3333/novo/carro", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(carroDTO)
        });

        if (!respostaServidor.ok) {
            throw new Error("Erro ao enviar os dados para o servidor. Contate o administrador do sistema");
        }

        alert("Carro cadastrado com sucesso!");
    } catch (error) {
        console.log(error);
        alert(`Erro ao se comunicar com o servidor. ${error}`);
    }
}

async function recuperarListaCarros() {
    try {
        const respostaServidor = await fetch("http://localhost:3333/lista/carros");

        if (!respostaServidor.ok) {
            throw new Error('Erro ao comunicar com o servidor.');

        }
        const listaDeCarros = await respostaServidor.json();

        console.log(listaDeCarros);
        criarTabelaCarros(listaDeCarros);
    } catch (error) {
        console.log('Erro ao comunicar com o servidor');
        console.log(error);
    }
}

async function criarTabelaCarros(carros) {
    const tbody = document.querySelector('tbody');

    carros.forEach(carro => {
        const tr = document.createElement('tr');

        const tdIdCarro = document.createElement('td');
        tdIdCarro.innerHTML = carro.idCarro;
        tr.appendChild(tdIdCarro);

        const tdMarca = document.createElement('td');
        tdMarca.innerHTML = carro.marca;
        tr.append(tdMarca);

        // modelo

        // ano

        //cor

        const tdImagens = document.createElement('td');
        const imgEditar = document.createElement('img');
        imgEditar.setAttribute('src', 'assets/icons/pencil-square.svg');
        imgEditar.setAttribute('alt', 'Editar');
        tdImagens.appendChild(imgEditar);

        const imgDeletar = document.createElement('img');
        imgDeletar.setAttribute('src', 'assets/icons/trash-fill.svg');
        imgDeletar.setAttribute('alt', 'Deletar');
        tdImagens.appendChild(imgDeletar);

        tr.appendChild(tdImagens);

        tbody.appendChild(tr);
    });
}