const searchBtn = document.getElementById('searchBtn');
const nextHeroBtn = document.getElementById("refreshButton");
const heronameInput = document.getElementById('heroName');  
const heroDetailsDiv = document.getElementById('heroContainer');

const randomSuperheroDetails = (id) => {
    fetch(`https://superheroapi.com/api.php/6d98916422e75d8a103b7da22a7a8c1b/${id}`)
    .then(response => response.json())
    .then(json => {
        powerstats(json);
    })
}

const userSuperheroDetails = (heroname) => {
    fetch(`https://superheroapi.com/api.php/6d98916422e75d8a103b7da22a7a8c1b/search/${heronameInput.value}`)
    .then(response => response.json())
    .then(json => {
        if (json.results && json.results.length > 0) {
            const superHero = json.results[0];
            powerstats(superHero);
        }
        else {
            heroDetailsDiv.innerHTML = '<p>Superhero not found. Please try a different name.</p>';
        }
    })
}

const randomHero = () => {
    let hero = Math.ceil(Math.random() * 731);
    return hero;
}

const powerstats = (superhero) => {

    const superHeroImage = `<img src="${superhero.image.url}">`;
    const superHeroName = `<h1>${superhero.name}</h1>`;

    const superHeroStats = Object.keys(superhero.powerstats).map(stat => {
        return `<p>${stat.toUpperCase()}: ${superhero.powerstats[stat]}</p>`
    }).join('');

    heroDetailsDiv.innerHTML = `${superHeroName} ${superHeroImage} ${superHeroStats}`;
}

nextHeroBtn.onclick = () => randomSuperheroDetails(randomHero());
searchBtn.onclick = () => userSuperheroDetails(heronameInput.value);