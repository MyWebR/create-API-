// server.js (Backend server dengan Node.js dan Express)
const express = require("express");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

const app = express();
const PORT = 3000;
const DATA_FILE = "data.json";

app.use(bodyParser.json());
app.use(express.static("public"));

// Load existing data from the JSON file
function loadData() {
  if (fs.existsSync(DATA_FILE)) {
    const data = fs.readFileSync(DATA_FILE);
    return JSON.parse(data);
  }
  return {};
}

// Save data to the JSON file
function saveData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

let dataStorage = loadData();

// Endpoint untuk input data dan membuat API key
app.post("/api/submit", (req, res) => {
  const newData = req.body;
  const apiKey = uuidv4(); // Membuat API key unik

  // Simpan data dengan API key
  dataStorage[apiKey] = newData;
  saveData(dataStorage);

  res.status(201).json({
    message: "Data berhasil disimpan",
    apiKey: apiKey,
    link: `http://localhost:${PORT}/api/data/${apiKey}`,
  });
});

// Endpoint untuk mengakses data berdasarkan API key
app.get("/api/data/:apiKey", (req, res) => {
  const apiKey = req.params.apiKey;
  const data = dataStorage[apiKey];

  if (data) {
    res.json(data);
  } else {
    res.status(404).json({ message: "Data tidak ditemukan" });
  }
});

// Endpoint untuk mengembalikan semua data dalam format JSON
app.get("/api/all-data", (req, res) => {
  res.json(dataStorage);
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
