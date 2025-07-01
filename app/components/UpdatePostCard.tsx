import type { Post } from "../hooks/usePosts";

interface UpdatePostCardProps {
  post: Post;
  onEdit?: (post: Post) => void;
}

export function UpdatePostCard({ post, onEdit }: UpdatePostCardProps) {
  return (
    <div className="flex items-center gap-4 p-3 border rounded shadow-sm bg-white dark:bg-gray-900">
      <img
        src={post.photoWebUrl}
        alt="Post Preview"
        className="w-20 h-20 object-cover rounded"
        loading="lazy"
      />
      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-500 truncate">📍 {post.location}</p>
        <p className="text-sm text-gray-800 dark:text-gray-100 truncate">
          {post.description.length > 60
            ? post.description.slice(0, 60) + "..."
            : post.description}
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500">
          {new Date(post.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "2-digit",
          })}
        </p>
      </div>
      <button
        className="ml-2 px-3 py-1 text-xs font-medium bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        onClick={() => onEdit?.(post)}
        type="button"
      >
        Edit
      </button>
    </div>
  );
}
