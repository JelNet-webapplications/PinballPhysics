// secret command which takes you to the old pinball physics page
document.addEventListener("keydown",(event)=>{
    if(event.shiftKey && event.altKey && event.code == "KeyO"){
        window.open("https://jelcraft.tk/pinball-physics-old");
    }
});

// turn off contextmenu
let mouseOver;
document.addEventListener('contextmenu', event => {
    if(!mouseOver) return
    event.preventDefault();
});