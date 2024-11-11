import {v4 as uuidv4} from "uuid"

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
         }
    })

}

function publicar() {
    const id = uuidv4()
    console.log(id)
    const todasPublicacaoes = document.querySelector('.publicacoes')
    const txtLegenda = document.querySelector('.txtArea').value;
    const imagemPublicacao = document.querySelector('.exibirImg') 

    todasPublicacaoes.innerHTML += `
            <div class="publicacao">
                <div class="containerUsuario">
                    <div class="imgUsuario"></div>
                    <div class="nomeUsuario">Eliezer Martinhago da silva</div>
                </div>
                <div class="legendaPublicacao">${txtLegenda}</div>
                <div class="imgPublicacao">${imagemPublicacao}</div>
            </div>
    `
}

publicar()