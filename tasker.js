// Elementos DOM 
const inputTarefa = document.querySelector("#input-tarefa")
const inputDescricao = document.querySelector("#input-descricao")
const inputTime = document.querySelector("#input-time")
const form = document.querySelector("form")
const ul = document.querySelector("#ul-tasks")

// Lista de tarefas
let listaTarefas = JSON.parse(localStorage.getItem("tarefa")) || []

// Botões nos inputs
const checkButton = document.querySelector(".check-button")
const editButton = document.querySelector(".edit-button")
const deleteButton = document.querySelector(".delete-button")

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

    listaTarefas.forEach((item, index) => {
        
        const data = dayjs(item.time).format("DD/MM")
        const hora = dayjs(item.time).format("HH:mm")    
        const diaSemana = dayjs(item.time).format("dddd")
        const diaSemanaFormat = diaSemana[0].toUpperCase() + diaSemana.slice(1)
            
                        
        const tarefaData = dayjs(item.time)
        const hoje = dayjs(agora)
        const limite = hoje.add(7, "days")

        if (tarefaData.isBefore(limite) || tarefaData.isSame(limite)) {
            ul.innerHTML += `
                <li class="task">${item.tarefa}</li>
                <p> 
                    <i class="fa-regular fa-calendar"></i>
                    ${diaSemanaFormat} às ${hora}
                </p>
                <button class="check-button"><i class="fa-regular fa-circle-check"></i>Concluir</button>
                <button class="edit-button"><i class="fa-regular fa-trash-can"></i>Editar</button>
                <button class="delete-button"><i class="fa-regular fa-trash-can"></i>Excluir</button>
            `
        } else {    
            ul.innerHTML += `
                <li class="task">${item.tarefa}</li>
                
                <p><i class="fa-regular fa-calendar"></i>${data} às ${hora}</p>
                <button class="check-button"><i class="fa-regular fa-circle-check"></i>Concluir</button>
                <button class="edit-button"><i class="fa-regular fa-trash-can"></i>Editar</button>
                <button class="delete-button"><i class="fa-regular fa-trash-can"></i>Excluir</button>
            `


            checkButton.addEventListener("click", () =>{
                window.confirm("Tem certeza que deseja apagar essa tarefa")

                if(confirm){
                    localStorage.removeItem(`tarefa${index}`)
                    listaTarefas.pop(index+1)
                }
                else{
                    window.alert("Ação cancelada.")
                }
           
    })
}
        console.log(`${item.tarefa} - ${index}`)
        localStorage.setItem(`tarefa${index}`, JSON.stringify(item))

        
    })
}



render()


            
