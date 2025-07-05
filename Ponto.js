var posJog01 = 0;
var posJog02 = 19;

var XBotao = 100;
var YBotao = 330;
var LargBotao = 200;
var AltBotao = 40;

var vida = []; //vetor que vai armazenar as vidas das casas
var casas1=[]; //vetor que vai armazenar as casas andadas - Jog01
var casas2=[]; //vetor que vai armazenar as casas andadas - Jog02

var rodadas = 0; //contador das rodadas

var tela = 0;
var dado = 0;

//parte gráfica
var fundo; //imagem de fundo do jogo
var som01; //som - vitória Jog01
var som02; //som - vitória Jog02

var imgJog01 = [] //gif tela de vitória - Jog01
var imgJog02 = [] //gif tela de vitória - Jog02

//sistema para controlar o tempo dos gifs
var cont = 0;
var tempo = 0;
var velocidade = 6;

//função da parte gráfica do código
function preload(){
//sistema responsável por rodar as imagens, gerando gifs
  for(var i = 0; i < 22; i++){
    imgJog01[i]=loadImage("Circulo(" + i + ").jpg"); //gif Jog01
    }
  
  for(var j = 0; j < 22; j++){
    imgJog02[j]=loadImage("Triangulo(" + j +").jpg"); //gif Jog02
    }

//sistema de som
  som01 = loadSound("FinalSquidGame.mp3"); //som vitória Jog01
  som02 = loadSound("SquidGame.mp3");      //som vitória Jog02
  
//tela de fundo
  fundo = loadImage("MontanhaGelo.jpg");   //tela de fundo jogo
}

function setup() {
  createCanvas(400, 400);
  
//vida das casas do tabuleiro 
  for(var i = 0; i < 20; i++){
    vida[i] = 2;
  }
}

function draw() {
  //print(mouseX, mouseY);
  background(fundo);
  //rgb(132,189,194)
  
  if(tela == 0){
  //tabuleiro do jogo
    for (var i = 0; i < 20; i++) {
      if(vida[i]==2){
        fill("#3D99BE")
      }else{
        fill("#fffafa")
      }
        rect(i * 20, 210, 20, 20); //cria os quadrados de 20x20
      
  //condição para a ponte quebrar
      if(vida[i] <= 0){ //valor do vetor vida menor ou igual a 0
        vida[i]=2;      //restaura a ponte
          if(posJog01==i){ //posição do jogador = a casa quebrada
          posJog01=0;      //Jog01 volta para o início
          }
          if(posJog02==i){ //posição do jogador = a casa quebrada
          posJog02=19;     //Jog02 volta para o início    
          }
        }  
      }
    }

//parte gráfica da tela     
//título
  fill("black")
  text("Ponte de Gelo", 130, 53)
  
  textStyle(BOLD);
  textSize(30);
    
//jogador01
    fill("#005F40");
    circle(posJog01 * 20 + 10, 220, 20);
    textSize(20)
    fill("black")

//jogador02
    fill("#D03972");
    triangle(posJog02 * 20 + 10, 210, posJog02 * 20 + 0, 228,       posJog02 * 20 + 20, 228);
    textSize(20)

//tela quando o Jog01 vencer
  if(tela == 1){
    //parte gráfica
    background("#AEC4D2");
    fill("black")
    text("Jogador 01 \n    Venceu", 140, 50)
    
    fill("#005F40");
    circle(100, 56, 47);
    circle(283, 56, 47);
    
    //execução do gif e sistema de velocidade
    image(imgJog01[cont], 75, 100, 250, 200)
    tempo++;
      if(tempo >= velocidade){
        cont++
        if(cont > 11){
          cont = 0;
          }
      tempo = 0;
      }
    
//parte gráfica
//sobreposição de cor quando o cursor estiver sobre ele
    if(mouseX > XBotao && mouseX < XBotao + LargBotao && mouseY     > YBotao && mouseY < YBotao + AltBotao ){
      fill("#005F40");
    }else{
      fill("white");
    }
    
//botão
//parte gráfica
    rect(XBotao, YBotao, LargBotao, AltBotao, 5);
    fill("black")
    text("Reiniciar", 157, 357) 
  }

//tela quando o Jog02 vencer
  if(tela == 2){
    //parte gráfica
    background("#E1FFFE");
    fill("black")
    text("Jogador 02 \n    Venceu", 140, 50);
    fill("#D03972")
    triangle(100, 37, 75, 78, 125, 78);
    triangle(283, 37, 260, 78, 305, 78);
    
    //execução do gif e sistema de velocidade
    image(imgJog02[cont], 75, 100, 250, 200);
    tempo++;
      if(tempo >= velocidade){
        cont++
        if(cont > 11) {
          cont = 0;
          }
      tempo = 0;
      }
    
//parte gráfica
//sobreposição de cor quando o cursor estiver sobre ele
    if(mouseX > XBotao && mouseX < XBotao + LargBotao && mouseY     > YBotao && mouseY < YBotao + AltBotao ){
      fill("#D03972");
    }else{
      fill("white");
    }
  
//botão
//parte gráfica
    rect(XBotao, YBotao, LargBotao, AltBotao, 5);
    fill("black")
    text("Reiniciar", 157, 357)
    
  } 
}
  
function mouseClicked(){
  
if(tela == 0){
//jogador01 
    dado = parseInt(random(1,5))
    pergunta = prompt("Deseja andar " +dado + " casa(s)?             \nDigite 's' caso queira seguir.")
    
    if(pergunta == "s"){
        posJog01 = posJog01 + dado;   
    }else{
      if(posJog01 > 0){ //posibilidade quando o jogador não andar
      vida[posJog01]++
      }
    }
    
//jogador02   
    dado = parseInt(random(0,5))
    posJog02 = posJog02 - dado; 
  
//condição para que as casa 0 e 19 não percam vidas
    if (posJog01 > 0 && posJog01 < 19){
      casas1[rodadas]=posJog01;
      vida[posJog01]--;
    }
    if (posJog02 > 0 && posJog02 < 19) {
      casas2[rodadas]=posJog02;
      if(dado == 0){
        vida[posJog02]++;
      }
      vida[posJog02]--;
    }
  
    rodadas++;
  
    //colisão dos dois jogadores
      if(posJog01==posJog02){
      vida[posJog01] = 0;  //ambos os jogadores voltam ao início
       }

//Codição de vitória
      if(posJog01 > 19){
        tela = 1;
        som01.play();
        
        for(var i = 0; i < 20; i++){
          vida[i] = 2;
          }
        
        rodadas = 0;
        casas1 = []; //restaura o vetor das posições Jog01
        casas2 = []; //restaura o vetor das posições Jog02
      }
  
      if(posJog02 < 0){
        tela = 2;
        som02.play();
        
        for(var i = 0; i < 20; i++){
          vida[i] = 2;
          }
        
        rodadas = 0;
        casas1 = []; //restaura o vetor das posições Jog01
        casas2 = []; //restaura o vetor das posições Jog02
      }
  
//verificar o estado das variáveis e vetores de forma simultânea  
      console.log(vida)      
      console.log(dado)
      console.log(posJog01)
      console.log(casas1)
      console.log(rodadas)
  }

  if(mouseX > XBotao && mouseX < XBotao + LargBotao && mouseY    > YBotao && mouseY < YBotao + AltBotao && tela == 1){
    tela = 0;
    posJog01 = 0;
    posJog02 = 19;
    som01.stop();
    }
  
  if(mouseX > XBotao && mouseX < XBotao + LargBotao && mouseY   > YBotao && mouseY < YBotao + AltBotao && tela == 2){
    tela = 0;
    posJog01 = 0;
    posJog02 = 19; 
    som02.stop();
  }
}
