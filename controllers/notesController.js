const { ObjectId } = require("mongodb");
const { getDb } = require("../db");

const getNotes = async (req, res) => {
  const db = getDb();
  const userId = req.userId;
  const query = {
    userId: new ObjectId(userId),
  };
  const notes = await db.collection("notes").find(query).toArray();
  res.status(200).json(notes);
};

const createNote = async (req, res) => {
  const db = getDb();
  const userId = req.userId;
  const note = {
    userId: new ObjectId(userId),
    createdDate: new Date(),
    updatedDate: new Date(),
    ...req.body,
  };
  const result = await db.collection("notes").insertOne(note);
  res.status(201).json(result);
};

const updateNote = async (req, res) => {
  const db = getDb();
  const { id } = req.params;
  const result = await db
    .collection("notes")
    .updateOne({ _id: new ObjectId(id) }, { $set: req.body });
  res.status(200).json(result);
};

const deleteNote = async (req, res) => {
  const db = getDb();
  const { id } = req.params;
  const result = await db
    .collection("notes")
    .deleteOne({ _id: new ObjectId(id) });
  res.status(200).json(result);
};

module.exports = { getNotes, createNote, updateNote, deleteNote };
