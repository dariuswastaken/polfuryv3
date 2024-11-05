import { getSchema } from '../schemaUtils/schemaFetch.ts';
import { Query, Sort, Projection } from '../../../@types/mongoClient.types.ts';

export async function find(schema: string, query: Query): Promise<any | null> {
    try {
        const Schema = await getSchema(schema);
        return await Schema.findOne(query);
    } catch (error) {
        console.error(`[MONGO] Error fetching documents from schema: ${schema}`);
        console.error(error);
        return null;
    }
}

export async function create(schema: string, data: any): Promise<any> {
    try {
        const Schema = await getSchema(schema);
        return await Schema.create(data);
    } catch (error) {
        console.error(`[MONGO] Error creating document in schema: ${schema}`);
        console.error(error);
    }
}

export async function update(schema: string, query: Query, data: any): Promise<any> {
    try {
        const Schema = await getSchema(schema);
        return await Schema.updateOne(query, data);
    } catch (error) {
        console.error(`[MONGO] Error updating document in schema: ${schema}`);
        console.error(error);
    }
}

export async function push(schema: string, query: Query, data: any): Promise<any> {
    try {
        const Schema = await getSchema(schema);
        return await Schema.updateOne(query, { $push: data });
    } catch (error) {
        console.error(`[MONGO] Error pushing data to document in schema: ${schema}`);
        console.error(error);
    }
}

export async function set(schema: string, query: Query, data: any): Promise<any> {
    try {
        const Schema = await getSchema(schema);
        return await Schema.updateOne(query, { $set: data });
    } catch (error) {
        console.error(`[MONGO] Error setting data to document in schema: ${schema}`);
        console.error(error);
    }
}

export async function add(schema: string, query: Query, data: any): Promise<any> {
    try {
        const Schema = await getSchema(schema);
        return await Schema.updateOne(query, { $inc: data });
    } catch (error) {
        console.error(`[MONGO] Error adding data to document in schema: ${schema}`);
        console.error(error);
    }
}

export async function deleteDocument(schema: string, query: Query): Promise<any> {
    try {
        const Schema = await getSchema(schema);
        return await Schema.deleteOne(query);
    } catch (error) {
        console.error(`[MONGO] Error deleting document in schema: ${schema}`);
        console.error(error);
    }
}

export async function findWProjection(
    schema: string,
    query: Query,
    projection: Projection
): Promise<any | null> {
    try {
        const Schema = await getSchema(schema);
        return await Schema.findOne(query, projection);
    } catch (error) {
        console.error(`[MONGO] Error fetching documents from schema: ${schema}`);
        console.error(error);
        return null;
    }
}

export async function findWSort(schema: string, query: Query, sort: Sort): Promise<any | null> {
    try {
        const Schema = await getSchema(schema);
        return await Schema.findOne(query).sort(sort);
    } catch (error) {
        console.error(`[MONGO] Error fetching documents from schema: ${schema}`);
        console.error(error);
        return null;
    }
}
