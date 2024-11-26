const formulario = document.querySelector(".formulario");
formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const button = document.querySelector(".button");

    const nome = document.getElementById("nome").value
    const email = document.getElementById("email").value
    const senha = document.getElementById("senha").value

    const credenciais = {
        name: nome,
        email: email,
        password: senha
    };

    button.disabled = true;
    button.textContent = "Carregando...";

    axios.post("https://socialcar-back.onrender.com/register", credenciais).then(response => {
        console.log("resposta",response.data);
        window.location.href = "../login/index.html#ancora"
    }).catch(error => {
        window.location.reload()
        console.error("Erro ao tentar registrar", error);
    }).finally(() => {
        button.disabled = false;
        button.textContent = 'Cadastrar'
    })
})

