
const http = require("http");
const fs = require("fs");
const path = require("path");
const PORT = 4000;
const server = http.createServer(async(req, res) => {
    res.setHeader("Content-Type","text/html")
    if (req.url === "/") {
       const data= await fetch("https://api.github.com/search/users?q=location:ghaziabad")
       const result=await data.json();
       const newdata=result.items;
       newdata.map((i)=>{
        res.write(`<h2>${i.login}</h2>`)
        res.write(`<img src=${i.avatar_url} width="100" height="100"/>`)
       })
    }
    else{
        res.end("<h1>error message </h1>")
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on port "${PORT}`);
});