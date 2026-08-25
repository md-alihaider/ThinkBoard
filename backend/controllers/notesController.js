export const getAllNotes = async (req, res) => {
  res.status(200).send("You just fetched all notes");
};

export const createNote = async (req, res) => {
  res.status(200).send("You just created a note");
};

export const getNoteById = async (req, res) => {
  res.status(200).send(`You just fetched a note with id: ${req.params.id}`);
};

export const deleteNoteById = async (req, res) => {
  res.status(200).send(`You just deleted a note with id: ${req.params.id}`);
};

export const updateNoteById = async (req, res) => {
  res.status(200).send(`You just updated a note with id: ${req.params.id}`);
};