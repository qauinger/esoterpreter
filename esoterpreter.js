import fs from 'fs';
import express from 'express';
import useragent from 'express-useragent';
import expressLayouts from 'express-ejs-layouts';
import path from 'path';

const app = express();
const port = 5503;

var __dirname = path.resolve();

app.use(express.static('res'));

app.use(expressLayouts);
app.set('layout', 'layouts/layout');
app.set('view engine', 'ejs');

app.use(useragent.express());

var langs = null;

fs.readFile('res/langs.json', 'utf8', function (err, data) {
    if (err) throw err;
    langs = JSON.parse(data);
});

app.get('', async (req, res) => {
    res.render('home', {
            title:'Esoterpreter',
            langs: langs
    });
});

app.get('/l/:lang', (req, res) => {
    var langid = req.params["lang"]
    if(Object.keys(langs).includes(langid)) {
        var data = langs[langid];
        res.render('interpreter', {
            title: data['name'] + ' / Esoterpreter',
            langid: langid,
            name: data['name'],
            wiki: data['wiki'],
            helloworld: data['helloworld']
        });
    } else {
        res.redirect('/');
    }
});

app.get('*', (req, res) => {
    res.render('404', {
            title: '404 / Esoterpreter'
    });
});

app.listen(port, () => console.info(`Live on port ${port}.`));
