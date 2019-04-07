"use strict"

let people = [
    {                                              
        name: 'Casey',                               
        score: 60
    },
    {
        name: 'Camille',
        score: 80
    },
    {
        name: 'Gordon',
        score: 75
    },
    {
        name: 'Nigel',
        score: 120
    },
    {
        name: 'konni',
        score: 150
    }
];

let rows = [];
let min = document.getElementById("value-min");
let max = document.getElementById("value-max");
let list = document.getElementById("listi");

function makeRows() {
    // fer í gegnum hverja manneskju í people fylkinu
    people.forEach(function(person) {
        let row = document.createElement("li"); // býr til li element utan um þá
        let name = document.createElement("li") // býr til li element fyrir nafnið
        name.textContent = person.name;
        let score = document.createElement("li"); // bæyr til li element fyrir scoreið
        score.textContent = person.score;
        // setur li elementinn fyrir nafnið og scorið inn í row 
        row.appendChild(name);
        row.appendChild(score);
        // setur person sem er object með nafnið og scoreið á manneskjuni og row elementið í object
        rows.push({
            person: person,
            element: row
        });   
    });
}

function appendRows() {
    // býr til ul element
    let ul = document.createElement("ul");
    // fer í gegnum fylkið rows og setur row elementið í ul elementið
    rows.forEach(function(row) {
       ul.appendChild(row.element); 
    })
    list.appendChild(ul);
}

function update(min, max) {
    // loopar í gegnum öll rows
    rows.forEach(function(row) {
        // finnur hvort að scoreið hjá manneskjunni er stærra en min eða minna en max 
        if (row.person.score >= min && row.person.score <= max) {
            row.element.style.display = "block"; // byrtir elementið
        } else {
            row.element.style.display = "none";  // felur elemetið
        }
    });
}


slider = document.getElementById('slider');
// búa til slider
noUiSlider.create(slider, {
    range: {
        'min': 0,
        'max': 150
    },
    start: [65,90],
    connect: true,

    handles: 2,

    margin: 20,
    step: 1
});
// þegar sliderinn update-ast keyrir hann fall
slider.noUiSlider.on("update", function() {
    let value = slider.noUiSlider.get(); // sækir fylki með staðsetningu á sider handföngunum 
    min.value = value[0]; // fær töluna á fyrsta handfanginu á slidernum
    max.value = value[1]; // fær töluna á seinna handfanginu á slidernum
    update(min.value, max.value); //  kallar í update fallið og sendir inn min.value og max.value
})
makeRows();

appendRows();
update(min.value, max.value);