import { init } from '../mongo/connection.js';
import schemas from '../exports/schemas.js';
import mongoose from 'npm:mongoose';
mongoose;

export default class MongoClient {
  constructor() {
    this.mongo = init();
  }

  async find(schema, query) {
    try {
      const Schema = schemas[schema];
      if (!Schema) throw new Error(`[MONGO] Schema ${schema} not found`);
      const document = await Schema.findOne(query);
      return document;
    } catch (error) {
      console.log(error);
      console.error(`[MONGO] Error fetching documents from schema: ${schema}`);
      console.error(error);
    }
  }

  async findMore(schema, query) {
    try {
      const Schema = schemas[schema];
      console.log(Schema);
      if (!Schema) throw new Error(`[MONGO] Schema ${schema} not found`);
      const document = await Schema.find(query);
      return document;
    } catch (error) {
      console.error(`[MONGO] Error fetching documents from schema: ${schema}`);
      console.error(error);
    }
  }

  async create(schema, data) {
    try {
      const Schema = schemas[schema];
      if (!Schema) throw new Error(`[MONGO] Schema ${schema} not found`);
      const document = await Schema.create(data);
      return document;
    } catch (error) {
      console.error(`[MONGO] Error creating document in schema: ${schema}`);
    }
  }

  async update(schema, query, data) {
    try {
      const Schema = schemas[schema];
      if (!Schema) throw new Error(`[MONGO] Schema ${schema} not found`);
      const document = await Schema.updateOne(query, data);
      return document;
    } catch (error) {
      console.error(`[MONGO] Error updating document in schema: ${schema}`);
      console.error(error);
    }
  }

  async push(schema, query, data) {
    try {
      const Schema = schemas[schema];
      if (!Schema) throw new Error(`[MONGO] Schema ${schema} not found`);
      const document = await Schema.updateOne(query, { $push: data });
      return document;
    } catch (error) {
      console.error(
        `[MONGO] Error pushing data to document in schema: ${schema}`
      );
      console.error(error);
    }
  }

  async set(schema, query, data) {
    try {
      const Schema = schemas[schema];
      if (!Schema) throw new Error(`[MONGO] Schema ${schema} not found`);
      const document = await Schema.updateOne(query, { $set: data });
      return document;
    } catch (error) {
      console.error(
        `[MONGO] Error setting data to document in schema: ${schema}`
      );
      console.error(error);
    }
  }

  async add(schema, query, data) {
    try {
      const Schema = schemas[schema];
      if (!Schema) throw new Error(`[MONGO] Schema ${schema} not found`);
      const document = await Schema.updateOne(query, { $inc: data });
      return document;
    } catch (error) {
      console.error(
        `[MONGO] Error adding data to document in schema: ${schema}`
      );
      console.error(error);
    }
  }

  async delete(schema, query) {
    try {
      const Schema = schemas[schema];
      if (!Schema) throw new Error(`[MONGO] Schema ${schema} not found`);
      const document = await Schema.deleteOne(query);
      return document;
    } catch (error) {
      console.error(`[MONGO] Error deleting document in schema: ${schema}`);
      console.error(error);
    }
  }

  async getAll(schema) {
    try {
      const Schema = schemas[schema];
      if (!Schema) throw new Error(`[MONGO] Schema ${schema} not found`);
      const documents = await Schema.find({});
      return documents;
    } catch (error) {
      console.error(`[MONGO] Error fetching documents from schema: ${schema}`);
      console.error(error);
    }
  }

  async getAllWSort(schema, sort) {
    try {
      const Schema = schemas[schema];
      if (!Schema) throw new Error(`[MONGO] Schema ${schema} not found`);
      const documents = await Schema.find({}).sort(sort);
      return documents;
    } catch (error) {
      console.error(`[MONGO] Error fetching documents from schema: ${schema}`);
      console.error(error);
    }
  }

  async getAllWProjection(schema, projection) {
    try {
      const Schema = schemas[schema];
      if (!Schema) throw new Error(`[MONGO] Schema ${schema} not found`);
      const documents = await Schema.find({}, projection);
      return documents;
    } catch (error) {
      console.error(`[MONGO] Error fetching documents from schema: ${schema}`);
      console.error(error);
    }
  }

  async updateBulk(schema, query, data) {
    try {
      const Schema = schemas[schema];
      if (!Schema) throw new Error(`[MONGO] Schema ${schema} not found`);
      const documents = await Schema.updateMany(query, data);
      return documents;
    } catch (error) {
      console.error(`[MONGO] Error updating documents in schema: ${schema}`);
      console.error(error);
    }
  }

  async deleteBulk(schema, query) {
    try {
      const Schema = schemas[schema];
      if (!Schema) throw new Error(`[MONGO] Schema ${schema} not found`);
      const documents = await Schema.deleteMany(query);
      return documents;
    } catch (error) {
      console.error(`[MONGO] Error deleting documents in schema: ${schema}`);
      console.error(error);
    }
  }

  async deleteAll(schema) {
    try {
      const Schema = schemas[schema];
      if (!Schema) throw new Error(`[MONGO] Schema ${schema} not found`);
      await Schema.deleteMany({});
    } catch (error) {
      console.error(`[MONGO] Error deleting documents in schema: ${schema}`);
      console.error(error);
    }
  }

  async findWProjection(schema, query, projection) {
    try {
      const Schema = schemas[schema];
      if (!Schema) throw new Error(`[MONGO] Schema ${schema} not found`);
      const document = await Schema.findOne(query, projection);
      return document;
    } catch (error) {
      console.error(`[MONGO] Error fetching documents from schema: ${schema}`);
      console.error(error);
    }
  }

  async findWSort(schema, query, sort) {
    try {
      const Schema = schemas[schema];
      if (!Schema) throw new Error(`[MONGO] Schema ${schema} not found`);
      const document = await Schema.findOne(query).sort(sort);
      return document;
    } catch (error) {
      console.error(`[MONGO] Error fetching documents from schema: ${schema}`);
      console.error(error);
    }
  }

  async findMoreWSort(schema, query, sort) {
    try {
      const Schema = schemas[schema];
      if (!Schema) throw new Error(`[MONGO] Schema ${schema} not found`);
      const document = await Schema.find(query).sort(sort);
      return document;
    } catch (error) {
      console.error(`[MONGO] Error fetching documents from schema: ${schema}`);
      console.error(error);
    }
  }
};
