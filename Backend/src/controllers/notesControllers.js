import Note from "../models/Note.js"

export const getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find().sort({createdAt: -1})
        res.status(200).json(notes)
    } catch (error) {
        res.status(500).json({message: "Error fetching notes"})
    }
}
export const getNotesById = async (req,res) => {
    try {
        const id = req.params.id
        const note = await Note.findById(id)
        if (!note) {
            return res.status(404).json({message: "Note not found"})
        }
        res.status(200).json(note)
    } catch (error) {
        res.status(500).json({message: "Error fetching note"})
    }
}
export const createNote = async (req, res) => {
    try {
        const {title, description} = req.body
        const newNote = new Note({title, description})
        await newNote.save()
        res.status(201).json({message: "Note created successfully"})
    } catch (error) {
        res.status(500).json({message: "Error creating note"})
    }
}
export const updateNote = async (req, res) => {
    try {
        const {id} = req.params
        const {title, description} = req.body
        const updateNote = await Note.findByIdAndUpdate(id, {title, description}, {new: true})
        if (!updateNote) {
            return res.status(404).json({message: "Note not found"})
        }
        res.status(200).json({message: "Note updated successfully"})
    } catch (error) {
        res.status(500).json({message: "Error updating note"})
    }
}
export const deleteNote = async (req, res) => {
    try {
        const id = req.params.id
        const deleteNote = await Note.findByIdAndDelete(id)
        if (!deleteNote) {
            return res.status(404).json({message: "Note not found"})
        }
        res.status(200).json({message: "Note deleted successfully"})
    } catch (error) {
        res.status(500).json({message: "Error deleting note"})
    }
}