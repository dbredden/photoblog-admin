import { useUpload } from "../hooks/useUpload";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Sidebar from "../components/sidebar";
import { preview } from "vite";

export function meta() {
  return [
    { title: "Photo Upload – Admin Panel" },
    { name: "description", content: "Upload photos to your photoblog" },
  ];
}

export default function Home() {
  const {
    file,
    setFile,
    previewUrl,
    title,
    setTitle,
    description,
    setDescription,
    date,
    setDate,
    handleSubmit,
  } = useUpload();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar only on desktop */}
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 p-4">
        <h1 className="text-2xl font-semibold mb-4">Upload New Photo</h1>
        <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
          <input
            type="file"
            required
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />

          {previewUrl && (
            <img 
              src={previewUrl}
              alt="Preview"
              className="w-full h-auto mb-4 rounded"
            />  
          )}

          <input
            type="text"
            placeholder="Title"
            className="w-full p-2 border border-gray-300 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Description"
            className="w-full p-2 border border-gray-300 rounded"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Select Date"
              value={date}
              onChange={(newDate) => setDate(newDate)}
            />
          </LocalizationProvider>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Upload
          </button>
        </form>
      </main>
    </div>
  );
}
