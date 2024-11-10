
function abrirAba() {
    const aberturaPopUp = document.querySelector('.container_popup')
    aberturaPopUp.style.display="block";

}

function fecharAba() {
    const aberturaPopUp = document.querySelector('.container_popup')
    aberturaPopUp.style.display="none";
    

}

function publicar() {
    const todasPublicacaoes = document.querySelector('.publicacoes')
    const txtLegenda = document.querySelector('.txtArea').value;
    const imagemPublicacao = document.querySelector('.exibirImg') 
    console.log('imagem publicacao',imagemPublicacao)
    

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