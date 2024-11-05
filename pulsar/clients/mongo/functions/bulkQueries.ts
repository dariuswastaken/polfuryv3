import { getSchema } from '../schemaFetch.ts';
import { Query, Sort, Projection } from '../../../@types/mongoClient.types.ts';

export async function findMore(schema: string, query: Query): Promise<any[]> {
    try {
        const Schema = await getSchema(schema);
        return await Schema.find(query);
    } catch (error) {
        console.error(`[MONGO] Error fetching documents from schema: ${schema}`);
        console.error(error);
        return [];
    }
}

export async function getAll(schema: string): Promise<any[]> {
    try {
        const Schema = await getSchema(schema);
        return await Schema.find({});
    } catch (error) {
        console.error(`[MONGO] Error fetching documents from schema: ${schema}`);
        console.error(error);
        return [];
    }
}

export async function getAllWSort(schema: string, sort: Sort): Promise<any[]> {
    try {
        const Schema = await getSchema(schema);
        return await Schema.find({}).sort(sort);
    } catch (error) {
        console.error(`[MONGO] Error fetching documents from schema: ${schema}`);
        console.error(error);
        return [];
    }
}

export async function getAllWProjection(schema: string, projection: Projection): Promise<any[]> {
    try {
        const Schema = await getSchema(schema);
        return await Schema.find({}, projection);
    } catch (error) {
        console.error(`[MONGO] Error fetching documents from schema: ${schema}`);
        console.error(error);
        return [];
    }
}

export async function updateBulk(schema: string, query: Query, data: any): Promise<any> {
    try {
        const Schema = await getSchema(schema);
        return await Schema.updateMany(query, data);
    } catch (error) {
        console.error(`[MONGO] Error updating documents in schema: ${schema}`);
        console.error(error);
    }
}

export async function deleteBulk(schema: string, query: Query): Promise<any> {
    try {
        const Schema = await getSchema(schema);
        return await Schema.deleteMany(query);
    } catch (error) {
        console.error(`[MONGO] Error deleting documents in schema: ${schema}`);
        console.error(error);
    }
}

export async function deleteAll(schema: string): Promise<void> {
    try {
        const Schema = await getSchema(schema);
        await Schema.deleteMany({});
    } catch (error) {
        console.error(`[MONGO] Error deleting documents in schema: ${schema}`);
        console.error(error);
    }
}

export async function findMoreWSort(schema: string, query: Query, sort: Sort): Promise<any[]> {
    try {
        const Schema = await getSchema(schema);
        return await Schema.find(query).sort(sort);
    } catch (error) {
        console.error(`[MONGO] Error fetching documents from schema: ${schema}`);
        console.error(error);
        return [];
    }
}
