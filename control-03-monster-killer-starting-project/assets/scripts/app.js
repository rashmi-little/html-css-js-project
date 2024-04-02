const ChoosenMaxHealth = 100;
let playerHealth = ChoosenMaxHealth;
let monsterHealth = ChoosenMaxHealth;

const PLAYER_ATTACK = 10;
const MONSTER_ATTACK = 12;
const PLAYER_STRONG_ATTACK = 15;
const HEAL_VALUE = 15;


adjustHealthBars(ChoosenMaxHealth);

function onAttack() {
    doAttack(PLAYER_ATTACK);
}

function doAttack(playerAttackValue) {
    playerAttack(playerAttackValue);
    monsterAttack();

    if(monsterHealth <= 0 || playerHealth <= 0) {
        showResult(monsterHealth, playerHealth);
    }
}

function playerAttack(playerAttackValue) {
    monsterHitBy = dealMonsterDamage(playerAttackValue);
    monsterHealth -= monsterHitBy;
}

function monsterAttack() {
    playerHitBy = dealPlayerDamage(MONSTER_ATTACK);
    playerHealth -= playerHitBy;
}


function showResult(monsterHealth, playerHealth) {
    if(monsterHealth <= 0 && playerHealth > 0) {
        alert("Congratulation Player won");
        reMatch();
    }else if(playerHealth <= 0 && monsterHealth > 0) {
        alert("Oops! monster won this time");
        reMatch();
    }else if(monsterHealth <= 0 && playerHealth <= 0) {
        alert("Match draw");
        reMatch();
    }
}

function reMatch() {
    resetGame(ChoosenMaxHealth);
    playerHealth = ChoosenMaxHealth;
    monsterHealth = ChoosenMaxHealth;
}

function onStrongAttack() {
    doAttack(PLAYER_STRONG_ATTACK);
}

function onHeal() {
    if(playerHealth + HEAL_VALUE <= ChoosenMaxHealth) {
        increasePlayerHealth(HEAL_VALUE);
        playerHealth += HEAL_VALUE;
    }else {
        alert("You can't heal more than max-health");
    }

    monsterAttack();
}

attackBtn.addEventListener('click', onAttack);
strongAttackBtn.addEventListener('click', onStrongAttack);
healBtn.addEventListener('click', onHeal);