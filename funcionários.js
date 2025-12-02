
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".formFuncionarios");
    const tabela = document.querySelector("#table tbody");

    let funcionarios = JSON.parse(localStorage.getItem("funcionarios")) || [];

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

    atualizarTabela();

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const nome = document.querySelector("#nome").value.trim();
        const cargo = document.querySelector("#cargo").value.trim();
        const setor = document.querySelector("#setor").value.trim();

        if (!nome || !cargo || !setor) {
            alert("Preencha todos os campos antes de cadastrar!");
            return;
        }


        funcionarios.push({ nome, cargo, setor });

        localStorage.setItem("funcionarios", JSON.stringify(funcionarios));

        atualizarTabela();

        form.reset();
    });


    tabela.addEventListener("click", (event) => {
        if (event.target.classList.contains("btn-remover")) {
            const index = event.target.getAttribute("data-index");
            funcionarios.splice(index, 1); 
            localStorage.setItem("funcionarios", JSON.stringify(funcionarios));
            atualizarTabela();
        }
    });
});
