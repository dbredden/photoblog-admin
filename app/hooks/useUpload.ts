import { useState, useEffect } from "react";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";

export function useUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Dayjs | null>(dayjs());

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [file]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !date) return;

    const formData = new FormData();
    formData.append("image", file);
    formData.append("location", location);
    formData.append("description", description);
    formData.append("date", date.format("YYYY-MM-DD"));
;

    await fetch("http://localhost:5161/api/posts", {
      method: "POST",
      body: formData,
    });

    alert("Upload successful!");
  };

  return {
    file,
    setFile,
    previewUrl,
    location,
    setLocation,
    description,
    setDescription,
    date,
    setDate,
    handleSubmit,
  };
}
