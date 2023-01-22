//we dont need this anymore since you can now toggle all the 'advanced features' which is the difference between new and old
// secret command which takes you to the old pinball physics page
// document.addEventListener("keydown",(event)=>{
//     if(event.shiftKey && event.altKey && event.code == "KeyO"){
//         window.open("https://jelcraft.tk/pinball-physics-old");
//     }
// });

// turn off contextmenu
let mouseOver;
document.addEventListener('contextmenu', event => {
    if(!mouseOver) return
    event.preventDefault();
});

function toggleAdvanced() {
    if (arguments.length > 0){
      for(var i=0; i < arguments.length; i++)
        {
            let element = document.getElementById(arguments[i]);
            let hidden = element.getAttribute("hidden");
           
            if (hidden) {
               element.removeAttribute("hidden");
            } else {
               element.setAttribute("hidden", "hidden");
            }
        }
    } 
  }