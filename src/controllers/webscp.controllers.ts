import { Request, Response } from "express";
import scrapeService from "../services/webscp/get.services";

export const getScrapedData = async (req: Request, res: Response) => {
  try {
    const scrapedData = await scrapeService.fetchScrapedData();
    // console.log(scrapedData); // Verifica que los datos están siendo recibidos en el controlador
    res.json(scrapedData);
  } catch (error) {
    console.error("Error en el controlador de scraping:", error);
    res.status(500).json({ error: "Error al hacer scraping" });
  }
};

export default { getScrapedData };
