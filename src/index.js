const player00 = {
    nome : "MARIO" , 
    velocidade : 4, 
    manobrabilidade : 3,
    poder :  3,
    pontos :  0,
};

const player01 = {
    nome : "LUIGI" , 
    velocidade : 4, 
    manobrabilidade : 3,
    poder :  3,
    pontos :  0,
};

async function rollDice(){
    return Math.floor(Math.random() * 6) + 1;
}
