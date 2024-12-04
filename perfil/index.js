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
        // console.log(inputTarget.files);
        const imagem = inputTarget.files[0];

        // console.log(imagem);

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
    let imagemParaEnviar = null;

    if (!credenciais) {
        window.location.href = "../login/index.html#ancora";
    }

    inputImg.addEventListener('change', function (event) {
        event.preventDefault();
        const inputTarget = event.target;
        const imagem = inputTarget.files[0];

        imagemParaEnviar = imagem;  // Aqui você armazena a imagem selecionada.

        if (imagem) {
            const reader = new FileReader();
            reader.addEventListener('load', function (event) {
                const readerTarget = event.target;
                perfil.style.backgroundImage = `url(${readerTarget.result})`;  // Exibe a imagem no perfil
                setTimeout(() => {
                    abrirAba('.containerPopUp');  // Abre a popup após um tempo
                }, 1000);
            });
            reader.readAsDataURL(imagem);
        }
    });

    // Aqui, mova a lógica do clique para garantir que a imagem foi selecionada antes de enviar
    document.getElementById("btnTrue").addEventListener('click', (event) => {
        if (!imagemParaEnviar) {  // Verifica se a imagem foi realmente selecionada.
            alert("Por favor, selecione uma imagem primeiro.");
            return;
        }

        const formData = new FormData();
        formData.append('file', imagemParaEnviar);  // Adiciona a imagem ao FormData

        const headers = {
            'Authorization': `Bearer ${credenciais.token}`, // Envia o token para autenticação
        };

        axios.put("http://localhost:5000/register/profile", formData, { headers })
            .then(result => {
                localStorage.SocialCar = JSON.stringify(result.data);
                verificaPerfil();
            })
            .catch(error => {
                verificaPerfil()
                console.error(error);
            });

        fecharAba(".containerPopUp");  // Fecha a popup após a requisição
        event.preventDefault();
    });

    document.getElementById("btnFalse").addEventListener('click', (event) => {
        verificaPerfil();
        fecharAba(".containerPopUp");
        event.preventDefault();
    });
};

function verificaPerfil() {
    const perfil = document.querySelector(".imgPerfil");
    const credenciais = JSON.parse(localStorage.getItem("SocialCar"));
    if (credenciais.profileLink) {
        perfil.style.backgroundImage = `url(${credenciais.profileLink})`
    } else {
        perfil.style.backgroundImage = `url()`
    }
};

verificaPerfil()
