const promise1 = new Promise((resolve)=>{
    setTimeout(()=>{
        console.log('Promise one');
        resolve(1);
    },2000)
})

const promise2 = new Promise((resolve)=>{
    setTimeout(()=>{
        console.log('Promise two');
        resolve(2);
    },2000)
})

//Promise.all([promise1, promise2]).then((result)=> console.log(result)).catch((er)=>console.log(er));

Promise.race([promise1, promise2]).then((result)=> console.log(result)).catch((er)=>console.log(er));
//as soon as first promise fullfill
