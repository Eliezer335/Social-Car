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
    const imagemTxt = 'Escolha uma imagem'
    exibirImg.innerHTML = imagemTxt

    inputImg.addEventListener('change', function (event) {
        const inputTarget = event.target;
        const imagem = inputTarget.files[0];
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

        axios.put("https://socialcar-back.onrender.com/register/profile", formData, { headers })
            .then(result => {
                localStorage.setItem("SocialCar", JSON.stringify(result.data));
            })
            .catch(error => {
                verificaPerfil(".imgPerfil")
                console.error(error);
            });

        fecharAba(".containerPopUp");
        botaoSim.removeEventListener('click', handleBotaoSim);
    };

    const handleBotaoNao = (event) => {
        event.preventDefault();
        verificaPerfil();
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
    if (credenciais.profileLink) {
        perfil.style.backgroundImage = `url('${credenciais.profileLink}')`
    } else {
        perfil.style.backgroundImage = `url()`
    }
};

verificaPerfil(".imgPerfil");
verificaPerfil(".imgUsuario")
verificaPerfil(".perfil_usuario")
