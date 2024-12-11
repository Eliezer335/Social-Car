const objetoQuizz = {
    title: "Qual carro combina mais com você?",
    firtQuestion: {
        title: "Escolha uma marca de sua preferencia",
        options: {
            option1: "toyota",
            option2: "mercedes",
            option3: "nissan"
        }
    },
    secondQuestion: {
        title: "Escolha uma categoria de sua preferência!",
        options: {
            option1: "suv",
            option2: "sedã",
            option3: "pick-up"
        }
    },
    thirdQuestion: {
        title: "Escolha a sua preferencia entre",
        options: {
            option1: "veloz",
            option2: "confortavel",
            option3: "4x4"
        }
    }
};



const escolheMarca = ()=>{
    const marcabtn1 = document.getElementById(marca1)
    const obj1 = objetoQuizz.firtQuestion.options.option1

    console.log(obj1)
}

const escolheMarca2 = ()=>{    
    const obj2 = objetoQuizz.firtQuestion.options.option2;
    console.log(obj2)
}

const escolheMarca3 = ()=>{    
    const obj3 = objetoQuizz.firtQuestion.options.option3;
    console.log(obj3)
}
