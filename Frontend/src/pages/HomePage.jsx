import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUi";
import NotesCard from "../components/NotesCard";
import { axiosInstance } from "../lib/axiosInstance";
import NotesNotFound from "../components/NotesNotFound";

const HomePage = () => {
    const [isRateLimited, setIsRateLimited] = useState(false);
    const [notes, setNotes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchNotes = async () => {
            setIsLoading(true);
            try {
                let res = await axiosInstance.get("/notes");
                if (res?.status === 200) {
                    setNotes(res?.data);
                    setIsRateLimited(false);
                }
            } catch (error) {
                console.log(error);
                console.error("Error fetching notes:", error);
                if (error?.response?.status === 429) {
                    setIsRateLimited(true);
                } else {
                    console.error("Failed to load response");
                }
            } finally {
                setIsLoading(false);
            }
        };
        fetchNotes();
    }, []);
    return (
        <div className="min-h-screen">
            <Navbar />
            {isRateLimited ? (
                <RateLimitedUI />
            ) : notes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto p-4 mt-6">
                    {notes.map((note) => (
                        <NotesCard
                            key={note?._id}
                            note={note}
                            setNotes={setNotes}
                        />
                    ))}
                </div>
            ) : (
                <NotesNotFound />
            )}
        </div>
    );
};

export default HomePage;
