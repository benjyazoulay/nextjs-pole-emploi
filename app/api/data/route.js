import axios from 'axios';
import csv from 'csvtojson';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
  
  const url = "https://huggingface.co/datasets/BenjaminAzoulay/choisirleservicepublic/resolve/main/offres_historique.csv";
  
  try {
    const response = await axios.get(url);
    if (response.status !== 200) {
      return res.status(response.status).json({ error: "Failed to fetch CSV." });
    }
    const csvData = response.data;
    const jsonData = await csv({
      delimiter: ","
    }).fromString(csvData);
    
    res.status(200).json(jsonData);
  } catch (error) {
    console.error("Error fetching CSV:", error.message);
    res.status(500).json({ error: "Failed to fetch CSV data." });
  }
}