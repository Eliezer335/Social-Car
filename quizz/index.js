let primeiraOpicao = null;
let segundaOpicao = null;
let terceiraOpicao = null;
let opcoesCorretas = null;
let respostasDoQuizz = null;


// const objetoQuizz = {
//     title: "Qual carro combina mais com você?",
//     firstQuestion: {
//         title: "Escolha uma marca de sua preferencia",
//         options: {
//             option1: "toyota",
//             option2: "mercedes",
//             option3: "nissan"
//         }
//     },
//     secondQuestion: {
//         title: "Escolha uma categoria de sua preferência!",
//         options: {
//             option1: "suv",
//             option2: "sedã",
//             option3: "pick-up"
//         }
//     },
//     thirdQuestion: {
//         title: "Escolha a sua preferencia entre",
//         options: {
//             option1: "veloz",
//             option2: "confortavel",
//             option3: "4x4"
//         }
//     },
//     rightOptions: {
//         firstQuestion: "option1",
//         secondQuestion: "option3",
//         thirdQuestion: "option2"
//     },
//     answers: {
//         oneRight: "Você é péssimo",
//         twoRight: "Você sabe mais ou menos",
//         threeRight: "Você é um especialista"
//     }
// };

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

const exibeNatela = async(id) => {
    const corpo = document.querySelector(".corpoQuizz")

    try{
        const response = await axios.get(`https://socialcar-back.onrender.com/quizz/${id}`)

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

    }catch(error) {
        console.error("Algo deu errado ao tentar mostrar o quizz", error)
    }
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

const exibeCriacaoQuizz = () => {
    const corpo = document.querySelector(".corpoCriacaoQuizz")

        corpo.innerHTML = `
                <h2 class="title">Crie seu Quizz!</h2>
                    <input class="opcioes" type="text" id="quizTitle" placeholder="Título do Quizz"><br>
                <h3>Primeira Pergunta</h3>
                    <input class="opcioes" type="text" id="firstQuestionTitle" placeholder="Título da Primeira Pergunta"><br>
                    <input class="opcioes" type="text" id="firstOption1" placeholder="Opção 1"><br>
                    <input class="opcioes" type="text" id="firstOption2" placeholder="Opção 2"><br>
                    <input class="opcioes" type="text" id="firstOption3" placeholder="Opção 3"><br>
                <h3>Segunda Pergunta</h3>
                    <input class="opcioes" type="text" id="secondQuestionTitle" placeholder="Título da Segunda Pergunta"><br>
                    <input class="opcioes" type="text" id="secondOption1" placeholder="Opção 1"><br>
                    <input class="opcioes" type="text" id="secondOption2" placeholder="Opção 2"><br>
                    <input class="opcioes" type="text" id="secondOption3" placeholder="Opção 3"><br>
                <h3>Terceira Pergunta</h3>
                <input class="opcioes" type="text" id="thirdQuestionTitle" placeholder="Título da Terceira Pergunta"><br>
                <input class="opcioes" type="text" id="thirdOption1" placeholder="Opção 1"><br>
                <input class="opcioes" type="text" id="thirdOption2" placeholder="Opção 2"><br>
                <input class="opcioes" type="text" id="thirdOption3" placeholder="Opção 3"><br>
                <h3>Respostas Corretas</h3>
                <input class="opcioes" type="text" id="rightAnswer1" placeholder="Resposta Correta 1 (option1, option2, option3)"><br>
                <input class="opcioes" type="text" id="rightAnswer2" placeholder="Resposta Correta 2 (option1, option2, option3)"><br>
                <input class="opcioes" type="text" id="rightAnswer3" placeholder="Resposta Correta 3 (option1, option2, option3)"><br>
                <h3>Mensagens de Resposta</h3>
                <input class="opcioes" type="text" id="answerOneRight" placeholder="Mensagem para 1 resposta certa"><br>
                <input class="opcioes" type="text" id="answerTwoRight" placeholder="Mensagem para 2 respostas certas"><br>
                <input class="opcioes" type="text" id="answerThreeRight" placeholder="Mensagem para 3 respostas certas"><br>
                <button class="btn_quizz_criacao" id="generateQuizBtn">Criar Quizz</button>  
    `; 

    corpo.style.display = "flex"
    

    const generateQuizBtn = document.getElementById("generateQuizBtn");
    
        generateQuizBtn.addEventListener("click", async function () {
            const objetoQuizz = {
                title: document.getElementById("quizTitle").value,
                firstQuestion: {
                    title: document.getElementById("firstQuestionTitle").value,
                    options: {
                        option1: document.getElementById("firstOption1").value,
                        option2: document.getElementById("firstOption2").value,
                        option3: document.getElementById("firstOption3").value
                    }
                },
                secondQuestion: {
                    title: document.getElementById("secondQuestionTitle").value,
                    options: {
                        option1: document.getElementById("secondOption1").value,
                        option2: document.getElementById("secondOption2").value,
                        option3: document.getElementById("secondOption3").value
                    }
                },
                thirdQuestion: {
                    title: document.getElementById("thirdQuestionTitle").value,
                    options: {
                        option1: document.getElementById("thirdOption1").value,
                        option2: document.getElementById("thirdOption2").value,
                        option3: document.getElementById("thirdOption3").value
                    }
                },
                rightOptions: {
                    firstQuestion: document.getElementById("rightAnswer1").value,
                    secondQuestion: document.getElementById("rightAnswer2").value,
                    thirdQuestion: document.getElementById("rightAnswer3").value
                },
                answers: {
                    oneRight: document.getElementById("answerOneRight").value,
                    twoRight: document.getElementById("answerTwoRight").value,
                    threeRight: document.getElementById("answerThreeRight").value
                }
            };

            const credenciais = JSON.parse(localStorage.getItem("SocialCar"));
            const headers = {
                'Authorization': `Bearer ${credenciais.token}`,
            };

            try{
                const response = await axios.post(`https://socialcar-back.onrender.com/quizz`, objetoQuizz, {headers})
                window.location.reload()

            }catch(error){
                console.error("Erro ao enviar para API" , error)
            }
        });
   
}

function abrirAba(classe) {
    const aberturaPopUp = document.querySelector(classe)
    aberturaPopUp.style.display = "block";
}

function encerrarSessao(event) {
    const popup = document.querySelector(".containerPopUpSair")
    const btnSim = document.getElementById('btnSimSair')
    const btnNao = document.getElementById('btnNaoSair')
    popup.style.display="block"

    btnSim.addEventListener("click", function () {
        localStorage.removeItem("SocialCar");
        window.location.href = "../login/index.html";
    });

    btnNao.addEventListener("click", function () {
        popup.style.display="none" 
    });
        
    
}