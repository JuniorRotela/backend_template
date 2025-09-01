
  interface Productos {
  id_producto:number,
  cod: string,
  descripcion: string,
  serie:  string,
  id_clasificacion: string,
  id_categoria: number ,
  medidas:  string,
  cantidad: number,
  temperatura:  string,
  id_caballete: number,
  obs: string,
  motivo:string,
  id_pvb:  number,

  // cod_empresa: number,
  // cantidad_entrada:  number,
  // cantidad_utilizada:  number,
  // cantidad_inutilizada:  number,
  // id_proveedor:  number,
  // dimension_pvb:  string,

  }
  
  export default Productos;