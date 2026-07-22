// Elementos DOM 
const inputTarefa = document.querySelector("#input-tarefa")
const inputDescricao = document.querySelector("#input-descricao")
const inputTime = document.querySelector("#input-time")
const form = document.querySelector("form")
const ul = document.querySelector("#ul-tasks")
const message = document.querySelector("#tarefa-message")
const divMessage = document.querySelector("#campo-tarefas")
// Lista de tarefas
let listaTarefas = JSON.parse(localStorage.getItem("tarefa")) || []

// Coloca a data mínima como maior que hoje
const agora = new Date()
const horaAgora = agora.getHours()
const minutoAgora = agora.getMinutes()

const formatarAgora = `${horaAgora}:${minutoAgora}`

const agoraTestes = new Date().toISOString().slice(0,11)
const agoraFormatado = agoraTestes + formatarAgora

inputTime.min = agoraFormatado


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
        time: inputTime.value,
        statusTarefa: false,
    }

    listaTarefas.push(tarefa)

    // Limpar campos
    inputTarefa.value = ""
    inputDescricao.value = ""
    inputTime.value = ""

    mensagem()
    render()

})

function remover(index) {
    localStorage.removeItem(`tarefa${index}`)
}

function editar(index) {
    const tarefaEditada = window.prompt("Digite sua alteração:")


    let tarefaEdit = JSON.parse(localStorage.getItem(`tarefa${index}`))

    tarefaEdit.tarefa = tarefaEditada

    localStorage.setItem(`tarefa${index}`, JSON.stringify(tarefaEdit))
}
function concluir(index) {
    let tarefaCheck = JSON.parse(localStorage.getItem(`tarefa${index}`))

    tarefaCheck.statusTarefa = true

    localStorage.setItem(`tarefa${index}`, JSON.stringify(tarefaCheck))
}

function render(){

    ul.innerText = ``

    listaTarefas.forEach((item, index) => {

         if (item.statusTarefa == "true") {
                ul.innerHTML += `
                <li class="task">
                <div class="tasker">
                <i class="fa-regular fa-circle-check"></i><h3>${item.tarefa}</h3>                
                </div>
                <p> 
                    <i class="fa-regular fa-calendar"></i>
                    ${diaSemanaFormat} às ${hora}
                </p>
                <hr>
                <div class="buttons">
                <span class="check-span" onclick="concluir(${index})">
                    <i class="fa-regular fa-circle-check"></i>
                    Concluir
                </span>
                
                <span class="edit-span" onclick=editar(${index})>
                    <i class="fa-solid fa-eraser"></i>
                    Editar
                </span>
                
                <span class="del-span" onclick="remover(${index})">
                    <i class="fa-regular fa-trash-can"></i>
                    Excluir
                </span>
                </div>
                </li>
                `
         } else {
             
            }
                const data = dayjs(item.time).format("DD/MM")
                const hora = dayjs(item.time).format("HH:mm")    
                const diaSemana = dayjs(item.time).format("dddd")
                const diaSemanaFormat = diaSemana[0].toUpperCase() + diaSemana.slice(1)
                    
                                
                const tarefaData = dayjs(item.time)
                const hoje = dayjs(agora)
                const limite = hoje.add(7, "days")


        if (tarefaData.isBefore(limite) || tarefaData.isSame(limite)) {
            ul.innerHTML += `
                <li class="task">
                <div class="tasker">
                <i class="fa-solid fa-circle-check"></i><h3>${item.tarefa}</h3>                
                </div>
                <p> 
                    <i class="fa-regular fa-calendar"></i>
                    ${diaSemanaFormat} às ${hora}
                </p>
                <hr>
                <div class="buttons">
                <span class="check-span" onclick="concluir(${index})">
                    <i class="fa-regular fa-circle-check"></i>
                    Concluir
                </span>
                
                <span class="edit-span" onclick=editar(${index})>
                    <i class="fa-solid fa-eraser"></i>
                    Editar
                </span>
                
                <span class="del-span" onclick="remover(${index})">
                    <i class="fa-regular fa-trash-can"></i>
                    Excluir
                </span>
                </div>
                </li>
                `
        }
        else{    
            ul.innerHTML += `
                <li class="task">
                <i class="fa-regular fa-circle"></i>
                    <h3>${item.tarefa}</h3>
                    <p>
                        <i class="fa-regular fa-calendar"></i>
                        ${data}
                    </p> 
                    <hr>

                    <div class="buttons">
                <span class="check-span" onclick="concluir(${index})">
                    <i class="fa-regular fa-circle-check"></i>
                    Concluir
                </span>
                
                <span class="edit-span" onclick=editar(${index}))>
                    <i class="fa-solid fa-eraser"></i>
                    Editar
                </span>
                
                <span class="del-span" onclick=remover(${index})>
                    <i class="fa-regular fa-trash-can"></i>
                    Excluir
                </span>
                </div>
                </li>

            `}

        console.log(`${item.tarefa} - ${index}`)
        localStorage.setItem(`tarefa${index}`, JSON.stringify(item))
    })
}


function mensagem(){
    if(listaTarefas.length == 0){
        message.textContent = "Nenhuma tarefa cadastrada :("
        divMessage.innerHTML += `<button id="button-message"><i class="fa-solid fa-plus"></i>Adicionar Tarefa</button>` 
    }
    else{
        message.textContent = "Minhas tarefas"
        divMessage.style.border = "solid 1px #3c3c3c"
        divMessage.style.borderRadius = "4px"
    }
}

render()
mensagem() 

