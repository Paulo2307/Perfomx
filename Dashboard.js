document.addEventListener("DOMContentLoaded", () => {
    const totalFuncionarios = document.getElementById("total-funcionarios");
    const totalFeedbacks = document.getElementById("total-feedbacks")

    // Ler lista que vem do meta.html (localStorage)
    const funcionarios = JSON.parse(localStorage.getItem("funcionarios")) || [];
    const feedbacks = JSON.parse(localStorage.getItem("avaliacoes")) || [];

    // Atualizar o número no card
    totalFuncionarios.textContent = funcionarios.length;
    totalFeedbacks.textContent = feedbacks.length

    
        // ... Seu código existente do dashboard (contagem de funcionários, feedbacks, etc.) ...

        // --- Lógica de Metas Atingidas (COLE AQUI) ---

        function calcularPorcentagemMetas() {
            // ... (código de cálculo da porcentagem) ...
            const metas = JSON.parse(localStorage.getItem("metas")) || [];
            const totalMetas = metas.length;
            if (totalMetas === 0) {
                return 0;
            }

            let metasConcluidas = 0;
            metas.forEach(meta => {
                if (meta.concluida === true) {
                    metasConcluidas++;
                }
            });

            const porcentagem = (metasConcluidas / totalMetas) * 100;
            return Math.round(porcentagem);
        }

        function exibirPorcentagemMetas() {
            const porcentagemAtingida = calcularPorcentagemMetas();
            // Garanta que o ID abaixo existe no seu index.html
            const elementoPorcentagem = document.getElementById('porcentagem-metas');

            if (elementoPorcentagem) {
                elementoPorcentagem.textContent = `${porcentagemAtingida}%`;
            } else {
                console.error("Elemento com ID 'porcentagem-metas' não encontrado.");
            }
        }

        // 🚨 Chame a função para executar a lógica assim que o DOM carregar
        exibirPorcentagemMetas();

});
