import { detalhaCliente , editaCliente } from '../../api/cliente'
import { validaCPF } from '../validacao/validaCPF'


const eventoForm = form => {

    const pegaURL = new URL(window.location)

    const id = pegaURL.searchParams.get('id')
    
    const inputCPF = document.querySelector('[data-cpf]')
    const inputNome = document.querySelector('[data-nome]')
    
    detalhaCliente(id).then( dados => {
        inputCPF.value = dados[0].cpf 
        inputNome.value = dados[0].nome
    })
    
    
    const alerta = (classe, mensagem) => { 
        const linha = document.createElement('section');
    
        const conteudoLinha = `
        <div class="${classe}">${mensagem}</div>
        
    `
      
        linha.innerHTML = conteudoLinha;
        return linha;
    } 
    form.addEventListener('submit', event => { 
        event.preventDefault()
    
        if(!validaCPF(inputCPF.value)){
            alert("ESSE NÃO EXISTE")
            return 
        }
    
        editaCliente(id, inputCPF.value, inputNome.value)
        .then( resposta => { 
            if( resposta.status === 200){
                form.appendChild(alerta(
                    "alert alert-success",
                    "CLIENTE EDITADO COM SUCESSO !"
                ))
            } else { 
                form.appendChild(alerta(
                    "alert alert-warning",
                    "O CLIENTE NÃO PODE SER EDITADO !"
                ))
            }
        })
        
        
    
    })

}
