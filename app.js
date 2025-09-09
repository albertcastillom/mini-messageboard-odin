const express = require("express");
const path = require("node:path");
const indexRouter = require("./routes/indexRouter");

const app = express();

const PORT = 3000;


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);


app.use((err, req, res, next)=> {
    console.error(err);
    res.status(500).send(err);
})

app.listen(PORT, () => {

  console.log(`My first Express app - listening on port ${PORT}!`);
});

