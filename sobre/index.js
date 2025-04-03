function abrirAba(classe) {
    const aberturaPopUp = document.querySelector(classe)
    aberturaPopUp.style.display = "block";
}

function encerrarSessao(event) {
    const popup = document.querySelector(".containerPopUpSair")
    const btnSim = document.getElementById('btnSimSair')
    const btnNao = document.getElementById('btnNaoSair')
    popup.style.display="block"

    btnSim.addEventListener("click", function () {
        localStorage.removeItem("SocialCar");
        window.location.href = "../login/index.html";
    });

    btnNao.addEventListener("click", function () {
        popup.style.display="none" 
    });
        
    
}