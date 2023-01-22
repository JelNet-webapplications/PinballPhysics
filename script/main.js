//we dont need this anymore since you can now toggle all the 'advanced features' which is the difference between new and old
// secret command which takes you to the old pinball physics page
// document.addEventListener("keydown",(event)=>{
//     if(event.shiftKey && event.altKey && event.code == "KeyO"){
//         window.open("https://jelcraft.tk/pinball-physics-old");
//     }
// });

// turn off contextmenu
//changed mouseOver to mousedOver as mouseOver is a p5 function and so the name is already used.
let mousedOver;
document.addEventListener('contextmenu', event => {
    if(!mousedOver) return
    event.preventDefault();
});
