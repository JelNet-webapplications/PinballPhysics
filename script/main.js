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

// translate
let translations = {
    "submitEuros":{
        "en": "submit",
        "nl": "indienen"
    },
    "submitMagnet":{
        "en": "submit",
        "nl": "indienen"
    },
    "submitGravity":{
        "en": "submit",
        "nl": "indienen"
    },
    "buttonAdvanced":{
        "en": "Advanced features",
        "nl": "Geavanceerde functies"
    },
    "magStrengthLabel":{
        "en": "Strength",
        "nl": "Kracht"
    },
    "gravityValLabel":{
        "en": "Strength",
        "nl": "Kracht"
    },
    "doctitle":{
        "en": "Pinball Physics",
        "nl": "Pinball-fysica"
    }
}
function doTranslation(lan){
    setFlagBrightness(lan)
    if(lan == "en"){
        rayOutput.html("Amount: "+rayCount.elt.value);
    } else if(lan == "nl"){
        rayOutput.html("Aantal: "+rayCount.elt.value);
    }
    for(let temp in translations){
        try{
            document.querySelector("#"+temp).innerHTML = translations[temp][lan];
        } catch(error){
            console.error(error);
        }
    }
}
var possibleLanguages = ['en', 'nl'];
function setFlagBrightness(lan){
    let lanid = 'lang'+lan;
    document.getElementById(lanid).style.filter = 'opacity(100%)'
    console.log('%cbrightness.flag.'+lan+' has been set to '+document.getElementById(lanid).style.filter,"color: lightgreen;")
    for(let temp of possibleLanguages){
        if(temp == lan) continue;
        let id = 'lang'+temp;
        document.getElementById(id).style.filter = 'opacity(60%)'
        console.log('%cbrightness.flag.'+temp+' has been set to '+document.getElementById(id).style.filter,"color: green;")
    }
}