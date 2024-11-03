import { init } from '../mongo/connection.js';
import schemas from '../exports/schemas.js';
import { Query, Sort, Projection } from '../@types/mongoClient.types.ts';

export default class MongoClient {
    private mongo: any;

    constructor() {
        this.mongo = init();
    }

    private getSchema(schema: string): any {
        const SchemaModule = schemas[schema];
        const Schema = SchemaModule?.default;
        if (!Schema) throw new Error(`[MONGO] Schema ${schema} not found`);
        return Schema;
    }

    async find(schema: string, query: Query): Promise<any | null> {
        try {
            const Schema = this.getSchema(schema);
            return await Schema.findOne(query);
        } catch (error) {
            console.error(`[MONGO] Error fetching documents from schema: ${schema}`);
            console.error(error);
            return null;
        }
    }

    async findMore(schema: string, query: Query): Promise<any[]> {
        try {
            const Schema = this.getSchema(schema);
            return await Schema.find(query);
        } catch (error) {
            console.error(`[MONGO] Error fetching documents from schema: ${schema}`);
            console.error(error);
            return [];
        }
    }

    async create(schema: string, data: any): Promise<any> {
        try {
            const Schema = this.getSchema(schema);
            return await Schema.create(data);
        } catch (error) {
            console.error(`[MONGO] Error creating document in schema: ${schema}`);
            console.error(error);
        }
    }

    async update(schema: string, query: Query, data: any): Promise<any> {
        try {
            const Schema = this.getSchema(schema);
            return await Schema.updateOne(query, data);
        } catch (error) {
            console.error(`[MONGO] Error updating document in schema: ${schema}`);
            console.error(error);
        }
    }

    async push(schema: string, query: Query, data: any): Promise<any> {
        try {
            const Schema = this.getSchema(schema);
            return await Schema.updateOne(query, { $push: data });
        } catch (error) {
            console.error(`[MONGO] Error pushing data to document in schema: ${schema}`);
            console.error(error);
        }
    }

    async set(schema: string, query: Query, data: any): Promise<any> {
        try {
            const Schema = this.getSchema(schema);
            return await Schema.updateOne(query, { $set: data });
        } catch (error) {
            console.error(`[MONGO] Error setting data to document in schema: ${schema}`);
            console.error(error);
        }
    }

    async add(schema: string, query: Query, data: any): Promise<any> {
        try {
            const Schema = this.getSchema(schema);
            return await Schema.updateOne(query, { $inc: data });
        } catch (error) {
            console.error(`[MONGO] Error adding data to document in schema: ${schema}`);
            console.error(error);
        }
    }

    async delete(schema: string, query: Query): Promise<any> {
        try {
            const Schema = this.getSchema(schema);
            return await Schema.deleteOne(query);
        } catch (error) {
            console.error(`[MONGO] Error deleting document in schema: ${schema}`);
            console.error(error);
        }
    }

    async getAll(schema: string): Promise<any[]> {
        try {
            const Schema = this.getSchema(schema);
            return await Schema.find({});
        } catch (error) {
            console.error(`[MONGO] Error fetching documents from schema: ${schema}`);
            console.error(error);
            return [];
        }
    }

    async getAllWSort(schema: string, sort: Sort): Promise<any[]> {
        try {
            const Schema = this.getSchema(schema);
            return await Schema.find({}).sort(sort);
        } catch (error) {
            console.error(`[MONGO] Error fetching documents from schema: ${schema}`);
            console.error(error);
            return [];
        }
    }

    async getAllWProjection(schema: string, projection: Projection): Promise<any[]> {
        try {
            const Schema = this.getSchema(schema);
            return await Schema.find({}, projection);
        } catch (error) {
            console.error(`[MONGO] Error fetching documents from schema: ${schema}`);
            console.error(error);
            return [];
        }
    }

    async updateBulk(schema: string, query: Query, data: any): Promise<any> {
        try {
            const Schema = this.getSchema(schema);
            return await Schema.updateMany(query, data);
        } catch (error) {
            console.error(`[MONGO] Error updating documents in schema: ${schema}`);
            console.error(error);
        }
    }

    async deleteBulk(schema: string, query: Query): Promise<any> {
        try {
            const Schema = this.getSchema(schema);
            return await Schema.deleteMany(query);
        } catch (error) {
            console.error(`[MONGO] Error deleting documents in schema: ${schema}`);
            console.error(error);
        }
    }

    async deleteAll(schema: string): Promise<void> {
        try {
            const Schema = this.getSchema(schema);
            await Schema.deleteMany({});
        } catch (error) {
            console.error(`[MONGO] Error deleting documents in schema: ${schema}`);
            console.error(error);
        }
    }

    async findWProjection(
        schema: string,
        query: Query,
        projection: Projection
    ): Promise<any | null> {
        try {
            const Schema = this.getSchema(schema);
            return await Schema.findOne(query, projection);
        } catch (error) {
            console.error(`[MONGO] Error fetching documents from schema: ${schema}`);
            console.error(error);
            return null;
        }
    }

    async findWSort(schema: string, query: Query, sort: Sort): Promise<any | null> {
        try {
            const Schema = this.getSchema(schema);
            return await Schema.findOne(query).sort(sort);
        } catch (error) {
            console.error(`[MONGO] Error fetching documents from schema: ${schema}`);
            console.error(error);
            return null;
        }
    }

    async findMoreWSort(schema: string, query: Query, sort: Sort): Promise<any[]> {
        try {
            const Schema = this.getSchema(schema);
            return await Schema.find(query).sort(sort);
        } catch (error) {
            console.error(`[MONGO] Error fetching documents from schema: ${schema}`);
            console.error(error);
            return [];
        }
    }
}
