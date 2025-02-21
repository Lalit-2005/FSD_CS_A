const http = require("http");
const PORT = 3000
const app = http.createServer((req, res) => {
    const users = [];
    if (req.url == "/" && req.method == "GET") {
        res.writeHead(200, {"Content-Type": "application/json"});
        res.write(JSON.stringify("Hello World!!"));
    }
    else if(req.url == "/users" && req.method == "GET") {
        res.writeHead(200, {"Content-Type": "application/json"});
        res.write(JSON.stringify(users));
    }
    else if(req.url == "/user" && req.method == "POST") {
        let body = "";
        req.on("data", (chunk) => {
            body = body + chunk;
        })
        req.on("end", () => {
            const parsedData = JSON.parse(body);
            const {name, email} = parsedData;
            const id = users.length > 0 ? users[users.length - 1].id + 1 : 1001;
            users.push({
                id,
                name,
                email
            });
        })
        res.writeHead(200, {"Content-Type": "application/json"});
        res.write(JSON.stringify("User registered"));
    }
    else {
        res.writeHead(200, {"Content-Type": "application/json"});
        res.write(JSON.stringify("Page Not Found 404"));
    }
})

app.listen(PORT, (err) => {
    try{
        if (err) throw err;
        console.log(`Server is running on port ${PORT}`);
    } catch (error) {
        console.log("server Error:", error.message);
    }
})