const armazenadorLocal = []

// Elementos do Modal
const modalButton = document.querySelector("#modalBtn")
const modal = document.querySelector("#modal")
const closeModal = document.querySelector("#closeModal")

// Lista de tarefas
const ul = document.querySelector("ul")

// Elementos do formulário
const form = document.querySelector("form")
const inputTarefa = document.querySelector("#input-tarefa")
const inputDescricao = document.querySelector("#input-descricao")
const inputTime = document.querySelector("#input-time")


// Funcionalidades de abrir e fechar modal
modalButton.addEventListener('click', () => {
    modal.showModal()
})

closeModal.addEventListener('click', () => {
    modal.close()
})


form.addEventListener("submit", (e) => {
    e.preventDefault()

    const tarefa = {
        tarefa: inputTarefa.value,
        descricao: inputDescricao.value,
        inputTime: inputTime.value
    }


    armazenadorLocal.push(tarefa)

    let contador = 0
    
    ul.innerHTML = ``

    armazenadorLocal.forEach((item) => {

        const diaFormatado = dayjs(item.inputTime).format("D")
        const mesFormatado = dayjs(item.inputTime).format("MMMM")
        const horaFormatada = dayjs(item.inputTime).format("HH:MM")

        ul.innerHTML += `
            <li>
                <div>
                    <strong>${item.tarefa}</strong>
                    <span>Dia ${diaFormatado} de ${mesFormatado}, às ${horaFormatada}</span>
                </div>
            </li>
        `
    })

    // Limpar campos
    inputDescricao.value = ""
    inputTarefa.value = ""
    inputTime.value = ""
})


// Coloca a data mínima como maior que hoje
const agora = new Date()
const horaAgora = agora.getHours()
const minutoAgora = agora.getMinutes()

const formatarAgora = `${horaAgora}:${minutoAgora}`

const agoraTestes = new Date().toISOString().slice(0,11)
const agoraFormatado = agoraTestes + formatarAgora

inputTime.min = agoraFormatado

