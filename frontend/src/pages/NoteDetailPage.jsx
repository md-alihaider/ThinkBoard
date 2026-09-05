import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router";
import { ArrowLeftIcon, Trash2Icon } from "lucide-react";
import toast, { LoaderIcon } from "react-hot-toast";
import api from "../lib/axios";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.log("Error in fetching data.", error);
        toast.error("Failed to load note.");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted successfully.");
      navigate("/");
    } catch (error) {
      console.log("Error deleting note", error);
      toast.error("Failed to delete note.");
    }
  };

  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("All fields are required.");
      return;
    }

    setSaving(true);

    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note saved successfully.");
      navigate("/");
    } catch (error) {
      console.log("Error saving note", error);
      toast.error("Failed to save note.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10 text-[#00FF9D]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-2xl mx-auto">
          {/* Top Navigation */}
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost gap-2 px-2 hover:bg-base-300">
              <ArrowLeftIcon className="size-5" />
              Back to Notes
            </Link>

            <button
              onClick={handleDelete}
              className="btn btn-ghost btn-sm text-error hover:bg-error/10"
            >
              <Trash2Icon className="size-4" />
              Delete
            </button>
          </div>

          {/* Editor Card */}
          <div className="card bg-base-100 border border-base-300 shadow-lg">
            <div className="card-body p-6 sm:p-8">
              {/* Header */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold">Edit Note</h2>

                <p className="text-sm text-base-content/60 mt-1">
                  Make changes to your note and save them.
                </p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSave();
                }}
                className="space-y-6"
              >
                {/* Title */}
                <div className="form-control">
                  <label className="label px-0 pb-2">
                    <span className="label-text font-semibold">Title</span>
                  </label>

                  <input
                    type="text"
                    placeholder="Note title"
                    className="
                      input input-bordered
                      w-full
                      focus:border-[#00FF9D]
                      focus:outline-none
                      focus:ring-1
                      focus:ring-[#00FF9D]/30
                    "
                    value={note.title}
                    onChange={(e) =>
                      setNote({ ...note, title: e.target.value })
                    }
                  />
                </div>

                {/* Content */}
                <div className="form-control">
                  <label className="label px-0 pb-2">
                    <span className="label-text font-semibold">Content</span>
                  </label>

                  <textarea
                    placeholder="Write your note here..."
                    className="
                      textarea textarea-bordered
                      w-full
                      h-48
                      resize-none
                      p-4
                      leading-relaxed
                      focus:border-[#00FF9D]
                      focus:outline-none
                      focus:ring-1
                      focus:ring-[#00FF9D]/30
                    "
                    value={note.content}
                    onChange={(e) =>
                      setNote({ ...note, content: e.target.value })
                    }
                  />
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-2">
                  <Link to="/" className="btn btn-ghost">
                    Cancel
                  </Link>

                  <button
                    type="submit"
                    className="
                      btn
                      bg-[#00FF9D]
                      text-black
                      border-none
                      hover:bg-[#00e68d]
                      px-6
                    "
                    disabled={saving}
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
