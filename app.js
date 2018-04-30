const express = require("express");
const hbs = require("hbs");
const fs = require("fs");
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine","hbs");
app.use(express.static(__dirname+'/public'));

app.use((req,res,next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile("app.log",log+"\n",(err) => {
        if(err){
            console.log("Unable to append to app.log");
        }
    });
    next();
});

// app.use((req,res,next) => {
//     res.render("maintenance");
// });

hbs.registerHelper("getCurrentYear", () => {
    return new Date().getUTCFullYear();
});

hbs.registerHelper("screamer", (text) => {
    return text.toUpperCase() ;
})

app.get("/",(req,res)=>{
    res.render("home",{
        pageTitle:"Home page",
        pageFooter:"Powered by Menelaos Nasies ",
        message: "Welcome to our website" 
    });
});

app.get("/about",(req,res)=>{
    res.render("about",{
        pageTitle:"About page",
        pageFooter:"Powered by Menelaos Nasies " 
    });
});

app.get("/projects",(req,res)=>{
    res.render("projects",{
        pageFooter:"Powered by Menelaos Nasies"
    });
});

app.listen(port,() => {
    console.log(`============   Server up and Running   ======  ${port}  ======`);
});