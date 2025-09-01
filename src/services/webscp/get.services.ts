// // import puppeteer from 'puppeteer';

// export const fetchScrapedData = async () => {
//   try {
//     console.log("Iniciando scraping con Puppeteer...");

//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();

//     await page.goto("http://192.168.88.69:8073/X9nyk7GdvWTSPMDjGYBEEnRQHXK/", {
//       waitUntil: 'networkidle2',
//       timeout: 120000 // Aumenta el tiempo de espera a 120 segundos
//     });

//     // Espera 10 segundos adicionales para asegurar que el contenido se ha cargado
//     await new Promise(resolve => setTimeout(resolve, 10000));

//     // Captura una captura de pantalla de la página
//     await page.screenshot({ path: 'xd.png', fullPage: true });

//     console.log("Captura de pantalla tomada. Revisa xd.png para ver el estado de la página.");
    
//     await browser.close();
//   } catch (error) {
//     console.error("Error en el servicio de scraping con Puppeteer:", error);
//     throw error;
//   }
// };

// export default { fetchScrapedData };
