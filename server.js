const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let connectTODB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://shaikchandbasha:Basha173@cluster0.0lsxj1l.mongodb.net/todos?retryWrites=true&w=majority"
    );
    console.log("successfully connected to database");
  } catch (error) {
    console.log(error);
    console.log("unable to connect to database");
  }
};

const Todo = mongoose.model("Todo", {
  text: String,
});

app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post("/todos", async (req, res) => {
  const newTodo = new Todo({ text: req.body.text });
  await newTodo.save();
  res.json(newTodo);
});

app.delete("/todos/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Todo deleted" });
});

app.listen(7865, () => {
  console.log("successfully ported ");
});
connectTODB();
