import express from 'express'
import { createNote, deleteNoteById, getAllNotes, getNoteById, updateNoteById } from '../controllers/notesController'

const router = express.Router()

//read
router.get("/", getAllNotes)

//create
router.post("/", createNote)

//read by id
router.get("/:id", getNoteById)

//delete
router.delete("/:id", deleteNoteById)

//update by id
router.put("/:id", updateNoteById)

export default router