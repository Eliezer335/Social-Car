let imagemParaenviar = null;

function verificaLogin() {
    const credenciais = localStorage.getItem("SocialCar")
    const perfil = document.querySelector(".perfil")
    const caixaQuizz = document.querySelector(".caixaQuizz")

    if (!credenciais) {
        perfil.style.display = "none";
        caixaQuizz.style.display = "none";
    }
}
verificaLogin();

function abrirAbaPublicacao() {
    const aberturaPopUp = document.querySelector('.container_popup')

    const credenciais = localStorage.getItem("SocialCar")
    if (!credenciais) {
        window.location.href = "../login/index.html#ancora"
        alert("Para fazer uma publicação, faça login!")
    } else {
        aberturaPopUp.style.display = "block";
    }
}

function abrirAba(classe) {
    const aberturaPopUp = document.querySelector(classe)
    aberturaPopUp.style.display = "block";
}
function fecharAba(classe) {
    const aberturaPopUp = document.querySelector(classe)
    aberturaPopUp.style.display = "none";
}

function adicionarImg() {
    const inputImg = document.querySelector('.inputImg');
    const exibirImg = document.querySelector('.exibirImg');
    const imagemTxt = 'Escolha uma imagem de 16x9'
    exibirImg.innerHTML = imagemTxt

    inputImg.addEventListener('change', function (event) {
        const inputTarget = event.target;
        const imagem = inputTarget.files[0];
        imagemParaenviar = imagem
        if (imagem) {
            const reader = new FileReader();

            reader.addEventListener('load', function (event) {
                const readerTarget = event.target;
                exibirImg.innerHTML = ""
                const img = document.createElement('img');
                img.src = readerTarget.result
                img.classList.add('exibirImg');

                exibirImg.appendChild(img)
            })
            reader.readAsDataURL(imagem)
        }
    })

};

function adicionarImgPerfil() {
    const textoDoPopUp = document.querySelector(".textoDoPopUpPerfil");
    const inputImg = document.querySelector('.inputImgPerfil');
    const perfil = document.querySelector(".imgPerfil");
    const credenciais = JSON.parse(localStorage.getItem("SocialCar"));
    const botaoSim = document.getElementById("botaoSim");
    const botaoNao = document.getElementById("botaoNao");
    let imagemParaEnviar = null;


    if (!credenciais) {
        window.location.href = "../login/index.html#ancora";
    };

    const handleMudaImagemDePerfil = (event) => {
        event.preventDefault();
        const inputTarget = event.target;
        const imagem = inputTarget.files[0];
        imagemParaEnviar = imagem;

        if (imagem) {
            const reader = new FileReader();
            reader.addEventListener('load', function (event) {
                const readerTarget = event.target;
                perfil.style.backgroundImage = `url(${readerTarget.result})`;
                setTimeout(() => {
                    abrirAba('.containerPopUp');
                }, 1000);
            });
            reader.readAsDataURL(imagem);
        };

        inputImg.removeEventListener('change', handleMudaImagemDePerfil);
    };

    const handleBotaoSim = (event) => {
        event.preventDefault();
        if (!imagemParaEnviar) {
            alert("Por favor, selecione uma imagem primeiro.");
            return;
        }

        const formData = new FormData();
        formData.append('file', imagemParaEnviar);

        const headers = {
            'Authorization': `Bearer ${credenciais.token}`,
        };

        textoDoPopUp.textContent = "Carregando..."
        axios.put("https://socialcar-back.onrender.com/register/profile", formData, { headers })
            .then(result => {
                localStorage.setItem("SocialCar", JSON.stringify(result.data));
                verificaPerfil(".imgPerfil")
            })
            .catch(error => {
                textoDoPopUp.textContent = "Erro ao carregar imagem!"
                verificaPerfil(".imgPerfil");
                console.error(error);
            }).finally(() => {
                fecharAba(".containerPopUp");
            })


        botaoSim.removeEventListener('click', handleBotaoSim);
    };

    const handleBotaoNao = (event) => {
        event.preventDefault();
        verificaPerfil(".imgPerfil");
        fecharAba(".containerPopUp");
        botaoNao.removeEventListener('click', handleBotaoNao);
    };

    inputImg.addEventListener('change', handleMudaImagemDePerfil);

    botaoSim.addEventListener('click', handleBotaoSim);

    botaoNao.addEventListener('click', handleBotaoNao);
};

function verificaPerfil(classe) {
    const perfil = document.querySelector(classe);
    const credenciais = JSON.parse(localStorage.getItem("SocialCar"));
    const nomePerfil = document.querySelector(".nomePerfil")
    nomePerfil.textContent = credenciais.name
    if (credenciais.profileLink) {
        perfil.style.backgroundImage = `url('${credenciais.profileLink}')`
    } else {
        perfil.style.backgroundImage = `url()`
    }
};

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
    } catch (error) {
        botaoEnviar.textContent = "Enviar"
        console.error("Erro ao enviar publicação", error)
    } finally {
        location.reload()
    }

}

const exibirPublicacoes = async () => {
    const publicacoes = document.querySelector(".publicacoes");
    const credenciais = JSON.parse(localStorage.getItem("SocialCar"));
    const nomePerfil = document.querySelector(".nomeUsuario")
    nomePerfil.textContent = credenciais.name;

    const headers = {
        'Authorization': `Bearer ${credenciais.token}`,
    };

    try {
        publicacoes.innerHTML = `<h2>Carregando Publicacoes ...</h2>`

        const response = await axios.get("https://socialcar-back.onrender.com/post/user", { headers });
        const posts = response.data;

        if (posts || posts.length > 0) {
            publicacoes.innerHTML = ``
            for (const publicacao of posts) {
                publicacoes.innerHTML += `
                    <div class="publicacao">
                        <div class="containerUsuario">
                            <div class="imgUsuario" src="${publicacao.photo}"></div>
                            <div class="nomeUsuario">${publicacao.name}</div>
                        </div>
                        <div class="legendaPublicacao">${publicacao.caption}</div>
                        <img class="imgPublicacao" src="${publicacao.photo}"></img>
                    </div>
                `
            }
        }
        else {
            caixas.innerHTML = `<h2>Nenhum post encontrado.</h2>`;
        }
    } catch {
        publicacoes.innerHTML = `<h2>Erro ao carregar publicacoes. Tente novamente mais tarde.</h2>`;
        console.error("Erro ao carregar publicacoes:", error);
    } finally {
        if (posts.length === 0) {
            publicacoes.innerHTML = `<h2>Não a Publicacoes ...</h2>`
        }
    }
}

function encerrarSessao() {
    localStorage.removeItem("SocialCar");
    window.location.href = "../login/index.html";
}

exibirPublicacoes();
verificaPerfil(".imgPerfil");
verificaPerfil(".imgUsuario")
verificaPerfil(".perfil_usuario")
