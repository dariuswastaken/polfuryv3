import { Query, Sort, Projection } from '../../@types/mongoClient.types';

export interface MongoClient {
    find(schema: string, query: Query): Promise<any | null>;
    findMore(schema: string, query: Query): Promise<any[]>;
    create(schema: string, data: any): Promise<any>;
    update(schema: string, query: Query, data: any): Promise<any>;
    push(schema: string, query: Query, data: any): Promise<any>;
    set(schema: string, query: Query, data: any): Promise<any>;
    add(schema: string, query: Query, data: any): Promise<any>;
    delete(schema: string, query: Query): Promise<any>;
    getAll(schema: string): Promise<any[]>;
    getAllWSort(schema: string, sort: Sort): Promise<any[]>;
    getAllWProjection(schema: string, projection: Projection): Promise<any[]>;
    updateBulk(schema: string, query: Query, data: any): Promise<any>;
    deleteBulk(schema: string, query: Query): Promise<any>;
    deleteAll(schema: string): Promise<void>;
    findWProjection(schema: string, query: Query, projection: Projection): Promise<any | null>;
    findWSort(schema: string, query: Query, sort: Sort): Promise<any | null>;
    findMoreWSort(schema: string, query: Query, sort: Sort): Promise<any[]>;
}
