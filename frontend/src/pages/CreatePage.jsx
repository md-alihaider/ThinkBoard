import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import api from "../lib/axios";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required.");
      return;
    }

    setLoading(true);

    try {
      await api.post("/notes", { title, content });

      toast.success("Note created successfully.");
      navigate("/");
    } catch (error) {
      console.log("Error creating note", error);

      if (error.response?.status === 429) {
        toast.error("Slow down! You're creating notes too fast", {
          duration: 4000,
          icon: "💀",
        });
      } else {
        toast.error("Failed to create note");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-2xl mx-auto">
          {/* Back Button */}
          <Link
            to="/"
            className="btn btn-ghost gap-2 mb-6 px-2 hover:bg-base-300"
          >
            <ArrowLeftIcon className="size-5" />
            Back to Notes
          </Link>

          {/* Card */}
          <div className="card bg-base-100 border border-base-300 shadow-lg">
            <div className="card-body p-6 sm:p-8">
              {/* Header */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold">Create New Note</h2>

                <p className="text-sm text-base-content/60 mt-1">
                  Capture your thoughts and ideas.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div className="form-control">
                  <label className="label px-0 pb-2">
                    <span className="label-text font-semibold">Title</span>
                  </label>

                  <input
                    type="text"
                    placeholder="Give your note a title..."
                    className="
                      input input-bordered
                      w-full
                      focus:border-[#00FF9D]
                      focus:outline-none
                      focus:ring-1
                      focus:ring-[#00FF9D]/30
                    "
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
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
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
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
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create Note"}
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

export default CreatePage;
