// Elementos do Modal
const modalButton = document.querySelector("#modalBtn")
const modal = document.querySelector("#modal")
const closeModal = document.querySelector("#closeModal")

// Funcionalidades de abrir e fechar modal
modalButton.addEventListener('click', () => {
    modal.showModal()
})

closeModal.addEventListener('click', () => {
    modal.close()
})
