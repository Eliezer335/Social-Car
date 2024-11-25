const formulario = document.querySelector(".formulario");
formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const email = document.getElementById("email").value
    const senha = document.getElementById("senha").value

    const credenciais = {
        email: email,
        password: senha
    };
    const button = document.querySelector(".button");

    button.disabled = true;
    button.textContent = "Carregando...";

    axios.post("https://socialcar-back.onrender.com/login", credenciais).then(response => {
        console.log("resposta", response.data);
        const objetoString = JSON.stringify(response.data)
        localStorage.SocialCar = objetoString
        window.location.href = "../Feed/index.html#ancora"
    }).catch(error => {
        window.location.reload()
        console.error("Erro ao tentar fazer login", error);
    }).finally(() => {
        button.disabled = false;
        button.textContent = 'login'
    })
})
