const http = require('http')
const fs=require('fs')
const port= 3000

var days =['/monday','/tuesday','/wednesday','/thursday','/friday','/saturday','/sunday']
const server = http.createServer(function(req,res){
console.log("1. "+req.url)
    if (req.url === "/"){
        console.log("inside if")
        res.writeHead(200,{'Content-type':'text/html'})
       fs.readFile('index.html',function(error,data){
           if(error){
               res.writeHead(404)
               res.write('file not found')
           }
           else{
               res.write(data)
           }
           res.end();
       })
    }
    //link .css files
    else if(req.url.match("\.css$")){
        // console.log("in");
        var fileStream= fs.createReadStream("\styles.css")
        res.writeHead(200,{'Content-type':'text/css'})
        fileStream.pipe(res);
    }
    //link .js files
    else if(req.url.match("\.js$")){
        var fileStream= fs.createReadStream("\date.js")
        res.writeHead(200,{'Content-type':'application/javascript'})
        fileStream.pipe(res);
    }
    else if(days.indexOf(req.url) !== -1){ 
        console.log("2. "+ req.url);
        res.writeHead(200,{'Content-type':'text/html'})
        fs.readFile('date.html',function(error,data){
                if(error){
                   res.writeHead(404)
                   res.write('file not found')
               }
               else{
                   
                   res.write(data)
               }
               res.end();
        })
    } 
    else{
       console.log("page not found")
       res.end("page not found, please check the URL")

    }
})

server.listen(port,function(error){
    if (error){
        console.log('something is wrong', error)
    }
    else{
        console.log('server is listening on port ' + port)
    }
})