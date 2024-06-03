const http=require('http')

const server=http.createServer((req,res)=>{
    res.writeHead(200,('Content-Type: text/plain'))
    res.write("HELLO WORLD.");
    res.end();
});

PORT=8080

server.listen(PORT,(error)=>{
    if(error){
        console.log("Some error is occuring.");
    }
    else{
        console.log(`Server is listening on port${PORT}`)
    }
})


