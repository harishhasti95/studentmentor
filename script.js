const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { METHODS } = require("http");
app.use(cors());
app.use(bodyParser.json());

let mentors = [
    {
        id: 1,
        name: 'Harish',
        subject: 'Python',
        students: ['Fasos','Kittu']
    },
    {
        id:2,
        name: 'Ram',
        subject: 'Java',
        students: ['Biriyani']
    }
]
var mentors_names = mentors.map(function(a){return a.name})
console.log(mentors_names)
let students = [
    {
        id: 1,
        name: 'Vineeth',
        mentorName: 'Harish',
        subject: 'Insta'
    },
    {
        id: 2,
        name: 'Pradeep',
        mentorName: 'Ram',
        subject: 'JavaScript'
    }
]

console.log('server started')


app.get("/students", (req,res) => {
    res.send(students)
})

app.get("/mentors", (req,res) => {
    res.send(mentors)
})
var isThere=function(arr,find){
    for(let i=0;i<arr.length;i++){
        if(arr[i]==find){
            return true
        }
    }
    return false

}
app.post('/addMentor', (req, res) => {
    console.log(req.body)
    var to_find = req.body.name;
    var isTheres = isThere(mentors_names,to_find);
    if(isTheres){
        for(let i=0;i<mentors.length;i++){
            if(to_find==mentors[i].name){
                mentors[i].students.push(req.body.students)
            }
        }
    }else{
        req.body.id = mentors.length + 1;
        mentors.push(req.body);
        res.json({ message: 'mentor Added' });
    }
    console.log(mentors)
    
})

app.post('/addStudent', (req, res) => {
    console.log(req.body)
    req.body.id = students.length + 1;
    students.push(req.body);
    res.json({ message: 'Students Added' });
})

app.get('/metor_length',(req,res)=>{
    res.json({'lengths': mentors.length})
})

app.get('/stu_length',(req,res)=>{
    res.json({'lengths': students.length})
})

app.post('/update_mentors', (req,res)=>{
    console.log(req.body.id)
    console.log(req.body)
    for(let i=0;i<mentors.length;i++){
        if(req.body.name == mentors[i].name){
            mentors[i] = req.body;
            break;
        }
    }
    res.json({message:"Updated"})
    console.log(mentors);
})


app.post('/delete_mentors', (req,res)=>{
    
    mentors.splice(req.body.id, 1);
    res.json({message:"Deleted"})
    console.log(mentors);
})

app.post('/update_students', (req,res)=>{
    console.log(req.body.id)
    console.log(req.body)
    for(let i=0;i<students.length;i++){
        if(req.body.name == students[i].name){
            students[i] = req.body;
            break;
        }
    }
    res.json({message:"Updated"})
    console.log(students);
})
app.post('/delete_students', (req,res)=>{
    students.splice(req.body.id, 1);
    res.json({message:"Deleted"})
    console.log(students);
})
app.listen(3000);