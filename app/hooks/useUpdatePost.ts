import { useState } from "react";

export interface PostPatchDto {
  description?: string;
  location?: string;
  date?: string; 
}

export function useUpdatePost() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function updatePost(postId: string, patchData: PostPatchDto) {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patchData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error updating post: ${errorText}`);
      }

      const updatedPost = await response.json();
      return updatedPost;
    } catch (err) {
      console.error("Error updating post:", err);
      setError(err instanceof Error ? err.message : "Unknown error");
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { updatePost, loading, error };
}
