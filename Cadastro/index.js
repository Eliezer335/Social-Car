const formulario = document.querySelector(".formulario");
formulario.addEventListener('submit',async (evento) => {
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

    try{
        const response = await axios.post("https://socialcar-back.onrender.com/register", credenciais)
        const objetoString = JSON.stringify(response.data)        
        localStorage.SocialCar = objetoString
        window.location.href = "../login/index.html#ancora"    
    } catch{
        console.error("Erro ao tentar fazer login", error);
    } finally{
        button.disabled = false;
        button.textContent = 'login'
    }
})

