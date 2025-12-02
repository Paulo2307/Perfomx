document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector(".formMetas");
    const tabela = document.querySelector("#table tbody");

    let metas = JSON.parse(localStorage.getItem("metas")) || [];


    function aplicarCorStatus(select) {
        if (select.value === "true") {
            select.style.color = "green";
        } else {
            select.style.color = "red";
        }
    }


    function atualizarTabela() {
        tabela.innerHTML = "";

        metas.forEach((m, index) => {
            const linha = document.createElement("tr");

            linha.innerHTML = `
                <td style="border-bottom:1px solid #000;">${m.funcionario}</td>
                <td style="border-bottom:1px solid #000;">${m.meta}</td>
                <td style="border-bottom:1px solid #000;">${m.prazo}</td>
                <td style="border-bottom:1px solid #000;">
                    <select class="select-status" data-index="${index}">
                        <option value="false" ${m.concluida === false ? "selected" : ""} style="color:red" >Não concluída</option>
                        <option value="true" ${m.concluida === true ? "selected" : ""} style="color:green" >Concluída</option>
                    </select>
                </td>
                <td class="divBtn-remover" style="border-bottom:1px solid #000;">
                    <button class="btn-remover" data-index="${index}">🗑️</button>
                </td>
            `;


            tabela.appendChild(linha);

            const selectStatus = linha.querySelector(".select-status");
            aplicarCorStatus(selectStatus);

        });
    }

    atualizarTabela();

    // ➤ SALVAR NOVA META
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const funcionario = document.querySelector("#lista-funcionarios").value.trim();
        const meta = document.querySelector("#meta").value.trim();
        const prazo = document.querySelector("#prazo").value.trim();

        if (!funcionario || !meta || !prazo) {
            alert("Preencha todos os campos antes de adicionar!");
            return;
        }

        metas.push({
            funcionario,
            meta,
            prazo,
            concluida: false  // 👈 inicia como NÃO concluída
        });

        localStorage.setItem("metas", JSON.stringify(metas));

        atualizarTabela();
        form.reset();
    });

    // REMOVER META
    tabela.addEventListener("click", (event) => {
        if (event.target.classList.contains("btn-remover")) {
            const index = event.target.dataset.index;
            metas.splice(index, 1);
            localStorage.setItem("metas", JSON.stringify(metas));
            atualizarTabela();
        }
        
    });

    //  ALTERAR STATUS (CONCLUÍDA / NÃO CONCLUÍDA)
    tabela.addEventListener("change", (event) => {
        if (event.target.classList.contains("select-status")) {
            const index = event.target.dataset.index;

            metas[index].concluida = event.target.value === "true";

            localStorage.setItem("metas", JSON.stringify(metas));

            aplicarCorStatus(event.target);
        }
    });

    // SELECT DE FUNCIONÁRIOS
    const formselect = document.querySelector("#lista-funcionarios");
    const funcionarios = JSON.parse(localStorage.getItem("funcionarios")) || [];
    const placeholder = document.createElement("option");

    formselect.innerHTML = "";

    placeholder.textContent = "Selecione um funcionário...";
    placeholder.disabled = true;
    placeholder.selected = true;
    formselect.appendChild(placeholder);

    funcionarios.forEach(f => {
        const option = document.createElement("option");
        option.value = f.nome;
        option.textContent = f.nome;
        formselect.appendChild(option);
    });

});

flatpickr(
    "#prazo",{
     mode: "range",
     dateFormat: "d/m/Y",
     minDate: "today",
     locale: "pt" 
});