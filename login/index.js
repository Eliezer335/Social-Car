const formulario = document.querySelector(".formulario");
formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const email = document.getElementById("email").value
    const senha = document.getElementById("senha").value

    console.log("funcionou", email,senha)

    const credenciais = {
        email: email,
        password: senha
    };

    axios.post("https://socialcar-back.onrender.com/login", credenciais).then(response => {
        console.log("resposta",response.data);
        alert("Login efetuado com Sucesso!")
    }).catch(error => {
        console.error("Erro ao tentar fazer login", error);
        alert("login não efetuado! Tente novamente mais tarde");
    })
    
    const objetoString = JSON.stringify(credenciais)
    localStorage.SocialCar = objetoString
})
