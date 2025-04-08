let imagemParaenviar = null;

function verificaLogin() {
    const credenciais = localStorage.getItem("SocialCar")
    const perfil = document.querySelector(".perfil")
    const caixaQuizz = document.querySelector(".caixaQuizz")
    const btnSair = document.getElementById("btnSair")
    const btnPerfil = document.getElementById("btnPerfil")
    const btnLogin = document.getElementById("login")

    if (!credenciais) {
        perfil.style.display = "none";
        caixaQuizz.style.display = "none";
        btnSair.style.display = "none"
        btnPerfil.style.display = "none"
        btnLogin.style.display = "block"
    }
}
verificaLogin();

function abrirAba() {
    const aberturaPopUp = document.querySelector('.container_popup')

    const credenciais = localStorage.getItem("SocialCar")
    if (!credenciais) {
        window.location.href = "../login/index.html#ancora"
        alert("Para fazer uma publicação, faça login!")
    } else {
        aberturaPopUp.style.display = "block";
    }
}

function fecharAba() {
    const aberturaPopUp = document.querySelector('.container_popup')
    aberturaPopUp.style.display = "none";
}

function adicionarImg() {
    const inputImg = document.querySelector('.inputImg');
    let exibirImg = document.querySelector('.exibirImg');
    const imagemTxt = 'Escolha uma imagem de 16x9';
    exibirImg.textContent = imagemTxt;

    inputImg.addEventListener('change', function (event) {
        const imagem = event.target.files[0];
        imagemParaenviar = imagem

        if (imagem) {
            const reader = new FileReader();

            reader.addEventListener('load', function (event) {
                exibirImg.style.backgroundImage = `url(${event.target.result})`;
                exibirImg.style.backgroundSize = 'cover';
                exibirImg.style.backgroundPosition = 'center';
                exibirImg.textContent = ""; // Remove o texto padrão ao carregar a imagem
            });

            reader.readAsDataURL(imagem);
        }
    });

}

function verificaPerfil(classe) {
    const perfil = document.querySelector(classe);
    const credenciais = JSON.parse(localStorage.getItem("SocialCar"));
    if (credenciais.profileLink) {
        perfil.style.backgroundImage = `url('${credenciais.profileLink}')`
    } else {
        perfil.style.backgroundImage = `url()`
    }
};

function pegarTexto() {
    const txtArea = document.querySelector('.txtArea')
    return txtArea.value
}

const enviarPublicacao = async () => {
    const botaoEnviar = document.querySelector(".botaoEnviar")
    const credenciais = JSON.parse(localStorage.getItem("SocialCar"));
    const txtArea = document.querySelector('.txtArea')
    const caption = txtArea.value
    const formData = new FormData()
    formData.append("caption", caption)
    formData.append("file", imagemParaenviar)

    const headers = {
        'Authorization': `Bearer ${credenciais.token}`,
    };

    try {
        botaoEnviar.textContent = "Enviando..."
        const response = await axios.post(`https://socialcar-back.onrender.com/post`, formData, { headers })
        console.log(response.data)
    } catch (error) {
        botaoEnviar.textContent = "Enviar"
        console.error("Erro ao enviar publicação", error)
    } finally {
        location.reload()
    }

}

const exibirPublicacoes = async () => {
    const publicacoes = document.querySelector(".publicacoes");

    try {
        publicacoes.innerHTML = `<h2>Carregando Publicacoes ...</h2>`

        const response = await axios.get("https://socialcar-back.onrender.com/post");
        const posts = response.data;

        if (posts.length > 0) {
            publicacoes.innerHTML = ``
            for (const publicacao of posts) {
                publicacoes.innerHTML += `
                    <div class="publicacao">
                        <div class="containerUsuario">
                        <img class="imgUsuario" src="${publicacao.profileUrl}"/>
                        <div class="nomeUsuario">${publicacao.name}</div>
                        </div>
                        <div class="legendaPublicacao">${publicacao.caption}</div>
                        <img class="imgPublicacao" src="${publicacao.photo}"></img>
                    </div>
                `
            }
        }
        else {
            publicacoes.innerHTML = `<h2>Nenhum post encontrado.</h2>`;
        }
    } catch {
        publicacoes.innerHTML = `<h2>Erro ao carregar publicacoes. Tente novamente mais tarde.</h2>`;
        console.error("Erro ao carregar publicacoes:", error);
    }
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

function perfil(nome,img){
    const nomeperfil = document.querySelector(nome)
    const imageperfil = document.querySelector(img)
    const credenciais = JSON.parse(localStorage.getItem("SocialCar"));

    nomeperfil.textContent = credenciais.name
    imageperfil.style.backgroundImage = `url('${credenciais.profileLink}')`
}

function abrirAbaSair(classe) {
    const aberturaPopUp = document.querySelector(classe)
    aberturaPopUp.style.display = "block";
}

exibirPublicacoes();
perfil(".nomePerfil",".imgPerfil")
perfil(".nome_usuario",".perfil_usuario")
verificaPerfil(".imgUsuario");
verificaPerfil(".imgPerfil");
verificaPerfil(".perfil_usuario");
pegarTexto()