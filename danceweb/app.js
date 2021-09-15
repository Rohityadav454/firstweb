const express = require("express");
const path = require("path");
const app = express();
const port = 80;
const bodyparser = require("body-parser")
var mongoose = require("mongoose")
mongoose.connect('mongodb://localhost/contactdance', {useNewUrlParser: true});

var ContactSchema = new mongoose.Schema({
    name:String,
    phone:String,
    email:String
});

var contact = mongoose.model('contact', ContactSchema);

app.use('/static', express.static('static'));
// Set the template engine as pug
app.set('view engine', 'pug');

// Set the view directory 
app.set('views', path.join(__dirname,'views'))

// our pug demon endpoint
app.get('/',(req,res) =>{
    const prem = { }
    res.status(200).render('home.pug', prem);

});
app.get('/contact',(req,res) =>{
    const prem = { }
    res.status(200).render('contact.pug', prem);

});
app.post('/contact',(req,res) =>{
    var myData = new contact(req.body);
    myData.save().then(()=>{
        res.send("This is saved!")
    }
    ).catch(()=>{
        res.status(400).send("Error")
    });
  

});
app.listen(port,()=>{
    console.log(`The application started successfully on port ${port}`)
});