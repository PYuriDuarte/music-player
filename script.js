let listaDeMusicas = [
  {titulo:'Escape: The Pina Colada', artista: 'Rupert Holmes', src:'/music/10. Rupert Holmes - Escape The Pina Colada Song.mp3', img:'/img/guardians-of-the-galaxy.jpg'},
  {titulo:'Amiga da Minha Mulher', artista:'Seu Jorge', src:'/music/Amiga Da Minha Mulher - Seu Jorge (Músicas Para Churrasco Vol.1).mp3', img:'/img/seujorge.jpg'},
  {titulo:'Dengo', artista:'Anavitória', src:'/music/Anavitória - Dengo (Audio).mp3', img:'/img/anavitoria.jpeg'},
  {titulo:'Me namora', artista:'Natiruts', src:'/music/Natiruts - Me Namora.mp3', img:'/img/natiruts.jpg'},
];

let musica = document.querySelector('audio');

let indexMusica = 0;

let imagem = document.querySelector('img');
let nomeMusica = document.querySelector('descricao h2');
let nomeArtista = document.querySelector('descricao i');

renderizarMusica(indexMusica);

document.querySelector('.tocar').addEventListener('click', tocarMusica);

document.querySelector('.pause').addEventListener('click', pararMusica);
document.querySelector('.pause').style.display = 'none';

musica.addEventListener('loadeddata', duracao);

musica.addEventListener('timeupdate', atualizarBarra);

musica.addEventListener('ended', () => {
  indexMusica++;
  if (indexMusica > 3){
    indexMusica = 0;
  }
  renderizarMusica(indexMusica);
  tocarMusica();
});

document.querySelector('.voltar').addEventListener('click', () => {
  indexMusica--;
  if (indexMusica < 0){
    indexMusica = 3;
  }
  renderizarMusica(indexMusica);
  pararMusica();
});

document.querySelector('.avancar').addEventListener('click', () => {
  indexMusica++;
  if (indexMusica > 3){
    indexMusica = 0;
  }
  renderizarMusica(indexMusica);
  pararMusica();
});

function renderizarMusica(index){
  musica.setAttribute('src', listaDeMusicas[index].src);
  imagem.setAttribute('src', listaDeMusicas[index].img);
  musica.addEventListener('loadeddata', () => {
      document.querySelector("h2").innerHTML = listaDeMusicas[index].titulo;
      document.querySelector("p").innerHTML = listaDeMusicas[index].artista;
      duracaoMusica.textContent = segundosPminutos(Math.floor(musica.duration));
  });
};

function tocarMusica(){
  musica.play();
  document.querySelector('.pause').style.display = 'block';
  document.querySelector('.tocar').style.display = 'none';
};

function pararMusica(){
  musica.pause();
  document.querySelector('.pause').style.display = 'none';
  document.querySelector('.tocar').style.display = 'block';
};

function atualizarBarra(){
  let barra = document.querySelector('progress');
  barra.style.width = Math.floor((musica.currentTime / musica.duration) * 100) + '%';

  let tempoDecorrido = document.querySelector('.inicio');
  tempoDecorrido.textContent = segundosPminutos(Math.floor(musica.currentTime));
};

function segundosPminutos(segundos){
  let campoMinutos = Math.floor(segundos / 60);
  let campoSegundos = segundos % 60;
  if(campoSegundos < 10){
    campoSegundos = '0' + campoSegundos;
  }
  return `${campoMinutos}:${campoSegundos}`;
};

function duracao(){
  let duracaoMusica = document.querySelector('.fim');

  duracaoMusica.textContent = segundosPminutos(Math.floor(musica.duration));
};



