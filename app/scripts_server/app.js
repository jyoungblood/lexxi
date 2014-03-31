

app.get('/', function (req, res) {
    res.render('index', {
        title: ''
    });
});


app.get('/styleguide', function (req, res) {
    res.render('styleguide', {
        title: 'styleguide'
    });
});
