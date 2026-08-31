import Note from "../models/Note.js";

export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getAllNotes controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = new Note({ title, content });
    const savedNote = await note.save();
    res.status(201).json({
      message: "Note Created Successfully",
      data: savedNote,
    });
  } catch (error) {
    console.error("Error in createNote controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateNoteById = async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true },
    );
    if (!updatedNote)
      return res.status(404).json({ message: "Note not found" });
    res.status(200).json({
      message: "Note updated successfully",
      data: updatedNote,
    });
  } catch (error) {
    console.error("Error in updateNoteById controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteNoteById = async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote)
      return res.status(404).json({ message: "Note not found" });
    res.status(200).json({
      message: "Note Deleted Successfully",   
      data: deletedNote,
    });
  } catch (error) {
    console.error("Error in deleteNoteById controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
