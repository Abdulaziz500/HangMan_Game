// Letters
const letters = "abcdefghijklmnopqrstuvwxyz";

// Get Array From Letters
let lettersArray = Array.from(letters);

// Select Letters Container
let lettersContainer = document.querySelector(".letters");

// Generate Letters
lettersArray.forEach(letter => {
    // Create Span
    let span = document.createElement("span");

    // Create Letter Text Node
    let theLetter = document.createTextNode(letter);

    // Append The Letter To Span
    span.appendChild(theLetter);

    // Add Class On Span
    span.className = "letter-box";

    // Append Span To The Letters Container
    lettersContainer.appendChild(span);
});

//*********************************************************************************/
// Object Of Words + Categories
/*const words = {
    programming: ["php","javascript","go","scala","fortran","r","mysql","python"],
    clubs: ["Barcelona","Real Madrid","Liverpool","Manchester City","Inter Milan","Tottenham","Napoli"],
    people: ["Albert Einstein","Hitchcock","Alexander","Cleopatra","Mahatma Ghandi"],
    countries: ["Syria","Palestine","Yemen","Egypt","Bahrain","Qatar","Saudi Arabia"]
};*/

//*********************************************************************************/
async function fetchData() {
    try {
        let jsData = await fetch("./main.json");
        let data = await jsData.json();
        console.log(data);

        // Get Random Property
        let allKeys = Object.keys(data);
        console.log(allKeys);

        // Random Number Depend On Keys Length
        let randomPropNumber = Math.floor(Math.random() * allKeys.length);

        // Category
        let randomPropName = allKeys[randomPropNumber];

        // Category Words
        let randomPropValue = data[randomPropName];

        // Random Number Depend On Words
        let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);

        // The Chosen Word
        let randomValueValue = randomPropValue[randomValueNumber];
        console.log(randomValueValue);

        // Set Category Info
        document.querySelector(".game-info .category span").innerHTML = randomPropName;

        // Select Letters Guess Element
        let lettersGuessContainer = document.querySelector(".letters-guess");

        // Convert Chosen Word To Array
        let lettersAndSpace = Array.from(randomValueValue);

        // Create Spans Depened On Word
        lettersAndSpace.forEach(letter => {

            // Create Empty Span
            let emptySpan = document.createElement("span");

            // If Letter Is Space
            if(letter === ' '){
                // Add Class To The Span
                emptySpan.className = 'with-space';
            }

            // Append Span To The Letters Guess Container
            lettersGuessContainer.appendChild(emptySpan);
        });

        // Select Guess Spans
        let guessSpans = document.querySelectorAll(".letters-guess span");

        // Set Wrong Attempts
        let wrongAttempts = 0;

        // Set Number Of Letters In The Letters-guess
        let numberOfLettersInSpans = 0;

        //if span is space then increase numberOfLettersInSpans
        guessSpans.forEach((span)=> {

                if(span.classList.contains('with-space')){
                        numberOfLettersInSpans++;
                        console.log(numberOfLettersInSpans);
                }
        });

        // Select The Draw Element
        let theDraw = document.querySelector(".hangman-draw");

        // Handle Clicking On Letters
        document.addEventListener("click",(e) => {
                // Set The Choose Status
                let theStatus = false;

                if(e.target.className === 'letter-box'){
                    e.target.classList.add("clicked");

                    // Get Clicked Letter
                    let theClickedLetter = e.target.innerHTML.toLowerCase();
                    console.log(theClickedLetter);

                    // The Chosen Word
                    let theChosenWord = Array.from(randomValueValue.toLowerCase());
                    console.log(theChosenWord);

                    theChosenWord.forEach((wordLetter,wordIndex) => {
                        // If The Clicked Letter Equal To One Of The Chosen Word Letter
                        if(theClickedLetter == wordLetter){
                            // Set Status To Correct
                            theStatus = true;

                            // Loop On All Guess Spans
                            guessSpans.forEach((span,spanIndex) => {
                    
                                if(wordIndex === spanIndex){
                                    span.innerHTML = theClickedLetter;
                                    numberOfLettersInSpans++;
                                    console.log(numberOfLettersInSpans);
                                }
                            });
                        }
                    });
    
                    // Outside Loop
         
                    // If Letter Is Wrong
                    if(theStatus != true){

                        // Increase The Wrong Attempts
                        wrongAttempts++;

                        // Add Class Wrong On The Draw Element
                        theDraw.classList.add(`wrong-${wrongAttempts}`);

                        // Play Fail Sound
                        document.getElementById("fail").play();

                        if(wrongAttempts === 8){
                            endGame();

                            lettersContainer.classList.add("finished");
                        }

                    }else {
                        // Play Success Sound
                        document.getElementById("success").play();
                    }

                    //if you completed the letters
                    if(numberOfLettersInSpans === theChosenWord.length) {
                        YouWin();
                        lettersContainer.classList.add("finished");
                    }
                }
        });


        // End Game Function
        function endGame(){
            // Create Popup Div
            let div = document.createElement("div");

            // Create Text
            let divText = document.createTextNode(`Game Over, The Word Is ${randomValueValue}`);

            // Append Text To Div
            div.appendChild(divText);

            // Add Class On Div
            div.className = 'popup';

            // Append To The Body
            document.body.appendChild(div);
        }

        // Win function
        function YouWin(){

            let arrayFromTheDraw = Array.from(theDraw.classList);

            for(let i = 0; i<arrayFromTheDraw.length;i++){

                if(arrayFromTheDraw[i] === arrayFromTheDraw[arrayFromTheDraw.length-1]){

                    console.log(arrayFromTheDraw);
                    console.log(arrayFromTheDraw[i]);

                    if(arrayFromTheDraw[i] === "wrong-1" || arrayFromTheDraw[i] === "wrong-2" || arrayFromTheDraw[i] === "wrong-3") {
                        // Create Popup Div
                        let div = document.createElement("div");
    
                        // Create Text
                        let divText = document.createTextNode(`Congratulations You Won!!!\nWrong Attempts: ${arrayFromTheDraw[i].substring(6)}\nYour Level: Professional`);

                        // Append Text To Div
                        div.appendChild(divText);

                        // Add Class On Div
                        div.className = 'popup';

                        // Append To The Body
                        document.body.appendChild(div);

                    }else if(arrayFromTheDraw[i] === "wrong-4" || arrayFromTheDraw[i] === "wrong-5" || arrayFromTheDraw[i] === "wrong-6") {
                        // Create Popup Div
                        let div = document.createElement("div");
    
                        // Create Text
                        let divText = document.createTextNode(`Congratulations You Won!!!\nWrong Attempts: ${arrayFromTheDraw[i].substring(6)}\nYour Level: Medium`);

                        // Append Text To Div
                        div.appendChild(divText);

                        // Add Class On Div
                        div.className = 'popup';

                        // Append To The Body
                        document.body.appendChild(div);

                    }else if(arrayFromTheDraw[i] === "wrong-7") {
                        // Create Popup Div
                        let div = document.createElement("div");
    
                        // Create Text
                        let divText = document.createTextNode(`Congratulations You Won!!!\nWrong Attempts: ${arrayFromTheDraw[i].substring(6)}\nYour Level: Beginner`);

                        // Append Text To Div
                        div.appendChild(divText);

                        // Add Class On Div
                        div.className = 'popup';

                        // Append To The Body
                        document.body.appendChild(div);

                    }else { // if he didn't make mistakes
                        // Create Popup Div
                        let div = document.createElement("div");
    
                        // Create Text
                        let divText = document.createTextNode(`Congratulations You Won!!!\nWrong Attempts: 0\nYour Level: Ultimate`);

                        // Append Text To Div
                        div.appendChild(divText);

                        // Add Class On Div
                        div.className = 'popup';

                        // Append To The Body
                        document.body.appendChild(div);
                    }
                }

            }
        }

    }catch(reason){
        console.log(reason);
    }
}


fetchData();