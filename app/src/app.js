const express = require("express");
const xlsx = require("xlsx");
const cors = require("cors");
const path = require("path");
const { PORT } = require("./config");

const app = express();

app.use(cors());

// Endpoint para el archivo JSON
app.get("/data-enterprises", (req, res) => {
	const jsonPath = path.join(__dirname, "data", "dicionario-de-datos.json");
	res.sendFile(jsonPath, (err) => {
		if (err) {
			console.error("Error sending JSON file:", err);
			res.status(500).json({ error: "Internal Server Error" });
		}
	});
});

// Endpoint para el archivo Excel
app.get("/data-employees", (req, res) => {
	const excelPath = path.join(__dirname, "data", "origen-datos-junior.xlsx");
	try {
		const workbook = xlsx.readFile(excelPath);
		const sheetName = workbook.SheetNames[0];
		const jsonData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
		res.json(jsonData);
	} catch (error) {
		console.error("Error reading Excel file:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
