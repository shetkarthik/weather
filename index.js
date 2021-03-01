const http = require("http");
const fs = require("fs");
var requests = require("requests");
  
const indexFile = fs.readFileSync("index.html","utf-8");
const replaceVal = (tempVal,orgVal)=>{
    let temparature = tempVal.replace("{%tempval%}",orgVal.main.temp);
     temparature = temparature.replace("{%tempmin%}",orgVal.main.temp_min);
     temparature = temparature.replace("{%tempmax%}",orgVal.main.temp_max);
     temparature = temparature.replace("{%location%}",orgVal.name);
     temparature = temparature.replace("{%country%}",orgVal.sys.country);
     return temparature;
}
const server = http.createServer((req,res)=>{
    if(req.url =="/"){
        requests("http://api.openweathermap.org/data/2.5/weather?q=Bangalore&appid=a90b2b3667ef1f73e2775a95b9023708")
        .on('data',(chunk) => {
            const objdata = JSON.parse(chunk);
            const arrData = [objdata]
        //   console.log(arrData[0].main.temp)
           const realTimeData = arrData
           .map((val)=>replaceVal(indexFile,val))
           .join("");
            // console.log(realTimeData);
            res.write(realTimeData);
        })
        .on('end', (err) => {
          if (err) return console.log('connection closed due to errors', err);
          res.end();
        });
        
    }    
})
server.listen(8000,"127.0.0.1");

