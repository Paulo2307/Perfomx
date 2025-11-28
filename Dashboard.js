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
        
    // Dashboard.js (dentro do document.addEventListener("DOMContentLoaded", ...))

    function encontrarDestaqueMensal(metas, funcionarios) {
        if (metas.length === 0 || funcionarios.length === 0) {
            return { nome: "Sem Metas", contagem: 0 };
        }

        // 1. Inicializar um mapa para contar metas por funcionário
        const contagemMetas = {};
        funcionarios.forEach(func => {
            contagemMetas[func.nome] = 0;
        });

        // 2. Contar metas CONCLUÍDAS
        metas.forEach(meta => {
            if (meta.concluida === true && contagemMetas.hasOwnProperty(meta.funcionario)) {
                contagemMetas[meta.funcionario]++;
            }
        });

        // 3. Encontrar o máximo
        let melhorFuncionario = "N/A";
        let maxConcluidas = -1;

        for (const nome in contagemMetas) {
            if (contagemMetas[nome] > maxConcluidas) {
                maxConcluidas = contagemMetas[nome];
                melhorFuncionario = nome;
            }
        }

        // Se houver um empate ou pelo menos uma meta concluída
        if (maxConcluidas > 0) {
            return { nome: melhorFuncionario, contagem: maxConcluidas };
        } else {
            return { nome: "Ainda Sem Destaque", contagem: 0 };
        }
    }

    function exibirDestaqueMensal() {
        const metas = JSON.parse(localStorage.getItem("metas")) || [];
        const funcionarios = JSON.parse(localStorage.getItem("funcionarios")) || [];
        const elementoDestaque = document.getElementById('funcionario-destaque');

        const destaque = encontrarDestaqueMensal(metas, funcionarios);

        if (elementoDestaque) {
            if (destaque.contagem > 0) {
                // Exibe o nome e o número de metas
                elementoDestaque.textContent = `${destaque.nome} (${destaque.contagem} metas)`;
            } else {
                elementoDestaque.textContent = destaque.nome;
            }
        }
    }

    // Chame a nova função junto com as outras
    exibirDestaqueMensal();

});
