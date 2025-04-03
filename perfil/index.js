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
    console.log(classe, perfil)
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

        if (posts.length > 0) {
            publicacoes.innerHTML = ``
            for (const publicacao of posts) {
                console.log(publicacao)
                publicacoes.innerHTML += `
                    <div class="publicacao">
                        <div class="containerUsuario">
                            <img class="imgUsuario" src="${publicacao.profileUrl}" />
                            <div class="nomeUsuario">${publicacao.name}</div>  
                        </div>
                        <div class="delete_publi">
                            <buttun class="img_delete" onclick="deletarPublicacao('${publicacao._id}')">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome 
                                Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 
                                2025 Fonticons, Inc.--><path fill="#ffffff" d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 
                                32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 
                                467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
                            </button>
                        </div>  
                        <div class="legendaPublicacao">${publicacao.caption}</div>
                        <img class="imgPublicacao" src="${publicacao.photo}" />
                    </div>
                `
            }
        }
        else {
            publicacoes.innerHTML = `<h2>Nenhum post encontrado.</h2>`;
        }

    } catch (error) {
        publicacoes.innerHTML = `<h2>Erro ao carregar publicacoes. Tente novamente mais tarde.</h2>`;
        console.error("Erro ao carregar publicacoes:", error);
    }
}

function encerrarSessao(event) {
    const popup = document.querySelector(".containerPopUpSair")
    const btnSim = document.getElementById('btnSimSair')
    const btnNao = document.getElementById('btnNaoSair')
    popup.style.display = "block"

    btnSim.addEventListener("click", function () {
        localStorage.removeItem("SocialCar");
        window.location.href = "../login/index.html";
    });

    btnNao.addEventListener("click", function () {
        popup.style.display = "none"
    });


}

function perfil(nome, img) {
    const nomeperfil = document.querySelector(nome)
    const imageperfil = document.querySelector(img)
    const credenciais = JSON.parse(localStorage.getItem("SocialCar"));

    nomeperfil.textContent = credenciais.name
    imageperfil.style.backgroundImage = `url('${credenciais.profileLink}')`
}

const deletarPublicacao = async (id) => {
    alert("Certeza que vai apagar essa publicacao")
    const credenciais = JSON.parse(localStorage.getItem("SocialCar"));

    const headers = {
        'Authorization': `Bearer ${credenciais.token}`,
    };

    try {
        await axios.delete(`https://socialcar-back.onrender.com/post/${id}`, { headers })
    } catch (error) {
        console.error("Erro ao deletar a publicação", error)
    } finally {
        window.location.reload();
    }

}


perfil(".nome_usuario", ".perfil_usuario")
exibirPublicacoes();
verificaPerfil(".imgPerfil");
verificaPerfil(".perfil_usuario")
