// Elementos DOM 
const inputTarefa = document.querySelector("#input-tarefa")
const inputDescricao = document.querySelector("#input-descricao")
const inputTime = document.querySelector("#input-time")
const form = document.querySelector("form")
const ul = document.querySelector("ul")

// Lista de tarefas

let listaTarefas = JSON.parse(localStorage.getItem("tarefa")) || []

for(let i = 0; i < localStorage.length; i++){
    let alou = JSON.parse(localStorage.getItem(`tarefa${i}`))
    
    if(alou){
        listaTarefas.push(alou)
    }

}

// Núcleo do Código - Ao enviar o form
form.addEventListener("submit", (e) =>{
    e.preventDefault()

    // Cria a tarefa
    const tarefa = {
        tarefa: inputTarefa.value,
        descricao: inputDescricao.value,
        time: inputTime.value
    }

    listaTarefas.push(tarefa)

    // Limpar campos
    inputTarefa.value = ""
    inputDescricao.value = ""
    inputTime.value = ""

    render()

})

function render(){

    ul.innerText = ``

    listaTarefas.forEach((item,index) =>{
        console.log(`${item.tarefa} - ${index}`)
        localStorage.setItem(`tarefa${index}`, JSON.stringify(item))

        ul.innerHTML += `
            <strong>${item.tarefa}</strong>
            <span>${item.time}</span>
        `
        
    })
}


// Coloca a data mínima como maior que hoje
const agora = new Date()
const horaAgora = agora.getHours()
const minutoAgora = agora.getMinutes()

const formatarAgora = `${horaAgora}:${minutoAgora}`

const agoraTestes = new Date().toISOString().slice(0,11)
const agoraFormatado = agoraTestes + formatarAgora

inputTime.min = agoraFormatado
