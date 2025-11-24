const cardContainer = document.querySelector(".card-container");
const inputBusca = document.querySelector("#input-busca");
const btnBusca = document.querySelector("#btn-busca");
const btnLimpaBusca = document.querySelector("#btn-limpa-busca");
const themeToggleBtn = document.querySelector("#theme-toggle");
const themeIconSun = document.querySelector(".icon-sun");
const themeIconMoon = document.querySelector(".icon-moon");
const body = document.body;
let timeoutId = null;
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

// Função que filtra os dados com base no termo de busca
function filtrarDados() {
    const termoBusca = inputBusca.value.toLowerCase();
    const dadosFiltrados = dados.filter(card => {
        const nomeMatch = card.nome.toLowerCase().includes(termoBusca);
        const tagMatch = card.tags.some(tag => tag.toLowerCase().includes(termoBusca));
        return nomeMatch || tagMatch;
    });
    renderizarCards(dadosFiltrados);
}

// --- Lógica da Busca ---

// Listener para o evento 'input' para busca em tempo real e controle do botão de limpar
inputBusca.addEventListener("input", () => {
    // Mostra ou esconde o botão de limpar
    if (inputBusca.value.length > 0) {
        btnLimpaBusca.classList.remove("hidden");
    } else {
        btnLimpaBusca.classList.add("hidden");
    }

    clearTimeout(timeoutId); // Limpa o timeout anterior
    timeoutId = setTimeout(filtrarDados, 300); // Define um novo timeout para executar a busca após 300ms
});

// Listener para buscar ao pressionar "Enter"
inputBusca.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        filtrarDados();
    }
});

// Listener para o botão de limpar busca
btnLimpaBusca.addEventListener("click", () => {
    inputBusca.value = "";
    btnLimpaBusca.classList.add("hidden");
    renderizarCards(dados); // Mostra todos os cards novamente
});

// --- Lógica para alternar o tema ---

// Função para aplicar o tema
function aplicarTema(tema) {
    if (tema === 'dark') {
        body.classList.add('dark-theme');
        themeIconSun.style.display = 'block';
        themeIconMoon.style.display = 'none';
    } else {
        body.classList.remove('dark-theme');
        themeIconSun.style.display = 'none';
        themeIconMoon.style.display = 'block';
    }
}

// Listener para o botão de alternância de tema
themeToggleBtn.addEventListener('click', () => {
    const isDark = body.classList.contains('dark-theme');
    const novoTema = isDark ? 'light' : 'dark';
    localStorage.setItem('theme', novoTema);
    aplicarTema(novoTema);
});

// Verifica o tema salvo no carregamento da página
const temaSalvo = localStorage.getItem('theme') || 'light'; // Padrão para 'light' se nada for salvo
aplicarTema(temaSalvo);

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

// Carrega os dados e exibe todos os cards quando a página é aberta
carregarDados();