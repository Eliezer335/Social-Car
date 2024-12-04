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

function abrirAba() {
    const aberturaPopUp = document.querySelector('.container_popup')

    const credenciais = localStorage.getItem("SocialCar")
    if (!credenciais) {
        window.location.href="../login/index.html#ancora"
        alert("Para fazer uma publicação, faça login!")
    }else{
        aberturaPopUp.style.display="block";
    }
}

function fecharAba() {
    const aberturaPopUp = document.querySelector('.container_popup')
    aberturaPopUp.style.display="none";
}

function adicionarImg(){
    const inputImg = document.querySelector('.inputImg');
    const exibirImg = document.querySelector('.exibirImg');
    const imagemTxt = 'Escolha uma imagem'
    exibirImg.innerHTML = imagemTxt

    inputImg.addEventListener('change', function(event) {
        const inputTarget = event.target;
        console.log(inputTarget.files);
        const imagem = inputTarget.files[0];

        console.log(imagem);

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
         }//else{
        //     imagem.innerHTML = imagem
        // }
    })

}