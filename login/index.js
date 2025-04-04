const formulario = document.querySelector(".formulario");
formulario.addEventListener('submit',async (evento) => {
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
    
    try{
        const response = await axios.post("https://socialcar-back.onrender.com/login", credenciais)
        const objetoString = JSON.stringify(response.data)        
        localStorage.SocialCar = objetoString
        window.location.href = "../Feed/index.html#ancora"    
    } catch{
        console.error("Erro ao tentar fazer login", error);
    } finally{
        button.disabled = false;
        button.textContent = 'login'
    }
})
