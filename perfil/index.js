function verificaLogin(){
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
        window.location.href="../login/index.html#ancora"
        alert("Para fazer uma publicação, faça login!")
    }else{
        aberturaPopUp.style.display="block";
    }
}

function abrirAba(classe) {
    const aberturaPopUp = document.querySelector(classe)
    aberturaPopUp.style.display="block";
}
function fecharAba(classe) {
    const aberturaPopUp = document.querySelector(classe)
    aberturaPopUp.style.display="none";
    
}

function adicionarImg(){
    const inputImg = document.querySelector('.inputImg');
    const exibirImg = document.querySelector('.exibirImg');
    const imagemTxt = 'Escolha uma imagem'
    exibirImg.innerHTML = imagemTxt

    inputImg.addEventListener('change', function(event) {
        const inputTarget = event.target;
        // console.log(inputTarget.files);
        const imagem = inputTarget.files[0];

        // console.log(imagem);

        if(imagem){
            const reader = new FileReader();

            reader.addEventListener('load', function(event) {
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

}

// function popUpBuleano(){
//     let resposta = null;
//     const ImgAceita = document.getElementById("btnTrue").addEventListener('onclick',() => {
//         resposta = true
//     })
//     const ImgNegada = document.getElementById("btnFalse").addEventListener('onclick',() => {
//         resposta = false
//     })
//     console.log(resposta)
//     return resposta
// }


function adicionarImgPerfil(){
    const inputImg = document.querySelector('.inputImgPerfil');
    const perfil = document.querySelector(".imgPerfil")
    const credenciais = JSON.parse(localStorage.getItem("SocialCar"))

    let resposta = null;
    document.getElementById("btnTrue").addEventListener('onclick',() => {
         resposta = true
     })
    document.getElementById("btnFalse").addEventListener('onclick',() => {
         resposta = false
     })

     console.log(resposta)
     
    let ObjImg = null;
    
    
    inputImg.addEventListener('change', function(event) {
        const inputTarget = event.target;
        event.preventDefault()
        const imagem = inputTarget.files[0];
        
        ObjImg = {
            file: imagem,
            token: credenciais.token
        }

        if(imagem){
            const reader = new FileReader();
            reader.addEventListener('load', function(event) {
                const readerTarget = event.target;
                perfil.style.backgroundImage = `url(${readerTarget.result})`
                setInterval(() => {
                    abrirAba('.containerPopUp')
                }, 5000);
            })
            reader.readAsDataURL(imagem)
         }

      }
    )
    if(resposta){
        axios.post("https://socialcar-back.onrender.com/register/profile", ObjImg).then(result => {
           localStorage.SocialCar = result.data
           perfil.style.backgroundImage = `url(${result.data.url})`
        }).catch(error => {
           console.error(error)
        })
    }else{
        return
    }   
}