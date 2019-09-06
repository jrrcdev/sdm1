const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Todo = mongoose.model("Todo");

router.get("/", function(req, res) {
  try {
    Todo.find({}, (err, data) => {
      if (err) res.status(500).send(err);
      else res.send(data);
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/", function(req, res) {
  try {
    let todo = new Todo({
      ...req.body
    });

    todo.save(async (err, todo) => {
      if (err) res.status(500).send(err);
      else {
        res.send(todo);
      }
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
