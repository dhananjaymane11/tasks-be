const { ObjectId } = require("mongodb");
const { getDb } = require("../db");

const getTasks = async (req, res) => {
  const db = getDb();
  const tasks = await db.collection("task").find().toArray();
  res.status(200).json(tasks);
};

const createTask = async (req, res) => {
  const db = getDb();
  const result = await db.collection("task").insertOne(req.body);
  res.status(201).json(result);
};

const updateTask = async (req, res) => {
  const db = getDb();
  const { id } = req.params;
  const result = await db
    .collection("task")
    .updateOne({ _id: new ObjectId(id) }, { $set: req.body });
  res.status(200).json(result);
};

const deleteTask = async (req, res) => {
  const db = getDb();
  const { id } = req.params;
  const result = await db
    .collection("task")
    .deleteOne({ _id: new ObjectId(id) });
  res.status(200).json(result);
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
