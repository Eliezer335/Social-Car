let primeiraOpicao = null;
let segundaOpicao = null;
let terceiraOpicao = null;
let opcoesCorretas = null;
let respostasDoQuizz = null;


const objetoQuizz = {
    title: "Qual carro combina mais com você?",
    firstQuestion: {
        title: "Escolha uma marca de sua preferencia",
        options: {
            option1: "toyota",
            option2: "mercedes",
            option3: "nissan"
        }
    },
    secondQuestion: {
        title: "Escolha uma categoria de sua preferência!",
        options: {
            option1: "suv",
            option2: "sedã",
            option3: "pick-up"
        }
    },
    thirdQuestion: {
        title: "Escolha a sua preferencia entre",
        options: {
            option1: "veloz",
            option2: "confortavel",
            option3: "4x4"
        }
    },
    rightOptions: {
        firstQuestion: "option1",
        secondQuestion: "option3",
        thirdQuestion: "option2"
    },
    answers: {
        oneRight: "Você é péssimo",
        twoRight: "Você sabe mais ou menos",
        threeRight: "Você é um especialista"
    }
};

const exibirCaixasQuizz = async () => {
    const caixas = document.querySelector(".caixas_quizz");

    try {
        caixas.innerHTML = `<h2>Carregando Quizzes ...</h2>`

        const response = await axios.get("https://socialcar-back.onrender.com/quizz");
        quizzes = response.data;

        if (quizzes || quizzes.length > 0) {
            caixas.innerHTML = ""
            for (const quizz of quizzes) {
                const id = quizz._id;
                caixas.innerHTML += `
                    <a class="quizz" onclick="exibeNatela('${id}')">
                        <div class="titulo_quizz">
                            <h2 class="h2_titulo_quizz">${quizz.title}</h2>
                        </div>
                        <div class="imagem_quizz"></div>
                    </a>
                `
            }
        }
        else {
            caixas.innerHTML = `<h2>Nenhum quizz encontrado.</h2>`;
        }
    } catch {
        caixas.innerHTML = `<h2>Erro ao carregar quizzes. Tente novamente mais tarde.</h2>`;
        console.error("Erro ao carregar quizzes:", error);
    }
}
exibirCaixasQuizz();

const exibeNatela = (id) => {
    const corpo = document.querySelector(".corpoQuizz")

    axios.get(`https://socialcar-back.onrender.com/quizz/${id}`).then((response) => {
        const quizz = response.data
        opcoesCorretas = [quizz.rightOptions.firstQuestion, quizz.rightOptions.secondQuestion, quizz.rightOptions.thirdQuestion]
        respostasDoQuizz = [quizz.answers.oneRight, quizz.answers.twoRight, quizz.answers.threeRight]

        corpo.innerHTML = `
            <div class="caixa_popUp"></div>

            <div class="caixa_de_perguntas">
            <h2 class="titulo_quizz">${quizz.title}</h2><br>
            <h3 class="perguntas_quizz">${quizz.firstQuestion.title}</h3>    
            
            <div class="caixa_btn" id="marca">
                <button class="btn_quizz btn1" id="primeiroBotao1" onclick="escolhePrimeiraOpcao('option1', 'primeiroBotao1')">${quizz.firstQuestion.options.option1}</button>
                <button class="btn_quizz btn1" id="primeiroBotao2" onclick="escolhePrimeiraOpcao('option2', 'primeiroBotao2')">${quizz.firstQuestion.options.option2}</button>
                <button class="btn_quizz btn1" id="primeiroBotao3" onclick="escolhePrimeiraOpcao('option3', 'primeiroBotao3')">${quizz.firstQuestion.options.option3}</button>
            </div>

            <h3 class="perguntas_quizz">${quizz.secondQuestion.title}</h3>
            <div class="perguntas_quizz">
                <div class="caixa_btn">
                    <button class="btn_quizz btn2"  id="segundoBotao1" onclick="escolheSegundaOpcao('option1', 'segundoBotao1')">${quizz.secondQuestion.options.option1}</button>
                    <button class="btn_quizz btn2"  id="segundoBotao2" onclick="escolheSegundaOpcao('option2', 'segundoBotao2')">${quizz.secondQuestion.options.option2}</button>
                    <button class="btn_quizz btn2"  id="segundoBotao3" onclick="escolheSegundaOpcao('option3', 'segundoBotao3')">${quizz.secondQuestion.options.option3}</button>
                </div>
            </div>

            <h3 class="perguntas_quizz">${quizz.thirdQuestion.title}</h3>
            <div class="perguntas_quizz">
                <div class="caixa_btn">
                    <button class="btn_quizz btn3" id="terceiroBotao1" onclick="escolheTerceiraOpcao('option1', 'terceiroBotao1')">${quizz.thirdQuestion.options.option1}</button>
                    <button class="btn_quizz btn3" id="terceiroBotao2" onclick="escolheTerceiraOpcao('option2','terceiroBotao2')">${quizz.thirdQuestion.options.option2}</button>
                    <button class="btn_quizz btn3" id="terceiroBotao3" onclick="escolheTerceiraOpcao('option3', 'terceiroBotao3')">${quizz.thirdQuestion.options.option3}</button>
                </div>
            </div>
        </div>
        <div class="btn_criar_quizz">
            <button class="btn_quizz" onclick="darResposta()"><b>Responder</b></button>
        </div>
        `

    })
    corpo.style.display = "block"
}


const escolhePrimeiraOpcao = (opicao, idButton) => {
    const botao = document.getElementById(idButton)
    const buttons = document.querySelectorAll(".btn1")

    buttons.forEach((button) => {
        button.classList.remove("check")
    })
    botao.classList.add("check")

    primeiraOpicao = opicao

}

const escolheSegundaOpcao = (opicao, idButton) => {
    const botao = document.getElementById(idButton)
    const buttons = document.querySelectorAll(".btn2")

    buttons.forEach((button) => {
        button.classList.remove("check")
    })
    botao.classList.add("check")

    segundaOpicao = opicao
}
const escolheTerceiraOpcao = (opicao, idButton) => {
    const botao = document.getElementById(idButton)
    const buttons = document.querySelectorAll(".btn3")

    buttons.forEach((button) => {
        button.classList.remove("check")
    })
    botao.classList.add("check")

    terceiraOpicao = opicao
}

const darResposta = () => {
    let contador = 0;
    const popUp = document.querySelector(".caixa_popUp")
    const respondeuTudo = primeiraOpicao && segundaOpicao && terceiraOpicao

    if (respondeuTudo) {
        if (opcoesCorretas[0] === primeiraOpicao) {
            contador++
        }
        if (opcoesCorretas[1] === segundaOpicao) {
            contador++
        }
        if (opcoesCorretas[2] === terceiraOpicao) {
            contador++
        }
    } else {
        popUp.innerHTML = `
        <div class="popUp">
            <h2>Você precisa escolher as 3 opções</h2>
            <div class="botoes">
                <button class="botaopopUp" onclick="finalizarQuizz('reload')">Continuar quizz</button>
            </div>
        </div>
         `
        popUp.style.display = "flex"

    }

    if ((contador === 0 || contador === 1) && respondeuTudo) {
        popUp.innerHTML = `
            <div class="popUp">
                <h1 class="h3_resposta">${respostasDoQuizz[0]}, acertou ${contador} questões.</h1>
                <div class="botoes">
                    <button class="botaopopUp" onclick="finalizarQuizz('reload')">Responder novamente</button>
                    <button class="botaopopUp" onclick="finalizarQuizz('voltar')">Voltar para Quizzes</button>
                </div>
            </div>
        `
        popUp.style.display = "flex"
    }

    if (contador === 2) {
        popUp.innerHTML = `
            <div class="popUp">
                <h1 class="h3_resposta">${respostasDoQuizz[1]}, acertou ${contador} questões.</h1>
                <div class="botoes">
                    <button class="botaopopUp" onclick="finalizarQuizz('reload')">Responder novamente</button>
                    <button class="botaopopUp" onclick="finalizarQuizz('voltar')">Voltar para Quizzes</button>
                </div>
            </div>
        `
        popUp.style.display = "flex"
    }

    if (contador === 3) {
        popUp.innerHTML = `
            <div class="popUp">
                <h1 class="h3_resposta">${respostasDoQuizz[2]}, acertou ${contador} questões.</h1>
                <div class="botoes">
                    <button class="botaopopUp" onclick="finalizarQuizz('reload')">Responder novamente</button>
                    <button class="botaopopUp" onclick="finalizarQuizz('voltar')">Voltar para Quizzes</button>
                </div>
            </div>
        `
        popUp.style.display = "flex"
    }
}

const finalizarQuizz = (resposta) => {
    if (resposta === 'reload') {
        const popUp = document.querySelector(".caixa_popUp")
        popUp.style.display = 'none'
    }
    else if (resposta === 'voltar') {
        window.location.reload()
    }
}