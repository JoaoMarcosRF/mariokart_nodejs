const player00 = {
    nome : "MARIO" , 
    velocidade : 4, 
    manobrabilidade : 3,
    poder :  3,
    pontos :  0,
};

const player01 = {
    nome : "LUIGI" , 
    velocidade : 3, 
    manobrabilidade : 4,
    poder :  3,
    pontos :  0,
};

async function rollDice(){ //funcoes asincronas sao funcoes que nao nessecariamente precisao ser chamadas, nao entendi muito bem;
    return Math.floor(Math.random() * 6) + 1;
}

function getRandomBlock(){
    let random = Math.random();
    let result;

    switch (true) {
        case random <= 0.33:
            result = "RETA";
            break;
        
        case random > 0.33 && random <= 0.66:
            result = "CURVA";
            break;
            
        case random > 0.66:        
            result = "CONFRONTO";
            break;
        default:
            result -1;
            break;
    }

    return result;
}

async function LogRace(charName, tipoBlock, diceResult, attribute) {
    console.log(` 🌟 ${charName} 🎲 rolou um dado de ${tipoBlock} e tirou ${diceResult} + ${attribute} = ${diceResult + attribute}`);
}

async function winnigRoadPlayerTest(char1, char2, char1SkillTest, char2SkillTest, actualBlock){
        if(char1SkillTest > char2SkillTest){
            if(actualBlock === "CONFRONTO"){
                if(char2.pontos > 0){
                    console.log(`O player ${char1.nome} ganhou o confronto, player ${char2.nome} perdeu um ponto!🐢`);
                    char2.pontos--;
                }
                else if(char2.pontos <= 0){
                    console.log(`O player ${char1.nome} ganhou o confronto, como o player ${char2.nome} nao tem pontos, ele nao perde pontos!`);
                }
                
            }
            else if(actualBlock === "RETA" || actualBlock === "CURVA"){
                console.log(`O player ${char1.nome} ganhou 1 ponto!`);
                char1.pontos++;
            }
 
        } 
        else if(char1SkillTest < char2SkillTest){
            if(actualBlock === "CONFRONTO"){
                if(char1.pontos > 0){
                    console.log(`O player ${char2.nome} ganhou o confronto, player ${char1.nome} perdeu um ponto!🐢`);
                    char1.pontos--;
                }
                else if(char1.pontos <= 0){
                    console.log(`O player ${char2.nome} ganhou o confronto, como o player ${char1.nome} nao tem pontos, ele nao perde pontos!`);
                }

            }
            else if(actualBlock === "RETA" || actualBlock === "CURVA"){
                console.log(`O player ${char2.nome} ganhou 1 ponto!`);
                char2.pontos++;
            }

        }

        else if(char1SkillTest === char2SkillTest){
            console.log("EMPATE!");
        }    
}

async function playRaceEngine(char1, char2) {
    for(let index = 0; index < 5; index++){
        console.log(`\n🏁 Rodada ${index + 1}`)

        let block = await getRandomBlock();
        console.log(`BLOCO: ${block}`)

        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        let testSkill1 = 0;
        let testSkill2 = 0;

        if (block === "RETA"){
            testSkill1 = diceResult1 + (char1.velocidade);
            testSkill2 = diceResult2 + (char2.velocidade);

            await LogRace(char1.nome, "velocidade", diceResult1, char1.velocidade);
            await LogRace(char2.nome, "velocidade", diceResult2, char2.velocidade);
            
        }
        else if (block === "CURVA"){
            testSkill1 = diceResult1 + (char1.manobrabilidade);
            testSkill2 = diceResult2 + (char2.manobrabilidade);

            await LogRace(char1.nome, "manobra", diceResult1, char1.manobrabilidade);
            await LogRace(char2.nome, "manobra", diceResult2, char2.manobrabilidade);
        }
        else if (block === "CONFRONTO"){
            testSkill1 = diceResult1 + (char1.poder);
            testSkill2 = diceResult2 + (char2.poder);

            console.log(`${char1.nome} confronta ${char2.nome}!🥊`)
            await LogRace(char1.nome, "confronto", diceResult1, char1.poder);
            await LogRace(char2.nome, "confronto", diceResult2, char2.poder);
        }

        await winnigRoadPlayerTest(char1,char2,testSkill1, testSkill2, block);
    }
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
}

async function declareWinner(char1,char2){
    console.log("Resultado: \n");
    console.log(`${char1.nome}: ${char1.pontos} ponto(s)`);
    console.log(`${char2.nome}: ${char2.pontos} ponto(s)`);
    console.log(`\nO player ${char1.pontos < char2.pontos ? char2.nome : char1.nome} ganhou, com ${char1.pontos < char2.pontos ? char2.pontos : char1.pontos} ponto(s).`);
}

(async function main(){
    console.log(`🏁🚨 A corrida entre ${player00.nome} e ${player01.nome} esta começando`); // essa bomba aq é um print formatado coloca entre ` ` e as variaveis dentro de ${}


    await playRaceEngine(player00, player01);
    await declareWinner(player00, player01);
})() //é uma funcao que é chamada na sua propria declaracao, ou seja, sem nessecidade de chamada como main();


