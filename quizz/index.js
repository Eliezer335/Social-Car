let primeiraOpicao = null;

const objetoQuizz = {
    title: "Qual carro combina mais com você?",
    firtQuestion: {
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

// const pegarQuizz = () => {
//     axios.get("https://socialcar-back.onrender.com/quizz").then((response) =>{
//         console.log(response.data)
//         quizzes = response.data

//     }).catch((error) => {
//         console.error()
//         console.log("Erro ao acessar o quizz: ",error)
//     })
// }

const exibirCaixasQuizz = ()=>{
    const caixas = document.querySelector(".caixas_quizz")

    axios.get("https://socialcar-back.onrender.com/quizz").then((response) =>{
        console.log(response.data)
        const quizzes = response.data

        for(const quizz of quizzes){
            console.log("for",quizz)
            caixas.innerHTML += `
            <a class="quizz" onclick="exibeNatela(${JSON.stringify(quizz)})">
                <div class="titulo_quizz">
                    <h2 class="h2_titulo_quizz">${quizz.title}</h2>
                </div>
                <div class="imagem_quizz"></div>
            </a>
        `
        }
    }).catch((error) => {
        console.error()
        console.log("Erro ao acessar o quizz: ",error)
    })

    console.log("lista", quizzes)

   
}
exibirCaixasQuizz();

const exibeNatela = (meuquizz)=>{
    const corpo = document.querySelector(".corpoQuizz")
    const quizz = JSON.parse(meuquizz)
    console.log("Exibir na tela quizz", quizz)
    
    corpo.innerHTML= `
        <div class="caixa_de_perguntas">
        <h2 class="titulo_quizz">${quizz.firtQuestion.title}</h2><br>
        <h3 class="perguntas_quizz">Escolha uma marca de sua preferência!</h3>    
        
        <div class="caixa_btn" id="marca">
            <button class="btn_quizz" id="marca1" onclick="escolhePrimeiraOpcao('opcao1')">Toyota</button>
            <button class="btn_quizz" id="marca2" onclick="escolheMarca()">Mercedes</button>
            <button class="btn_quizz" id="marca3" onclick="escolheMarca()">Nissan</button>
        </div>

        <h3 class="perguntas_quizz">Escolha uma categoria de sua preferência!</h3>
        <div class="perguntas_quizz">
            <div class="caixa_btn">
                <button class="btn_quizz">Suv</button>
                <button class="btn_quizz">Sedã</button>
                <button class="btn_quizz">Pick-up</button>
            </div>
        </div>

        <h3 class="perguntas_quizz">"Escolha a sua preferencia entre</h3>
        <div class="perguntas_quizz">
            <div class="caixa_btn">
                <button class="btn_quizz">veloz</button>
                <button class="btn_quizz">Confortavel</button>
                <button class="btn_quizz">4x4</button>
            </div>
        </div>
    </div>
    <div class="btn_criar_quizz">
        <div class="btn_quizz"><b>Responder</b></div>
    </div>
    `
    corpo.style.display = "block"
    
}


const escolhePrimeiraOpcao = (opicao)=>{
    primeiraOpicao = opicao
}

