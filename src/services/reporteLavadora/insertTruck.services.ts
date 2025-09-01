import { insertData } from "../../services/reporteLavadora/Insert.services";
import Lavadora from "../../interface/reporteLavadora";

// Función reutilizable para crear un camión en la base de datos
export const PostReporteLavadora = async (data: Lavadora) => {
  const tableName = "reportelavadora";
  try {
    const resp = await insertData(tableName, data);
//  console.log("esta es la respuesta xd", resp)
    return resp;
  } catch (error) {
    console.error("Error creating reportelavadora in DB:", error);
    throw error;

    
  }
};


// useEffect(() => {
//   const token = localStorage.getItem("authToken");
//   if (token) {
//       setIsAuthenticated(true);
//   } else {
//       setIsAuthenticated(false);
//   }
// }, []);

