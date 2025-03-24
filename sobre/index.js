function encerrarSessao(){
    localStorage.removeItem("SocialCar");
    window.location.href="../login/index.html";
}