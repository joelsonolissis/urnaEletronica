let seuVotoPara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2');
let lateral = document.querySelector('.d-1-rigth');
let numeros = document.querySelector('.d-1-3');

let etapaA = 0;
let numeroEscolhido = '';
let branco = true;
let totalVotos = [];
function exibirEtapa(){
 let etapa = etapas[etapaA];
 let numeroH = '';
 branco = false;
 numeroEscolhido = '';
 for(let i=0;i<etapa.numeros;i++){
     if(i===0){
     numeroH += '<div class="numero pisca"></div>';
     }else{
        numeroH += '<div class="numero"></div>';
     }
 }
 seuVotoPara.style.display = 'none';
 cargo.innerHTML = etapa.Titulo;
 aviso.style.display = 'none';
 lateral.innerHTML = '';
 descricao.innerHTML = '';
 numeros.innerHTML = numeroH;
}
function updateUI(){
    
    let etapa = etapas[etapaA];
    let candidato = etapa.candidatos.filter((item)=>{
        if(item.numero === numeroEscolhido){
            return true;
        }else{
            return false;
        }
    });
    
   if(candidato.length>0){
       candidato = candidato[0];
       seuVotoPara.style.display = 'block';
       aviso.style.display = 'block';
       descricao.innerHTML = `Nome: ${candidato.nome}<br>Partido: ${candidato.partido}`;
       let fotosHTML = '';
       for(let i in candidato.fotos){
           if(candidato.fotos[i].small){
            fotosHTML += `<div class="d-1-rigth"><div class="d-1-image small"><img src="img/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`;
           }else{
           fotosHTML += `<div class="d-1-rigth"><div class="d-1-image"><img src="img/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`;
           }
       }
       lateral.innerHTML = fotosHTML;
   }else{
    seuVotoPara.style.display = 'block';
    aviso.style.display = 'block';
    descricao.innerHTML = '<div class="aviso-grande pisca">VOTO NULO</div>';
   }
}
function clicou(n){
    let nu = document.querySelector('.numero.pisca');
if(nu !== null){
    nu.innerHTML = n;
    numeroEscolhido = `${numeroEscolhido}${n}`;
    nu.classList.remove('pisca');
    if(nu.nextElementSibling !== null){
    nu.nextElementSibling.classList.add('pisca');
    }else{
        updateUI();
    }
}
}
function b(){
    if(numeroEscolhido ===''){
        branco = true;
        seuVotoPara.style.display = 'block';
       aviso.style.display = 'block';
       numeros.innerHTML = '';
       descricao.innerHTML = '<div class="aviso-grande pisca">VOTO EM BRANCO</div>';
    }else{
        descricao.innerHTML = '<div class="aviso-numeros pisca">Para votar em branco nao pode ter numeros</div>';
    }
    
}
function c(){
   exibirEtapa();
}
function co(){
    let etapa = etapas[etapaA];
    let votoConfirmado = false;
    if(branco===true) {
        votoConfirmado = true;
        totalVotos.push({
            etapa: etapas[etapaA].Titulo,
            voto: 'branco'
        });
    }else if(numeroEscolhido.length===etapa.numeros){
        votoConfirmado = true;
        totalVotos.push({
            etapa: etapas[etapaA].Titulo,
            voto: numeroEscolhido
        });
    }
    if(votoConfirmado){
        etapaA++;
        if(etapas[etapaA] !==undefined){
            exibirEtapa();
        }else{
           document.querySelector('.tela').innerHTML = '<div class="aviso-grande">FIM!!!</div>';
           console.log(totalVotos);
            
        }
    }
}

exibirEtapa();