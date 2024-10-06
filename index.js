const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const { check } = require("express-validator");

const app = express();
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://sahara-gee:Linus123@cluster0.0rpyn.mongodb.net/");
const taskSchema ={
  name: {
        type: String,
        required: true
    }
};
const Task = mongoose.model("task", taskSchema);
app.set("view engine", "ejs");

app.get('/', async function(req,res){

    let today = new Date();
    let options = {
        weekday: "long",
        day: "numeric",
        month:"long"
    };
let day = today.toLocaleDateString('en-US', options);
try{ const foundTasks =await Task.find({});
res.render("index",{today: day, tasks: foundTasks});}
catch(err){console.log(err);
    res.status(500).send('Internal Server Error');
}});
app.get('//', async function(req,res){

    const month = new Date();
         month.setMonth(9);
    const monthString = month.toLocaleDateString('default', {month: 'long', year: 'numeric'});

try{ const foundTasks =await Task.find({});
res.render("index",{ month: monthString, tasks: foundTasks});}
catch(err){console.log(err);
    res.status(500).send('Internal Server Error');
}});


app.post("//", async function(req,res){
    const taskName = req.body.newTask;
    if(taskName){
        const task = new Task({
            name: taskName,
        });
        await task.save();
            res.redirect('/');
        }
    else{
        res.redirect('/');
    }
 });

 app.post("/", async function(req,res){
    const taskName = req.body.newTask;
    if(taskName){
        const task = new Task({
            name: taskName,
        });
        await task.save();
            res.redirect('/');
        }
    else{
        res.redirect('/');
    }
 });

 app.post("/delete", async function(req, res){
    console.log("Request Body:", req.body);
    let checkedItemsId = req.body.checkbox;
    if(!checkedItemsId){
        console.log("SORRY, You have to ADD before you can delete");
        return res.status(400),("Bad Request")
    }
    if(!Array.isArray(checkedItemsId)){
        checkedItemsId = [checkedItemsId];
    }

    try{ 
        for(const id of checkedItemsId){
            const deletedTask = await Task.findByIdAndDelete(id);
            if(deletedTask){
                console.log("Deleted:", id);

            }
            else{
                console.log("Not Found:", id);
            }
        }
        res.redirect('/');
        }
        catch(err){
            console.error("Deletion Error:", err); 
            res.status(500).send('Internal Server Error');}
    });
 

 app.listen(process.env.PORT || 3000, function (){
    console.log("Server running at port 3000");
 });