import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

var workTasks = [];
var dailyTasks = [];
var displayDate = new Date().toDateString();

app.get("/", (req, res) => {
  res.render("index.ejs", { today: displayDate });
});

app.get("/work", (req, res) => {
  res.render("work-pane.ejs");
});

app.post("/", (req, res) => {
  dailyTasks.push(req.body["newTask"]);
  res.render("index.ejs", { dailyList: dailyTasks, today: displayDate });
});

app.post("/work", (req, res) => {
  workTasks.push(req.body["newTask"]);
  res.render("work-pane.ejs", { workList: workTasks });
});

app.listen(port, () => {
  console.log(`Server started in ${port}`);
});
