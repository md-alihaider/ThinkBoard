import express from "express";
import {
  createNote,
  deleteNoteById,
  getAllNotes,
  getNoteById,
  updateNoteById,
} from "../controllers/notesController.js";

const router = express.Router();

//read
router.get("/", getAllNotes);

//read by id
router.get("/:id", getNoteById);

//create
router.post("/", createNote);

//update by id
router.put("/:id", updateNoteById);

//delete
router.delete("/:id", deleteNoteById);


export default router;
