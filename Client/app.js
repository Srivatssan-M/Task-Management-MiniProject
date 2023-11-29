const express = require("express");
const app = express();
app.use("/", express.static('public'))
const cors = require("cors")
require("colors");

app.use(cors())





app.listen(4082, () => {
    console.log("Front-end port listening on port 4082.....".yellow.underline.bold)
})