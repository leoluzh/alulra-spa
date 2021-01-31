import inicializaCadastro from './componentes/cadastro/componente-cadastro';
import inicializaTabela from './componentes/listagem/listagem-cliente';
import inicializaFormEdicao from './componentes/edita/form-edicao' ;

const rotas = {
    "/" : inicializaTabela ,
    "/cadastro" : inicializaCadastro ,
    "/edita" : inicializaFormEdicao , 
}

const rootDiv = document.querySelector("[data-container]")

const navegacao = pathname => {
    window.history.pushState( {} , pathname , window.location.origin + pathname )
    // clearing data container 
    rootDiv.innerHTML = ""
    // get route
    const iniciarRota = rotas[window.location.pathname]
    // init route content
    rootDiv.appendChild( iniciarRota() );
}

window.navegacao = navegacao;

// controlling history state - go back
window.onpopstate = () => {
    rootDiv.innerHTML = "" 
    rootDiv.appendChild( rotas[window.location.pathname]() );
}
export { navegacao }