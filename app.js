// Scoping everything inside this function
// so that we don't have a global variable

// arrow function
const game = () => {
    let pScore = 0;
    let cScore = 0;

    // start the game
    const startGame = () => {
        const playBtn = document.querySelector('.intro button');
        const introScreen = document.querySelector('.intro');
        const match = document.querySelector('.match');

        playBtn.addEventListener('click', () => {
            introScreen.classList.add('fadeOut');
            match.classList.add('fadeIn');
        });
    };

    const restartGame = (winner) => {
        
        const introScreen = document.querySelector('.intro');
        const match = document.querySelector('.match');
        const playBtn = document.querySelector('.intro button');
        const introHeading = document.querySelector('.intro h1');
        
        pScore = 0;
        cScore = 0;

        match.classList.remove('fadeIn');
        match.classList.add('fadeOut');

        // To give it a little delay
        setTimeout(function(){
            introScreen.classList.remove('fadeOut');
            introScreen.classList.add('fadeIn');
            introHeading.textContent = winner + " has reached maximum wins!";
            playBtn.textContent = "Play again?";
        }, 2000); // 2 seconds
        
        updateScore();

        playBtn.addEventListener('click', () => {
            match.classList.remove('fadeOut');
            introScreen.classList.remove('fadeIn');
            introScreen.classList.add('fadeOut');
            match.classList.add('fadeIn');
            playMatch();
        });
    }

    //Play Match
    const playMatch = () => {
        const options = document.querySelectorAll('.options button');
        const playerHand = document.querySelector('.player-hand');
        const computerHand = document.querySelector('.computer-hand');
        const hands = document.querySelectorAll('.hands img');

        hands.forEach(hand => {
            hand.addEventListener('animationend', function(){
                this.style.animation = '';
            })
        })

        // generate random numbers for computer options
        const computerOptions = ['rock', 'paper', 'scissors'];
        
        options.forEach(options=>{ // with 1 parameter we can get rid of ()
            options.addEventListener('click', function(){ // using function () cause we want 'this' to be bound to each option
                const computerNumber = Math.floor(Math.random() * 3); // Math.random() generates numbers between 0 and 1
                const computerChoice = computerOptions[computerNumber];
                const playerChoice = this.textContent;

                setTimeout(() => {
                    compareHands(playerChoice, computerChoice);
                    // Update images
                    playerHand.src = `./img/${playerChoice}.png`;
                    computerHand.src = `./img/${computerChoice}.png`;

                }, 2000);
                
                // Animation
                playerHand.style.animation = "shakePlayer 2s ease";
                computerHand.style.animation = "shakeComputer 2s ease";
            });
        });
    };

    const updateScore = () => {
        const playerScore = document.querySelector('.player-score p');
        const computerScore = document.querySelector('.computer-score p');
        playerScore.textContent = pScore;
        computerScore.textContent = cScore;
    }

    // will be called in options.forEach
    const compareHands = (playerChoice, computerChoice) => {
        // Update text
        const winner = document.querySelector('.winner');
        // Checking for a tie
        if (playerChoice === computerChoice) {
            winner.textContent = 'It\'s a tie';
            return;
        }
        // Checking for Rock
        if (playerChoice === 'rock') {
            if (computerChoice === 'scissors') {
                winner.textContent = 'Player wins';
                pScore++;
            }else{
                winner.textContent = 'Computer wins';
                cScore++;
            }
        }
        // Checking for paper
        else if (playerChoice === 'paper') {
            if (computerChoice === 'scissors') {
                winner.textContent = 'Computer wins';
                cScore++;
            }else{
                winner.textContent = 'Player wins';
                pScore++;
            }
        }
        // Checking for scissors
        else {
            if (computerChoice === 'rock') {
                winner.textContent = 'Computer wins';
                cScore++;
            }else{
                winner.textContent = 'Player wins';
                pScore++;
            }
        }
        updateScore();

        if (cScore == 10 || pScore == 10) {
            let winner = "";
            if (cScore == 10) {
                winner = "Computer";
            } else {
                winner = "Player"
            }
            restartGame(winner);
        }
        return;
    }

    // Call all the inner functions to get them executed

    startGame();
    playMatch();
};

// call the game function, without this the functions never get called
game();