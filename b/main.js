"use strict";

let buttons = document.getElementById("buttons")
let gallary = document.getElementById("images")
let allimages = document.getElementsByTagName("img");

let images = [
    {
        name: "Cat",
        tags: ["Animal"],
        src: 'img/smugcat.png'
    },
    {
        name: "Nature",
        tags: ["Nature"],
        src: 'img/Nature.jpg'
    },
    {
        name: "Animal in nature",
        tags: ["Animal", "Nature"],
        src: 'img/hqdefault.jpg'
    },
    {
        name: "Tom and Jerry",
        tags: ["Animal", "Cartoon"],
        src: 'img/21.jpg'
    },
    {
        name: "Car",
        tags: ["Vehicle"],
        src: 'img/senna.jpg'
    },
    {
        name: "The Mystery Machine",
        tags: ["Vehicle","Cartoon"],
        src: 'img/mystery.jpg'
    },
    
];

let alltags = [];



// fer í gegnum alla objecta í images listanum og býr til mynd og byrtir það á browserinn.
images.forEach(image => {
    let img = new Image(200, 200);
    img.src = image.src;
    img.dataset.tags = image.tags;
    gallary.appendChild(img);

    // fer í gengum hvert tags á image  
    image.tags.forEach(tag => {
        if (!alltags.includes(tag)) { // finnur hvort að tagið er ekki í listanum 
            alltags.push(tag);
        }
    });
})

function Siblings(button) {

	let siblings = [];
	let sibling = button.parentNode.firstChild; //finnur fyrsta sibling elementið frá parent elementinu.

	while (sibling) { //keyrir þanngað til að það finnur ekki annað sibling
		if (sibling.nodeType === 1 && sibling !== button) { // gáir hvort að sibling er element og hvort að það sé ekki takkin sem notandi ýtti á
			siblings.push(sibling);
		}
        sibling = sibling.nextSibling; // fer á næsta sibling
	}

	return siblings;

};


let button = document.createElement("button");
button.textContent = "Show All";
button.classList = "active";
buttons.appendChild(button);
// keyrir fall ef það er smelt á takkan
button.addEventListener("click", function() {
    button.classList = "active";
    let siblings = Siblings(this); // finnur siblings elementinn
    
    siblings.forEach(sibling =>  { // fer í gegnum öll sibling elementinn og tekur active classan af
        sibling.classList.remove("active");
    });
    // for loopa sem fer í gegnum allar myndir  
    for (let i = 0; i < allimages.length; i++) {
       allimages[i].classList = "show"; // setur classið show á allar myndir
    }
    
});
// fer í gegnum öll tags í fylkinu
alltags.forEach(tag => { 
    let button = document.createElement("button");
    button.textContent = tag;
    // keyrir fall ef það er smelt á takkan
    button.addEventListener("click", function() {
        button.classList = "active";
        let siblings = Siblings(this);
        
        siblings.forEach(sibling => {
            sibling.classList.remove("active");
        
        });
        for (let i = 0; i < allimages.length; i++) {
            // finnur hvort að data-tags á img elementinu er með tagið sem foreach loopan er á.
            if (allimages[i].dataset.tags.includes(tag)) {           
                allimages[i].classList = "show";
            }
            else {
                allimages[i].classList = "hide";
            }
            
        }

    });    
    buttons.appendChild(button);
    
});
