const cardContainer = document.querySelector(".card-container");
const inputBusca = document.querySelector("#input-busca");
let dados = [];

// Função que carrega os dados do JSON e renderiza os cards iniciais
async function carregarDados() {
    try {
        const resposta = await fetch("data.json");
        dados = await resposta.json();
        renderizarCards(dados);
    } catch (error) {
        console.error("Erro ao carregar os dados:", error);
    }
}

function iniciarBusca() {
    const termoBusca = inputBusca.value.toLowerCase();
    const dadosFiltrados = dados.filter(card => card.nome.toLowerCase().includes(termoBusca));
    renderizarCards(dadosFiltrados);
}


function renderizarCards(cards) {
    cardContainer.innerHTML = ""; // Limpa o container antes de adicionar novos cards
    for (const card of cards) {
        const article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
                <h2>${card.nome}</h2>
                <p>${card.data_criacao}</p>
                <p>${card.descricao}</p>
                <a href="${card.link}" target="_blank">Saiba mais</a>`;

        cardContainer.appendChild(article);    
    }
}

carregarDados(); // Carrega os dados e exibe todos os cards quando a página é aberta