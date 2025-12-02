document.addEventListener("DOMContentLoaded", () => {

    const totalFuncionarios = document.getElementById("total-funcionarios");
    const totalFeedbacks = document.getElementById("total-feedbacks")

    const funcionarios = JSON.parse(localStorage.getItem("funcionarios")) || [];
    const feedbacks = JSON.parse(localStorage.getItem("avaliacoes")) || [];

    totalFuncionarios.textContent = funcionarios.length;
    totalFeedbacks.textContent = feedbacks.length

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
            const elementoPorcentagem = document.getElementById('porcentagem-metas');

            if (elementoPorcentagem) {
                elementoPorcentagem.textContent = `${porcentagemAtingida}%`;
            } else {
                console.error("Elemento com ID 'porcentagem-metas' não encontrado.");
            }
        }

        exibirPorcentagemMetas();
        

    function encontrarDestaqueMensal(metas, funcionarios) {
        if (metas.length === 0 || funcionarios.length === 0) {
            return { nome: "Sem Metas", contagem: 0 };
        }

        const contagemMetas = {};
        funcionarios.forEach(func => {
            contagemMetas[func.nome] = 0;
        });

        metas.forEach(meta => {
            if (meta.concluida === true && contagemMetas.hasOwnProperty(meta.funcionario)) {
                contagemMetas[meta.funcionario]++;
            }
        });

        let melhorFuncionario = "N/A";
        let maxConcluidas = -1;

        for (const nome in contagemMetas) {
            if (contagemMetas[nome] > maxConcluidas) {
                maxConcluidas = contagemMetas[nome];
                melhorFuncionario = nome;
            }
        }

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
                elementoDestaque.textContent = `${destaque.nome} (${destaque.contagem} metas)`;
            } else {
                elementoDestaque.textContent = destaque.nome;
            }
        }
    }

    exibirDestaqueMensal();

});
