import express from "express";
import {
  createNote,
  deleteNoteById,
  getAllNotes,
  updateNoteById,
} from "../controllers/notesController.js";

const router = express.Router();

//read
router.get("/", getAllNotes);

//create
router.post("/", createNote);

//update by id
router.put("/:id", updateNoteById);

//delete
router.delete("/:id", deleteNoteById);

export default router;
