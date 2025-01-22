const letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
var charName = document.getElementById('charName').getAttribute('data');
var difficulty = document.getElementById('difficulty').getAttribute('data');
var guess = new Array(charName.length).fill("_");
for(var i = 0; i < charName.length; i++){
    if (charName.toLowerCase().charCodeAt(i) < 97 || charName.toLowerCase().charCodeAt(i) > 122)
        guess [i] = charName[i];
}

var chosenLetters = [];
var originalLifeLeft = (difficulty === "casual")? 15 : (difficulty === "lover")? 10 : 5;
var lifeLeft = originalLifeLeft;
var heartShow = "";
var buttons = document.querySelectorAll(".letter");
const clickedButtons = [];
var selfClick = true;

aMove();
function aMove(b) {
    if(b !== undefined){

        b.setAttribute("disabled", true);
        var isWrong = true;
        for(var i = 0; i < charName.length; i++){

            if (charName[i].toLowerCase() === b.getAttribute("id")){
                guess[i] = charName[i];
                isWrong = false;
            }
        }

        if(isWrong) {
            lifeLeft --;
            if (lifeLeft !== 0)new Audio("./images/short-wrong.MP3").play();
        }
        
        else if(guess.includes("_")) new Audio("./images/short-true.MP3").play();


        if(lifeLeft === 0){
            selfClick = false;
            document.getElementById("over").click();
            new Audio("./images/long-wrong.MP3").play();
        }

        if(!guess.includes("_")){
            document.getElementById("clear").click();
            new Audio("./images/long-right.MP3").play();
        }
    }

    for(var i = 0; i < lifeLeft; i++)
        heartShow += '<img src="images/full-heart.png" alt="Full heart" class="heart"/> ';
    for(var i = lifeLeft; i < originalLifeLeft; i++)
        heartShow += '<img src="images/empty-heart.png" alt="empty heart" class="heart"/> ';
    
    $(".parent-heart").html(heartShow);
    heartShow = ""
    
    var displayGuess = "";
    for(letter of guess){ 
        if(letter === " ") {
            displayGuess += "&nbsp;&nbsp;&nbsp;"; 
        }
        else displayGuess += letter;
    }
    
    $(".guess").html(displayGuess);


}

buttons.forEach((b, index) => b.addEventListener("click", function(){
    if(!clickedButtons.includes(b.getAttribute("id"))) {
        clickedButtons.push(b.getAttribute("id"));
        b.classList.add("clicked");
        aMove(b);
     }
}));

document.addEventListener("keydown", function(event){
    letters.forEach((letter) => {
        if(!clickedButtons.includes(letter) && event.key.toLowerCase() === letter) {
            var b = document.getElementById(event.key.toLowerCase());
            clickedButtons.push(letter);
            b.classList.toggle("clicked")
            aMove(b);
         }
    })
})


$("#over").click(function(){
    if(self-click){
        new Audio("./images/byebye.MP3").play();
    }
    selfClick = true;
})