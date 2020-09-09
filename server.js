const express = require('express');
const app = express();
const ejs = require('ejs').renderFile;
const http = require('http');
const server = http.createServer(app);
const fileUpload = require('express-fileupload')


app.use(fileUpload())
app.engine('html', ejs)
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/', async (req, res) => {
    try{
        const file = req.files.file
        if (file) {

            file.mv(__dirname + '/views/img/' + file.name, e => {
                if (e) {
                    console.log(e);
                }
            })
        }
        else if(file == null) {
            throw new Error (`Image don't selected`)
        }
    }
    catch(error) {
        res.json({message: error.message, status: 403, error: true, data: {}})
    }
  res.send('ok')  
})


server.listen(4000, () => console.log(`server ready with 4000 port`));