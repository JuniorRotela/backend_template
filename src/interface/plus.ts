// Definimos el enum Meta con los valores 'true' y 'false'
enum Meta {
    True = 'true',
    False = 'false',
  }
  
  // Interfaz Plus con el campo meta de tipo Meta
  interface Plus {
    id_grupo: number;
    descripcion: string;
    meta: Meta;  
    motivo: string;
  }
  
  export default Plus;