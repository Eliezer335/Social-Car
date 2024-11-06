
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

inputImg.addEventListener('change', function(e) {
    const inputTarget = e.target;
    console.log(inputTarget);
    const imagem = inputTarget.imagem[0];

    console.log(imagem);
    if(imagem){
        const reader = new FileReader();

        reader.addEventListener('load', function(e) {
            const readerTarget = e.target;

            const img = document.createElement('img');
            img.src = readerTarget.result
            img.classList.add('.exibirImg');

            imagem.appendChild(img)
        })
        reader.readAsDataURL(imagem)
    }else{
        imagem.innerHTML = imagem
    }
})

}