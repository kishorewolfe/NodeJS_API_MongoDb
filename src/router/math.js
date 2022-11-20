const calcFunc = (value1 ,value2 = 10)=>{
    const ans = value1 +value2;
    return ans;

}
const farenToCelsius =(temp)=>{
    const value = (temp -32) /1.8
    return value
}

const celsiusToFaren =(temp)=>{
    const value2=(temp *1.8)+32
    return value2
}

const add =(a,b)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
                if(a < b){
                    return reject("B is Greater Than ")
                }
               
        })
        resolve(a+b);
    })
}
module.exports = {calcFunc,farenToCelsius,celsiusToFaren,add}