// todo 1: lees eerst de code door en probeer te begrijpen wat er gebeurd
// todo 2: probeer een example in je database te krijgen. Ik heb de route al aangemaakt...

// we halen express binnen. Hiermee kunnen we REST api's makkelijk aanmaken.
const express = require('express');

// we zetten de connectie met de database op
const mongoose = require('mongoose');
const db = mongoose.connect('mongodb://localhost/examples');

// we registreren een 'schema'
const Example = mongoose.model('Example', {
    title : { type : String },
    description : { type : String },
    code : { type : String }
});


// we maken onze app echt aan
const app = express();

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

// todo 3: zorg ervoor dat dit uit de database komt. Dit doe je als iemand een get doet op /examples
const examples = [
    {
        title : 'npm package installeren',
        description : 'Met NPM kunnen we packages installeren.',
        example : `
    // zorg ervoor dat je in je shell in de goede map zit
    cd into/your/project/folder
    // zo installeren we vervolgens een package in dit project
    npm install mongoose --save
    // je kunt ook 'globaal' packages installeren. Dan zijn ze vervolgens overal te gebruiken
    npm install mongoose -g
    `
    },
    {
        title : 'Git update fork',
        description : 'Soms werk je in een repository die je geforked hebt van iemand anders. Als de originele repository geupdate is, dan wil jij deze nieuwe code waarschijnlijk ook hebben. Gelukkig kan Git voor jou deze wijzigingen gewoon binnen halen.',
        example : `
    // zorg dat je in je shell in de goede map zit
    cd into/cloned/fork-repo
    // voeg de originele repos toe onder de naam upstream (als je dat nog niet hebt gedaan)
    git remote add upstream https://github.com/BerendWeij/NAAM_VAN_REPOS
    // we halen alle info binnen over deze repos
    git fetch upstream
    // zorg ervoor dat je in de juiste branch zit die je wilt updaten
    git checkout master
    // met dit laatste commando voegen we de wijzigingen toe aan je eigen repository
    git merge upstream/master
    `
    }
];

// we regelen onze routes
app.get('/', (req, res) => res.send('Dit is onze REST API'));
app.get('/examples', (req, res) => res.json(examples));

app.post('/examples', (req, res) => {

    // todo 4: zorg ervoor dat we niet deze 'Git test' gebruiken, maar de gegevens die worden gepost
    // todo: het posten doen we straks vanuit React. Maar voor nu kun je Postman gebruiken
    // todo: tip: google op req.body expressjs :)
    const newActor = new Example({
                                     title : 'Git test',
                                     description : 'Dit is een voorbeeld beschrijving',
                                     example : 'voorbeeld code'
                                 });
    newActor.save().then(() => res.json({ saved : true }));
});

// we zeggen dat onze app moet luisteren op poort 3000
app.listen(3000, () => console.log('Example app listening on port 3000!'));

// todo: bonuspunt: zorg ervoor dat je ook een delete kunt doen voor /examples/:exampleID
// todo: bonuspunt: zorg ervoor dat je ook een update kunt doen voor /examples/:exampleID
// todo: probeer de code eens wat netter op te delen (je kunt eens bij deze repos kijken: https://github.com/BerendWeij/2017_MD3_NodeJS)