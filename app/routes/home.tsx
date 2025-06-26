import { useUpload } from "../hooks/useUpload";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Sidebar from "../components/sidebar";

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
    <div className="flex min-h-screen bg-gray-900 text-white">
      <Sidebar />

      <main className="flex-1 p-6 md:p-10">
        <h1 className="text-3xl font-bold mb-6">Upload New Photo</h1>
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-gray-800 p-6 rounded-xl shadow-lg max-w-xl"
        >
          <div className="space-y-2">
            <label className="block font-medium">Choose Photo</label>
            <label className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded cursor-pointer inline-block">
              {file?.name || "Choose File"}
              <input
                type="file"
                className="hidden"
                required
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              />
            </label>
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-auto rounded mt-2 border border-gray-700"
              />
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="Title"
              className="w-full p-3 border border-gray-600 bg-gray-900 rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <textarea
              placeholder="Description"
              className="w-full p-3 border border-gray-600 bg-gray-900 rounded"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="bg-white rounded">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Select Date"
                value={date}
                onChange={(newDate) => setDate(newDate)}
                //renderInput={(params) => <TextField fullWidth {...params} />}
              />
            </LocalizationProvider>
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded text-lg font-semibold"
            >
              Upload
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
