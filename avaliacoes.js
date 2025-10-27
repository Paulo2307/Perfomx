document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".formAvaliacoes");
  const tabela = document.querySelector("#table tbody");
  const datalist = document.querySelector("#lista-funcionarios");

  // Carrega funcionários para a datalist
  const funcionarios = JSON.parse(localStorage.getItem("funcionarios")) || [];
  datalist.innerHTML = "";
  funcionarios.forEach(f => {
    const option = document.createElement("option");
    option.value = f.nome;
    datalist.appendChild(option);
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
        <td>${a.funcionario}</td>
        <td>${a.meta}</td>
        <td>${a.nota}</td>
        <td>${a.feedback}</td>
        <td>${a.data}</td>
        <td class="divBtn-remover"><button class="btn-remover" data-index="${index}">🗑️</button></td>
      `;
      tabela.appendChild(linha);
    });
  }

  atualizarTabela();

  // Adiciona nova avaliação
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const funcionario = document.querySelector("#funcionario").value.trim();
    const meta = document.querySelector("#meta").value.trim();
    const nota = document.querySelector("#nota").value.trim();
    const feedback = document.querySelector("#feedback").value.trim();
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
 