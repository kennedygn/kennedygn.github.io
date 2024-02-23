/*Kennedy Ninh        300X HW4        2/23/2024*/
/*In this assignment, I have practiced putting together all the skills we have reviewed so far by building a simple rockpaper-scissors game on a web page.*/

let wins = 0;
let losses = 0;
let ties = 0;

function playerChoice(choice) {
    document.getElementById('rock').style.border = '';
    document.getElementById('paper').style.border = '';
    document.getElementById('scissors').style.border = '';
    document.getElementById(choice).style.border = '2px solid blue';
    document.getElementById('computer-choice').src = 'assets/images/question-mark.png'; // Set the src attribute to the question mark image


    document.getElementById('outcome').textContent = 'Thinking...';

    let interval = 500;
    let shuffledImages = ['rock', 'paper', 'scissors'].sort(() => Math.random() - 0.5);
    let currentIndex = 0;

    let shuffleInterval = setInterval(() => {
        document.getElementById('computer-choice').src = `assets/images/${shuffledImages[currentIndex]}.png`;
        currentIndex++;
        if (currentIndex === shuffledImages.length) {
            currentIndex = 0;
        }
    }, interval);

    setTimeout(() => {
        clearInterval(shuffleInterval);
        let computerChoice = shuffledImages[Math.floor(Math.random() * shuffledImages.length)];
        document.getElementById('computer-choice').src = `assets/images/${computerChoice}.png`;
        document.getElementById('computer-choice').style.visibility = 'visible';

        let outcome = determineWinner(choice, computerChoice);
        updateScore(outcome);
        updateOutcomeText(outcome);
    }, 3000);
}

function determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return 'tie';
    } else if ((playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')) {
        return 'win';
    } else {
        return 'loss';
    }
}

function updateScore(outcome) {
    if (outcome === 'win') {
        wins++;
    } else if (outcome === 'loss') {
        losses++;
    } else {
        ties++;
    }
    document.getElementById('wins').textContent = wins;
    document.getElementById('losses').textContent = losses;
    document.getElementById('ties').textContent = ties;
}

function updateOutcomeText(outcome) {
    let outcomeText = '';
    if (outcome === 'win') {
        outcomeText = 'You win!';
    } else if (outcome === 'loss') {
        outcomeText = 'You lose!';
    } else {
        outcomeText = 'It\'s a tie!';
    }

    document.getElementById('outcome').textContent = outcomeText;
}

function resetScore() {
    wins = 0;
    losses = 0;
    ties = 0;
    document.getElementById('wins').textContent = wins;
    document.getElementById('losses').textContent = losses;
    document.getElementById('ties').textContent = ties;
    document.getElementById('outcome').textContent = 'Make your move!';
    document.getElementById('computer-choice').src = 'assets/images/question-mark.png';
    document.getElementById('rock').style.border = '';
    document.getElementById('paper').style.border = '';
    document.getElementById('scissors').style.border = '';
}
