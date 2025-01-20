const letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

var buttons = document.querySelectorAll(".letter");

document.addEventListener("keydown", function(event){
    letters.forEach((letter) => {
        if(event.key.toLowerCase() === letter) {
            var b = document.getElementById(event.key.toLowerCase());
            b.click();    
            b.classList.toggle("clicked")
         }
    })
})