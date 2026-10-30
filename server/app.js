const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.static(path.join(__dirname, "../client")));

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Lily system running on port ${PORT}`);
});