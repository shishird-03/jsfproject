import React, { useState } from "react";
import axios from "axios";

export default function PlantScanner() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleScan = async () => {
    if (!image) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("file", image);

    try {
      const res = await axios.post("http://localhost:8080/plant/scan", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setResult(res.data.answer);
    } catch (err) {
      console.error(err);
      setResult("❌ Error scanning image.");
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f6f7f2] px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 border border-gray-200">

        <h2 className="text-2xl font-bold text-green-700 mb-4 text-center flex items-center justify-center gap-2">
          🌿 AI Plant Scanner
        </h2>

        {/* File Upload */}
        <label className="block mb-4">
          <span className="text-gray-700 font-medium">Upload a plant image:</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="mt-2 block w-full text-sm text-gray-600
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-lg file:border-0
                       file:text-sm file:font-medium
                       file:bg-green-600 file:text-white
                       hover:file:bg-green-700 cursor-pointer"
          />
        </label>

        {/* Preview Image */}
        {preview && (
          <div className="mb-4 flex justify-center">
            <img
              src={preview}
              alt="Preview"
              className="rounded-xl shadow-md border w-full max-h-64 object-cover"
            />
          </div>
        )}

        {/* Scan Button */}
        <button
          className={`w-full py-3 rounded-xl text-white font-semibold transition-all 
          ${loading ? "bg-green-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}
          `}
          onClick={handleScan}
          disabled={loading}
        >
          {loading ? "🔍 Scanning..." : "🌱 Scan Plant"}
        </button>

        {/* Result Box */}
        {result && (
          <div className="mt-5 bg-gray-100 border border-gray-300 rounded-xl p-3 max-h-60 overflow-y-auto text-sm shadow-inner">
            <h3 className="font-bold text-green-700 mb-2">📝 Scan Result:</h3>
            <p className="whitespace-pre-wrap">{result}</p>
          </div>
        )}
      </div>
    </div>
  );
}
