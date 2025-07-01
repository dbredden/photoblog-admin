import { useState } from "react";
import { usePosts } from "../hooks/usePosts";
import type { Post } from "../hooks/usePosts";
import { useUpdatePost } from "../hooks/useUpdatePost";
import { UpdatePostCard } from "../components/UpdatePostCard";

export default function EditPage() {
  const { posts, loading: postsLoading } = usePosts();
  const { updatePost, loading: updating, error } = useUpdatePost();
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [formData, setFormData] = useState<{
    location?: string;
    description?: string;
    date?: string;
  }>({});

  function handleEditClick(post: Post) {
    setEditingPost(post);
    setFormData({
      location: post.location,
      description: post.description,
      date: post.date.slice(0, 10), // yyyy-MM-dd
    });
  }

  async function handleSave() {
    if (!editingPost) return;

    const updated = await updatePost(editingPost.id, {
      location: formData.location,
      description: formData.description,
      date: formData.date,
    });

    if (updated) {
      alert("Post updated successfully!");
      setEditingPost(null);
      window.location.reload(); // quick refresh to show updated data; you could also refetch posts.
    }
  }

  if (postsLoading) {
    return <p className="p-4 text-center">Loading posts...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Edit Posts</h1>

      {posts.map((post) =>
        editingPost?.id === post.id ? (
          <div
            key={post.id}
            className="flex flex-col gap-2 p-4 border rounded shadow-sm bg-white dark:bg-gray-900"
          >
            <label className="flex flex-col text-sm">
              Location:
              <input
                type="text"
                className="border rounded p-2 mt-1"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
              />
            </label>

            <label className="flex flex-col text-sm">
              Description:
              <textarea
                className="border rounded p-2 mt-1"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </label>

            <label className="flex flex-col text-sm">
              Date:
              <input
                type="date"
                className="border rounded p-2 mt-1"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
              />
            </label>

            <div className="flex gap-2 mt-2">
              <button
                className="px-4 py-2 text-sm font-medium bg-green-600 text-white rounded hover:bg-green-700 transition"
                onClick={handleSave}
                disabled={updating}
              >
                {updating ? "Saving..." : "Save"}
              </button>
              <button
                className="px-4 py-2 text-sm font-medium bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
                onClick={() => setEditingPost(null)}
              >
                Cancel
              </button>
            </div>

            {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
          </div>
        ) : (
          <UpdatePostCard key={post.id} post={post} onEdit={handleEditClick} />
        )
      )}
    </div>
  );
}
