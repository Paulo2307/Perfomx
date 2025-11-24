document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".formAvaliacoes");
  const tabela = document.querySelector("#table tbody");
  const formselect = document.querySelector("#lista-funcionarios");
  const placeholder = document.createElement("option");
  const inputFuncionario = document.querySelector("#lista-funcionarios");
  const inputMeta = document.querySelector("#meta");

  // Carrega funcionários para o select

  const funcionarios = JSON.parse(localStorage.getItem("funcionarios")) || [];
  const metas = JSON.parse(localStorage.getItem("metas")) || [];

  inputFuncionario.addEventListener("input", () => {
    const nomeSelecionado = inputFuncionario.value.trim();
  
    // Procura a meta do funcionário selecionado
    const metaEncontrada = metas.find(
      m => m.funcionario.toLowerCase() === nomeSelecionado.toLowerCase()
    );

    if (metaEncontrada) {
      inputMeta.value = metaEncontrada.meta;
    } else {
      inputMeta.value = "";
    }
  });

  formselect.innerHTML = "";

  placeholder.textContent = "Selecione um funcionário...";
  placeholder.disabled = true;
  placeholder.selected = true; // mostra como padrão
  formselect.appendChild(placeholder);

  funcionarios.forEach(f => {
    const option = document.createElement("option");
    option.textContent = f.nome;
    formselect.appendChild(option); 
  });

  // Configura Flatpickr
  flatpickr("#data", {
    mode: "range",
    dateFormat: "d/m/Y",
    locale: "pt",
    minDate: "today"
  });

  // Carrega avaliações existentes
  let avaliacoes = JSON.parse(localStorage.getItem("avaliacoes")) || [];

  function atualizarTabela() {
    tabela.innerHTML = "";
    avaliacoes.forEach((a, index) => {
      const linha = document.createElement("tr");
      linha.innerHTML = `
        <td style = "border-bottom: 1px solid #000;">${a.funcionario}</td>
        <td style = "border-bottom: 1px solid #000;">${a.meta}</td>
        <td style = "border-bottom: 1px solid #000;">${a.nota}</td>
        <td style=" border-bottom: 1px solid #000; word-wrap: break-word; max-width: 300px;">${a.feedback}</td>
        <td style = "border-bottom: 1px solid #000;">${a.data}</td>
        <td class="divBtn-remover" ><button class="btn-remover" data-index="${index}">🗑️</button></td>
      `;
      tabela.appendChild(linha);
    });
  }

  atualizarTabela();

  // Adiciona nova avaliação
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const funcionario = document.querySelector("#lista-funcionarios").value.trim();
    const meta = document.querySelector("#meta").value.trim();
    const nota = document.querySelector("#nota").value.trim();
    const feedback = document.querySelector("#floatingTextarea2").value.trim();
    const data = document.querySelector("#data").value.trim();

    if (!funcionario || !meta || !nota || !feedback || !data) {
      alert("Preencha todos os campos!");
      return;
    }

    avaliacoes.push({ funcionario, meta, nota, feedback, data });
    localStorage.setItem("avaliacoes", JSON.stringify(avaliacoes));

    atualizarTabela();
    form.reset();
  });

  // Remove avaliação
  tabela.addEventListener("click", (event) => {
    if (event.target.classList.contains("btn-remover")) {
      const index = event.target.getAttribute("data-index");
      avaliacoes.splice(index, 1);
      localStorage.setItem("avaliacoes", JSON.stringify(avaliacoes));
      atualizarTabela();
    }
  });
});
 