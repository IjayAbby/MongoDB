const {MongoClient,ObjectID} = require('mongodb');


const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';





MongoClient.connect(connectionURL, { useNewUrlParser:true},
    (error,client)=> {
        if (error){
            return console.log('Unable to connect to database');
        }
        const db = client.db(databaseName);
        db.collection('users').findOne({_id: new ObjectID("5e4f96529ca88542042eac5e")},
        (error,user)=>{

            if(error){
                return console.log('Unable to fetch user')
            }
            console.log(user);
        })


        
        // db.collection('users').insertOne({

        //     name : 'Ijay',
        //     city : 'Nairobi'
        // });
        

        db.collection('tasks').insertMany([{
            description: 'Exercise',
            completed: true
        },
        {
            description: 'Watch pro sports',
            completed:false
        }
    ],(error,result) => {
        if(error){
            return console.log('Unable to insert tasks')
        }
        console.log(result);

    })

    });
