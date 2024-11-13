let url = ""

function abrirAba() {
    const aberturaPopUp = document.querySelector('.container_popup')
    aberturaPopUp.style.display="block";

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

        if(imagem){
            const reader = new FileReader();

            reader.addEventListener('load', function(event) {
                const readerTarget = event.target;
                exibirImg.innerHTML = ""
                const img = document.createElement('img');
                img.src = readerTarget.result
                url = readerTarget.result
                img.classList.add('exibirImg');

                exibirImg.appendChild(img)
            })
            reader.readAsDataURL(imagem)
         }
    })

}

function publicar() {
    const id = "11551020mmm"
    const todasPublicacaoes = document.querySelector('.publicacoes')
    const txtLegenda = document.querySelector('.txtArea').value;
    const imagemPublicacao = document.querySelector('.exibirImg') 
    const background = document.querySelector(".imgPublicacao")
    console.log(background,"erro")
    background.style.backgroundImage = `url('${url}')`

    todasPublicacaoes.innerHTML += `
            <div class="publicacao">
                <div class="containerUsuario">
                    <div class="imgUsuario"></div>
                    <div class="nomeUsuario">Eliezer Martinhago da silva</div>
                </div>
                <div class="legendaPublicacao">${txtLegenda}</div>
                <div class="imgPublicacao" id='11551020mmm'>${imagemPublicacao}</div>
            </div>
    `
}