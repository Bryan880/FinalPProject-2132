//Word to guess
const word = document.getElementById('word');
//Hint to help player
const hints = document.getElementById('hint');
//Hangman Image
const img = document.getElementById('imgHang');
//Letters already guessed
const lettersGuessed = document.getElementById('guessed-letters');
//Remaining letters to guess to win
const remainingGuesses = document.getElementById('wrongGuess');
//Limit of incorrect guesses
const guessLimit = document.getElementById('guesses');
//Pop Up
const popUpLose = document.getElementById('popup-lost');
const popUpWin = document.getElementById('popup-win');
//Word displayed in losing popUp
const lostWord = document.getElementById('loseWord');
//Reset Buttons
const reset = document.getElementById('reset');
const resetW = document.getElementById('resetWin');



let selectedWord = [];
let answerWord = [];
let lettersChecked = [];
let guesses = 0;
let imgCount = 1;


//Generate Random Word from Array
let answer = wordList[Math.floor(Math.random() * wordList.length)];
//Hint if/else statement
if(answer === "door"){
    hints.innerHTML = "Walk through these everyday";
}else if(answer === "watch"){
    hints.innerHTML = "Helps you tell time on the go";
}else if(answer === "sunset"){
    hints.innerHTML = "Beautiful to watch on a date";
}else if(answer === "automobile"){
    hints.innerHTML = "Helps you get from point A to point B";
}else if(answer === "table"){
    hints.innerHTML = "You sit around this when eating meals";
}else if(answer === "book"){
    hints.innerHTML = "Used to tell stories";
}else if(answer === "motor"){
    hints.innerHTML = "Another word for engine";
}else if(answer === "keyboard"){
    hints.innerHTML = "Without it, you would struggle to play this game";
}else if(answer === "match"){
    hints.innerHTML = "Would help you light a fire";
}else if(answer === "alphabet"){
    hints.innerHTML = "From A to Z";
}else if(answer === "broken"){
    hints.innerHTML = '"I dropped my phone, and now its..."';
}else if(answer === "picture"){
    hints.innerHTML = "Framed and put on the wall";
}else if(answer === "trail"){
    hints.innerHTML = "You walk on this while hiking";
}else if(answer === "closet"){
    hints.innerHTML = "A great place to keep your clothes";
}else if(answer === "return"){
    hints.innerHTML = "Bring something back";
}else if(answer === "window"){
    hints.innerHTML = "Open this for a breeze";
}else if(answer === "chalkboard"){
    hints.innerHTML = "Can be seen behind a teacher";
}else if(answer === "windy"){
    hints.innerHTML = "A storm can cause it to become very...";
}else if(answer === "train"){
    hints.innerHTML = "The Polar Expressed takes place on it";
}else if(answer === "hockey"){
    hints.innerHTML = "A sport played on ice";
}else if(answer === "pencil"){
    hints.innerHTML = "Made of wood and lead";
}else if(answer === "montreal"){
    hints.innerHTML = "Home of the Habs";
}else if(answer === "french"){
    hints.innerHTML = "Paris";
}else if(answer === "gemstone"){
    hints.innerHTML = "A piece of mineral crystal";
}



//Replace each individual letter with "_"
for(let i = 0; i < answer.length; i ++){
    selectedWord.push("_");
}
word.innerHTML = selectedWord.join(' ');

//Checks position of letters
function wordLetters(letter){
    let letterPosition = new Array();
    for (let i = 0; i < answer.length; i ++){
        if(answer[i] === letter)
        letterPosition.push(i);
    }
    return letterPosition;
}

//Counts how many '_''s are left in word (Shows how many letter left before complete)
function lettersToGuess(){
    let remaining = 0;
    for(i in selectedWord){
        if(selectedWord[i] === '_')
        remaining++;
    }
    return remaining;
    
}

//User input from Keyboard
document.onkeyup = function(e){
    //Checking to make sure that the key pressed is actually a letter
    if((e.keyCode >= 65 && e.keyCode <= 90) || e.keyCode >= 97 && e.keyCode <= 122){
        let letter = e.key;
        let guessedL = letter;
        let letterPosition = wordLetters(guessedL);

        if(letterPosition.length){
            for( let i = 0; i < letterPosition.length; i++){
                selectedWord[letterPosition[i]] = guessedL;
            }
            word.innerHTML = selectedWord.join(' ');
        } else {
            //If the letter has already been seen, don't do show in wrong guesses
            if(!lettersChecked.includes(letter)){
                lettersChecked.push(letter);
                lettersGuessed.innerHTML += guessedL + ' , ';
                guesses++
                remainingGuesses.innerHTML = guesses;
                imgCount++;
                img.src = `images/hangman/hang-${imgCount}.png`;
                console.log(lettersChecked);
            }
            //If user guesses 6 incorrect times
            if(guesses === 6){
                //Show popUp to display lose
                $('#popup-lost').animate({
                    opacity: .96
                }, 500);
                $('#popup-lost').css('display', 'block');
                //Change font color to Red
                guessLimit.classList.add('error');
                //Change innerHtml to tell user they ran out of guesses
                guessLimit.innerHTML = 'Ran out of guesses. You Lose';
                //Display current word in popUp
                $('#loseWord').animate({
                    fontSize: '14px',
                    letterSpacing: '4px'
                }, 500);
                lostWord.innerHTML = ` ${answer}`;
                //Don't allow user to continue to guess letters
                document.onkeyup = false;

                //Function to reload page on click 'Reset'
                function handleClick(){
                    window.location.reload();
                }
                reset.addEventListener('click', handleClick);
            }
        }
        
        //If all '_' have been replace with letters
        if(lettersToGuess() === 0){

            $('#popup-win').animate({
                opacity: .96
            }, 500);
            //Show winning popUp!
            $('#popup-win').css('display', 'block');
            //popUpWin.style.display = 'block';
            //Disable user from guessing more letters
            document.onkeyup = false;
            //Function to reload page on click 'Play Again'
            function handleClick(){
                window.location.reload();
            }
            resetW.addEventListener('click', handleClick);
           }
        }
}
