const frm = document.querySelector("form")      // obtém elementos da página
const dvQuadro = document.querySelector("#divQuadro")

frm.addEventListener("submit", (e) => {
  e.preventDefault()                            // evita envio do form

  const tarefa = frm.inTarefa.value             // obtém o conteúdo digitado

  const h5 = document.createElement("h5")       // cria o elemento HTML h5
  const texto = document.createTextNode(tarefa) // cria um texto
  h5.appendChild(texto)                         // define que texto será filho de h5
  dvQuadro.appendChild(h5)                      // e que h5 será filho de divQuadro

  frm.inTarefa.value = ""                       // limpa o campo de edição
  frm.inTarefa.focus()                          // joga o cursor neste campo
})

frm.btSelecionar.addEventListener("click", () => { // adiciona um evento clique no botão selecionar
  const tarefas = document.querySelectorAll("h5")  

  if (tarefas.length == 0) { // verifica se a quantidade de elemtno na lista tarefas foi igual a , emite um alerta que não tarefas para selecioanr
    alert("Não há tarefas para selecionar")       
    return                                        
  }

  let aux = -1                   

 
  for (let i = 0; i < tarefas.length; i++) { // for para selecionar a tarefa
    
    if (tarefas[i].className == "tarefa-selecionada") { // seleciona a tarefa
      tarefas[i].className = "tarefa-normal"      // após ja ter passado uma vez pela tarefa, informa que e uma tarefa normal
      aux = i                                     
      break                                       
    }
  }

  
  if (aux == tarefas.length - 1) {
    aux = -1
  }

  tarefas[aux + 1].className = "tarefa-selecionada" 
})

frm.btRetirar.addEventListener("click", () => {   // evento para de clique no botão Retirar 
  const tarefas = document.querySelectorAll("h5") 

  let aux = -1               

  
  tarefas.forEach((tarefa, i) => { // for para retirar a tarefa selecionada, e ao final um console log para mostrar em qual posição da lista estava a tarefa
    if (tarefa.className == "tarefa-selecionada") {  
      aux = i
      console.log(i)                                   
    }
  })

  if (aux == -1) {       // if para verificar se tem alguma tarefa selecionada, se não tiver aparece um alerta na tela para selcionar a tarefa      
    alert("Selecione uma tarefa para removê-la...")
    return
  }

  if (confirm(`Confirma Exclusão de "${tarefas[aux].innerText}"?`)) { // um alerta para confirmar a exclusão da tarefa
    dvQuadro.removeChild(tarefas[aux])        
  }
})

frm.btGravar.addEventListener("click", () => {  // adiciona um evento de clique no botão gravar
  const tarefas = document.querySelectorAll("h5")  

  if (tarefas.length == 0) { // if para verificar se tem alguma tarefa que possa ser salva, se caso não tiver aparece um alerta na tela informando que não tem tarefas para serem salvas
    alert("Não há tarefas para serem salvas")      
    return                                         
  }

  let dados = ""                            
  tarefas.forEach(tarefa => {  
    dados += tarefa.innerText + ";"         
  })

  
  localStorage.setItem("tarefasDia", dados.slice(0, -1)) // armazena as tarefas no navegador

  
  if (localStorage.getItem("tarefasDia")) { // verifica se as tarefas foram salvas, se sim emite um alerta avisando
    alert("Ok! Tarefas Salvas")
  }
})

window.addEventListener("load", () => { 
  
  if (localStorage.getItem("tarefasDia")) {
    
    const dados = localStorage.getItem("tarefasDia").split(";")

    // percorre os dados armazenados em localStorage
    dados.forEach(dado => {
      const h5 = document.createElement("h5")      
      const texto = document.createTextNode(dado)  
      h5.appendChild(texto)                      
      dvQuadro.appendChild(h5)                   
    })
  }
})