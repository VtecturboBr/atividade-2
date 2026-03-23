const dotenv = require("dotenv");
dotenv.config({quiet:true});

const express = require("express");

const path = require("path");

const app = express();

const PORT = process.env.PORT;

app.listen(PORT, function () {
    console.log(`Rodando em http://localhost: ${PORT}`);
});

const publicPath = path.join(__dirname, "public");
const pagesPath = path.join(publicPath, "pages");

app.get("/", function(req, res){
    const filePath = path.join(pagesPath, "index.html");
    res.sendFile(filePath);
});

app.use("/assets", express.static(path.join(publicPath,"assets")));

