const express = require ('express');
require ('./db/mongoose');

const userRouter = require ('./router/user');
const taskRouter = require ('./router/task');

const app = express();
const port = process.env.PORT || 3000;

// app.use((req,res,next)=> {
//     if (req.method === 'POST'){
//     res.status(503).send('Site is currently down.Contact customer Care!')
//     }
//     next()
// });


app.use(express.json());
app.use(userRouter);
app.use(taskRouter);


app.listen(port,() => {
    console.log("server is up on port" + port);
});

// const bcrypt = require('bcryptjs');

// const myFunction = async () => {
//     const password = 'seattle';
//     const hashedpassword = await bcrypt.hash(password,8);
//     console.log(password);
//     console.log(hashedpassword);

//     const isMatch = await bcrypt.compare('seattle1',hashedpassword);
//     console.log(isMatch);


// }
// myFunction();

//using jsonwebtoken
const jwt = require('jsonwebtoken');
const myFunction = async() => {
    const token = await jwt.sign({_id : 'data1'},'lovepizza',{expiresIn:'3 days'});
    console.log(token);
    const data = await jwt.verify(token,'lovepizza');
    console.log(data)
}
myFunction();