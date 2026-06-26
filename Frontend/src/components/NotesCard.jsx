import { PenSquareIcon, Trash2Icon } from "lucide-react";
import React from "react";
import { Link } from "react-router";
import { formatDateToMMMDDYYYY } from "../lib/utils";
import { axiosInstance } from "../lib/axiosInstance";
import toast from "react-hot-toast";

const NotesCard = ({ note, setNotes }) => {
    const handleDelete = async(e,id) => {
        e.preventDefault()
        if(!window.confirm("Are you sure you want to delete")) return;
        try {
            const res = await axiosInstance.delete(`/notes/${id}`)
            toast.success("Note Deleted Successfully")
            console.log(res,"delete res")
            if(res?.status === 200) {
                let response = await axiosInstance.get("/notes");
                if(response?.status === 200) {
                    setNotes(response?.data)
                }
            }
        } catch (error) {
            toast.error("Failed to delete note")
        }
    }
    return (
        <Link
            to={`/notes/${note._id}`}
            className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D]"
        >
            <div className="card-body">
                <h3 className="card-title text-base-content">{note.title}</h3>
                <p className="text-base-content/70 line-clamp-3">
                    {note.description}
                </p>
                <div className="card-actions justify-between items-center mt-4">
                    <span className="text-sm text-base-content/60">
                        {formatDateToMMMDDYYYY(new Date(note.createdAt))}
                    </span>
                    <div className="flex items-center gap-1">
                        <PenSquareIcon className="size-4" />
                        <button className="btn btn-ghost btn-xs text-error" onClick={(e) => {handleDelete(e,note._id)}}>
                            <Trash2Icon className="size-4" />
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default NotesCard;
