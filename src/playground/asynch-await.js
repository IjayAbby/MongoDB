
const add = (a,b) => {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            if (a < 0 || b < 0){
                return reject ('Numbers must be positive')
            }
            resolve (a + b);
        } ,3000 ); 
    })
}

//PROMISES
// const data1 = add(4,5);
// data1.then((sum)=> {
//     return add(sum,10)
// }).then ((sum2) => {
//     return add(sum2,20)
// }).then((sum3) => {
//     console.log('promise',sum3)
// }).catch((e) => {
//     console.log(e);
// })

//ASYNCH -AWAIT

const data2 = async() =>{
    const sum = await add(4,5);
    const sum2 = await add(sum,10);
    const sum3 = await add(sum2,20);
    return sum3;
};

data2().then((result) => {
    console.log('async-await',result);
}).catch((e) => {
    console.log(e);
})
