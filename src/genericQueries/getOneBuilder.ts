// getOneBuilder.ts
export function generateGetOneQuery(tableName: string): string {
    return `SELECT * FROM ${tableName} WHERE id = $1`;
  }
  