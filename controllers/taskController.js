const { ObjectId } = require("mongodb");
const { getDb } = require("../db");

const getTasks = async (req, res) => {
  const db = getDb();
  const userId = req.userId;
  const query = { userId: new ObjectId(userId) };
  const tasks = await db.collection("task").find(query).toArray();
  res.status(200).json(tasks);
};

const createTask = async (req, res) => {
  const db = getDb();
  const userId = req.userId;
  const task = {
    userId: new ObjectId(userId),
    createdDate: new Date(),
    updatedDate: new Date(),
    isDone: false,
    ...req.body,
  };
  const result = await db.collection("task").insertOne(task);
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
