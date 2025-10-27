
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".formFuncionarios");
    const tabela = document.querySelector("#table tbody");

    // 🔹 Recupera os dados salvos ao carregar a página
    let funcionarios = JSON.parse(localStorage.getItem("funcionarios")) || [];

    // 🔹 Função para atualizar a tabela com os dados salvos
    function atualizarTabela() {
        tabela.innerHTML = "";
        funcionarios.forEach((f, index) => {
            const linha = document.createElement("tr");
            linha.innerHTML = `
                <td>${f.nome}</td>
                <td>${f.cargo}</td>
                <td>${f.setor}</td>
                <td class="divBtn-remover" ><button class="btn-remover" data-index="${index}">🗑️</button></td>
            `;
            tabela.appendChild(linha);
        });
    }

    // 🔹 Atualiza tabela assim que a página carrega
    atualizarTabela();

    // 🔹 Captura o envio do formulário
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const nome = document.querySelector("#nome").value.trim();
        const cargo = document.querySelector("#cargo").value.trim();
        const setor = document.querySelector("#setor").value.trim();

        if (!nome || !cargo || !setor) {
            alert("Preencha todos os campos antes de cadastrar!");
            return;
        }

        // 🔹 Adiciona novo funcionário ao array
        funcionarios.push({ nome, cargo, setor });

        // 🔹 Salva o array atualizado no localStorage
        localStorage.setItem("funcionarios", JSON.stringify(funcionarios));

        // 🔹 Atualiza a tabela
        atualizarTabela();

        // 🔹 Limpa o formulário
        form.reset();
    });

    // 🔹 Remove funcionário ao clicar no botão 🗑️
    tabela.addEventListener("click", (event) => {
        if (event.target.classList.contains("btn-remover")) {
            const index = event.target.getAttribute("data-index");
            funcionarios.splice(index, 1); // remove do array
            localStorage.setItem("funcionarios", JSON.stringify(funcionarios)); // atualiza storage
            atualizarTabela(); // redesenha tabela
        }
    });
});
