let imagemParaenviar= null;

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

function adicionarImg() {
    const inputImg = document.querySelector('.inputImg');
    const exibirImg = document.querySelector('.exibirImg');
    const imagemTxt = 'Escolha uma imagem';
    exibirImg.textContent = imagemTxt;
  
    inputImg.addEventListener('change', function (event) {
      const imagem = event.target.files[0];  
      imagemParaenviar = imagem
  
      if (imagem) {
        const reader = new FileReader();
  
        reader.addEventListener('load', function (event) {
          exibirImg.style.backgroundImage = `url(${event.target.result})`;
          exibirImg.style.backgroundSize = 'cover';
          exibirImg.style.backgroundPosition = 'center';
          exibirImg.textContent = ""; // Remove o texto padrão ao carregar a imagem
        });
  
        reader.readAsDataURL(imagem);
      }
    });
  }
  

function verificaPerfil(classe) {
    const perfil = document.querySelector(classe);
    const credenciais = JSON.parse(localStorage.getItem("SocialCar"));
    if (credenciais.profileLink) {
        perfil.style.backgroundImage = `url(${credenciais.profileLink})`
    } else {
        perfil.style.backgroundImage = `url()`
    }
};

const enviarPublicacao = async () =>{
    const credenciais = JSON.parse(localStorage.getItem("SocialCar"));
    const headers = {
        'Authorization': `Bearer ${credenciais.token}`,
    };

    try{
        const response = await axios.post(`https://socialcar-back.onrender.com/post`,imagemParaenviar,headers)
        console.log(response.data)
    }catch(error){
        console.error("Erro ao enviar publicação",error)
    }
}

verificaPerfil(".imgUsuario");
verificaPerfil(".imgPerfil");
verificaPerfil(".perfil_usuario");
