const express = require ('express');
require ('./db/mongoose');

const User = require ('./models/user');
const Task = require ('./models/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());


//PROMISES
// app.post('/users',(req,res) => {
//     const user = new User(req.body);

//     user.save().then(()=> {
//         res.status(201).send(user)
//     }).catch((e) => {
//         res.status(400).send(e)
//     })
// });

//ASYNCH -AWAIT

app.post('/users',async(req,res)=>{
    const user = new User(req.body);

    try {
        await user.save();
        res.status(201).send(user);
    } catch (e){
        res.status(400).send(e)
    }
})

//PROMISE
// app.get('/users',(req,res)=> {
//     User.find({}).then((users)=> {
//         res.send(users)
//     }).catch((e)=> {
//         res.status(500).send(e);
//     });
// });

//ASYNC-AWAIT
app.get ('/users',async(req,res)=>{
    const user= new User(req.body);
    try {
        const users = await User.find({})
        res.send(users)
    } catch (e){
        res.status(500).send(e)
    }
})


//PROMISE
// app.get('/users/:id',(req,res) => {
//     const _id  = req.params.id
//     User.findById(_id).then((user) => {
//         if (!user){
//             return res.status(404).send()
//         }
//         res.send(user)
//     }).catch((e)=> {
//         res.status(500).send()
//     })

// })
//ASYNC-AWAIT

app.get('/users/:id',async(req,res)=>{
    const _id = req.params.id;

    try{
        const user = await User.findById(_id);
        if (!user){
            return res.status(404).send()
        }
        res.send(user)
    } catch (e){
        res.status(500).send()
    }
})

//PROMISES
// app.post('/tasks',(req,res) => {
//     const task = new Task(req.body);

//     task.save().then(()=> {
//         res.status(201).send(task)
//     }).catch((e) => {
//         res.status(400).send(e)
//     })
// });

//Updating User
app.patch('/users/:id',async(req,res) => {
    const updates = Object.keys(req.body);
    const allowedupdates = ['name','email','password','age'];
    const isValidOperator = updates.every((update)=> allowedupdates.includes(update));
    if (!isValidOperator){
        return res.status(400).send({error : 'Invalid updates'})
    };
    
    try { 
        const user = await User.findByIdAndUpdate(req.params.id,req.body,{
            new : true,runValidators : true
        })
        if (!user){
            return res.status(404).send()
        } res.send(user)
    
    } catch (e){
        res.status(400).send(e)
    }    
});

//Update Task
app.patch('/tasks/:id',async(req,res) => {
    const updates = Object.keys(req.body);
    const allowedupdates = ['description','completed'];
    const isValidOperator = updates.every((update)=> allowedupdates.includes(update));
    if (!isValidOperator){
        return res.status(400).send({error : 'Invalid updates'})
    };
    
    try { 
        const task = await Task.findByIdAndUpdate(req.params.id,req.body,{
            new : true,runValidators : true
        })
        if (!task){
            return res.status(404).send()
        } res.send(task)
    
    } catch (e){
        res.status(400).send(e)
    }    
});















//ASYNCH-AWAIT
app.post('/tasks',async(req,res)=>{
    const task = new Task(req.body);
    try {
        const task = await task.save()
        res.status(201).send(task)
    } catch (e){
        res.status(400).send(e)
    }
})



//fetching Tasks
//ASYNCH AWAIT
app.get ('/tasks',async(req,res)=>{
    try {
        const task = await Task.find({})
        res.send(tasks) 
    } catch(e) {
        res.status(500).send(e)
    }
});

//fetch task by id 
//ASYNC AWAIT
app.get('/tasks/:id',async(req,res)=> {
    const _id = req.params.id
    try{
        const task = await Task.findById(_id)
            if (!task){
                return res.status(404).send()
            }
        res.send(task)
    } catch (e){
        res.status(500).send()
    }
})

app.listen(port,() => {
    console.log("server is up on port" + port);
});


