export function generateInsertQuery(tableName: string, data: Record<string, any>): string {
  const columns = Object.keys(data);
  const values = Object.values(data).map(value => (typeof value === 'string' ? `'${value}'` : value));

  const sql = `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES (${values.join(', ')})`;

  return sql;
}
