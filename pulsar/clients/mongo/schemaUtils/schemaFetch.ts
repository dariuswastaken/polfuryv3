import schemas from '../../exports/schemas.ts';

export async function getSchema(schema: string): Promise<any> {
    const SchemaModule = schemas[schema];
    const Schema = SchemaModule?.default;
    if (!Schema) throw new Error(`[MONGO] Schema ${schema} not found`);
    return Schema;
}
