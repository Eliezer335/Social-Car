const formulario = document.querySelector(".formulario");
formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const nome = document.getElementById("nome").value
    const email = document.getElementById("email").value
    const senha = document.getElementById("senha").value

    const credenciais = {
        name: nome,
        email: email,
        password: senha
    };

    axios.post("https://socialcar-back.onrender.com/register", credenciais).then(response => {
        console.log("resposta",response.data);
        alert("Cadastro efetuado com Sucesso!")
    }).catch(error => {
        console.error("Erro ao tentar registrar", error);
        alert("Cadastro não efetuado! Tente novamente mais tarde");
    })
})

