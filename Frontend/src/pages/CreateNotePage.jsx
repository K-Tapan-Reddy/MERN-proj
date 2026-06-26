import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import axios from "axios";
import { axiosInstance } from "../lib/axiosInstance";

const CreateNotePage = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!(title || description)) {
            toast.error("Please fill the required fields");
            return;
        }
        const body = {
            title: title,
            description: description,
        };
        try {
            await axiosInstance.post("/notes", body);
            toast.success("Note created successfully");
            navigate("/");
        } catch (error) {
            toast.error(error);
        }
    };

    return (
        <div className="w-screen h-screen">
            <div className="container max-w-2xl mx-auto px-4 py-8">
                <Link to={"/"} className="btn btn-ghost mb-6">
                    <ArrowLeftIcon />
                    Back To Home
                </Link>
                <div className="card bg-base-100">
                    <div className="card-body">
                        <div className="card-title">Create Note</div>
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">Title</span>
                                </label>
                                <input
                                    type="text"
                                    value={title}
                                    placeholder="Note Title"
                                    className="input input-bordered"
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">
                                        Description
                                    </span>
                                </label>
                                <textarea
                                    placeholder="Enter your description here"
                                    className="textarea textarea-bordered h-32"
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    className="btn btn-primary"
                                    type="submit"
                                >
                                    Create Note
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateNotePage;
