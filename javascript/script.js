const seuVotoPara = document.querySelector('.tela-interna-superior span');
const cargo = document.querySelector('.cargo span');
const descricao = document.querySelector('.descricao-candidato');
const aviso = document.querySelector('.aviso');
const lateral = document.querySelector('.lateral-right');
const numeros = document.querySelector('.caixa-numeros');

let etapaAtual = 0;
let numero = '';
let votoBranco = false;
let votos = [];
let audio = new Audio();
audio.src = ('som/som.mp3')

etapas = [
    {
        titulo: 'ANBU (Esquadrão de Elite)',
        numeros: 5,
        candidatos: [
            {
                numero: '22222',
                nome: 'Rock Lee',
                partido: 'Folha',
                fotos: [
                    { url: '../images/rock lee.png', legenda: 'Ninja' }
                ]
            },
            {
                numero: '33333',
                nome: 'Hinata Hyuga',
                partido: 'Folha',
                fotos: [
                    { url: '../images/hinata.png', legenda: 'Ninja' }
                ]
            },
        ]
    },
    {
        titulo: 'Hokage',
        numeros: 2,
        candidatos: [
            {
                numero: '22',
                nome: 'Naruto',
                partido: 'Folha',

                vice: 'Kakashi Hatake',
                fotos: [
                    { url: '../images/naruto.png', legenda: 'Hokage' },
                    { url: '../images/kakashi.png', legenda: 'Vice-Hokage', small: true }
                ]
            },
            {
                numero: '33',
                nome: 'Sasuke Uchiha',
                partido: 'Folha',
                vice: 'Kakashi Hatake',
                fotos: [
                    { url: '../images/sasuke.png', legenda: 'Hokage' },
                    { url: '../images/kakashi.png', legenda: 'Vice-Hokage', small: true }
                ]
            },
            {
                numero: '44',
                nome: 'Sakura Haruno',
                partido: 'Folha',
                vice: 'Hinata Hyuga',
                fotos: [
                    { url: '../images/sakura.png', legenda: 'Hokage' },
                    { url: '../images/hinata.png', legenda: 'Vice-Hokage', small: true }
                ]
            },
        ]
    }
]

function comecarEtapa() {
    const etapa = etapas[etapaAtual];

    let numeroHtml = '';
    numero = '';
    votoBranco = false;

    for (let i = 0; i < etapa.numeros; i++) {
        if (i === 0) {
            numeroHtml += '<div class="numero pisca"></div>';
        } else {
            numeroHtml += '<div class="numero"></div>';
        }
    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;
}
function atualizaInterface() {
    const etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item) => {
        if (item.numero === numero) {
            return true;
        } else {
            return false;
        }
    });

    if (candidato.length > 0) {
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}`;

        let fotosHtml = '';
        for (let i in candidato.fotos) {
            if (candidato.fotos[i].small) {
                fotosHtml += `<div class="d-1-image"><img src="images/${candidato.fotos[i].url}" alt="" />${candidato.fotos[i].legenda}</div>`;
            } else {
                fotosHtml += `<div class="d-1-image"><img src="images/${candidato.fotos[i].url}" alt="" />${candidato.fotos[i].legenda}</div>`;
            }
        }

        lateral.innerHTML = fotosHtml;
    } else {
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO NULO</div>';
    }
}

function pressionar(n) {
    const elNumero = document.querySelector('.numero.pisca');
    if (elNumero !== null) {
        elNumero.innerHTML = n;
        numero = `${numero}${n}`;

        elNumero.classList.remove('pisca');
        if (elNumero.nextElementSibling !== null) {
            elNumero.nextElementSibling.classList.add('pisca');
        } else {
            atualizaInterface();
        }
    }
}

function branco() {
    if (numero === '') {
        votoBranco = true;
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        numeros.innerHTML = '';
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO</div>';
    } else {
        alert('Para votar em BRANCO, não pode ter digitado nenhum número !!!')
    }
}

function corrige() {
    comecarEtapa();
}

function confirma() {
    let etapa = etapas[etapaAtual];

    let votoConfirmado = false;

    if (votoBranco) {
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
        });
    } else if (numero.length === etapa.numeros) {
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        });
    }

    if (votoConfirmado) {
        etapaAtual++;
        if (etapas[etapaAtual] !== undefined) {
            comecarEtapa();
        } else {
            audio.play()
            document.querySelector('.tela').innerHTML = '<div class="aviso--gigante pisca">FIM</div>'
            console.log(votos);
        }
    }
}

comecarEtapa();


