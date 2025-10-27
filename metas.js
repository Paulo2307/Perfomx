
document.addEventListener("DOMContentLoaded", () => {
    
    const form = document.querySelector(".formMetas");
    const tabela = document.querySelector("#table tbody");

    let metas = JSON.parse(localStorage.getItem("metas")) || [];

    function atualizarTabela() {
        tabela.innerHTML = "";
            metas.forEach((m, index) => {
            const linha = document.createElement("tr");
            linha.innerHTML = `
                <td>${m.funcionário}</td>
                <td>${m.meta}</td>
                <td>${m.prazo}</td>
                <td class="divBtn-remover">
                    <button class="btn-remover" data-index="${index}">🗑️</button>
                </td>
            `;
            tabela.appendChild(linha);
        });
    }

    atualizarTabela();

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const funcionário = document.querySelector("#funcionário").value.trim();
        const meta = document.querySelector("#meta").value.trim();
        const prazo = document.querySelector("#prazo").value.trim();

        if(!funcionário || !meta || !prazo) {
            alert("Preencha todos os campos antes de adicionar!");
            return;
        }

        metas.push({ funcionário, meta, prazo });

        localStorage.setItem("metas", JSON.stringify(metas));

        atualizarTabela();

        form.reset();
    });

    tabela.addEventListener("click", (event) => {
        if(event.target.classList.contains("btn-remover")) {
            const index = event.target.getAttribute("data-index");
            metas.splice(index, 1);
            localStorage.setItem("metas", JSON.stringify(metas));
            atualizarTabela();
        }
    });


    const datalist = document.querySelector("#lista-funcionarios");
    const funcionarios = JSON.parse(localStorage.getItem("funcionarios")) || [];

    datalist.innerHTML = "";

    funcionarios.forEach(f => {
        const option = document.createElement("option");
        option.value = f.nome;
        datalist.appendChild(option);

    });
});

    flatpickr("#prazo", {
      mode: "range",
      dateFormat: "d/m/Y",
      minDate: "today",
      locale: "pt"
    });
