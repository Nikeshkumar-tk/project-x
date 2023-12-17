import mongoose, { Schema } from "mongoose";
import { IMongoDALCreateArg } from "./mongo";

import { DB_ERRORS,DB_ERROR_MESSAGES } from "./apiErrors";
// import { config } from "../../config";
import { MongoQueryBuilder } from "./queryBuilder";
import { HTTP_RESOURCES } from "./resources";

//Audit schema defenition


export class MongoDAL {
  public mongoDBUrl: string;
  constructor() {
    this.getItem = this.getItem.bind(this);
    this.getItemList = this.getItemList.bind(this);
    this.patchItem = this.patchItem.bind(this);
    this.createItem = this.createItem.bind(this);
    this.createItems = this.createItems.bind(this);
    this.createOrUpdateItem = this.createOrUpdateItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.getItemCount = this.getItemCount.bind(this);
    this.getListOfItems = this.getListOfItems.bind(this)
    this.mongoDBUrl = process.env.mongoUrl;
  }

  async createItem(resource: string, arg: IMongoDALCreateArg) {
    try {
      await mongoose.connect(this.mongoDBUrl);
      const collectionName = config.mongoCollectionMap[resource];
      const model = mongoose.model(collectionName);
      if (arg.constraints?.unique) {
        const uniqQuery = MongoQueryBuilder.checkUnique(arg.constraints.unique);
        const result = await model.findOne(uniqQuery);
        if (result) {
          const errorObj = new Error();
          errorObj.message = DB_ERROR_MESSAGES.uniqueCheckFailed;
          errorObj.name = DB_ERRORS.uniqueCheckFailed;
          throw errorObj;
        }
      }
      const newDoc = new model(arg.data);
      const result = JSON.parse(JSON.stringify(newDoc));
      await newDoc.save();
      return result;
    } catch (err) {
      if (err.code === 11000) {
        return "item already exists";
      }
      throw err;
    }
  }

  async insertMany({ resource, data }) {
    try {
      await mongoose.connect(this.mongoDBUrl);
      const collectionName = config.mongoCollectionMap[resource];
      const model = mongoose.model(collectionName);
      const result = await model.insertMany(data);
      return result;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }



  async deleteMany({ resource, filters }) {
    try {
      const conditions = {
        $or: filters,
      };
      await mongoose.connect(this.mongoDBUrl);
      const collectionName = config.mongoCollectionMap[resource];
      const model = mongoose.model(collectionName);
      const result = await model.deleteMany(conditions);
      return result;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  async createOrUpdateItem({ resource, queryObj, data }) {
    try {
      await mongoose.connect(this.mongoDBUrl);
      const collectionName = config.mongoCollectionMap[resource];
      const model = mongoose.model(collectionName);
      const result = await model.findOneAndUpdate(
        queryObj,
        { $set: data },
        { upsert: true, new: true }
      );
      return result;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }



  async createItems(resource, data) {
    try {
      await mongoose.connect(this.mongoDBUrl);
      const collectionName = config.mongoCollectionMap[resource];
      const model = mongoose.model(collectionName);
      const result = await model.insertMany(data);
      return result;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async getItem({ resource, queryObj }) {
    try {
      await mongoose.connect(this.mongoDBUrl);
      const collectionName = config.mongoCollectionMap[resource];
      const model = mongoose.model(collectionName);
      const result = await model.findOne(queryObj);
      return result;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async deleteItem({ resource, queryObj }) {
    try {
      await mongoose.connect(this.mongoDBUrl);
      const collectionName = config.mongoCollectionMap[resource];
      const model = mongoose.model(collectionName);
      const result = await model.deleteOne(queryObj);
      return result;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }






  async getItemList({ resource, queryObj }) {
    try {
      await mongoose.connect(this.mongoDBUrl);
      const collectionName = config.mongoCollectionMap[resource];
      const model = mongoose.model(collectionName);
      let result;
      if (!queryObj || Object.entries(queryObj).length === 0) {
        result = await model.find({}).sort({ createdAt: "desc" }).limit(200);
        result.totalRows = await model.estimatedDocumentCount();
        return result;
      } else if (queryObj.isSubString) {
        delete queryObj["isSubString"];
        const entries = Object.entries(queryObj);
        const attributeName = entries[0][0];
        const searchValue = entries[0][1] as string;
        const mongoQuery = {};
        mongoQuery[attributeName] = new RegExp(searchValue, "i");
        result = await model.find(mongoQuery).limit(200);
        result.totalRows = await model.find(mongoQuery).countDocuments();
        return result;
      } else if (queryObj.isPrefix) {
        delete queryObj["isPrefix"];
        const entries = Object.entries(queryObj);
        const attributeName = entries[0][0];
        const searchValue = entries[0][1] as string;
        const mongoQuery = {};
        mongoQuery[attributeName] = new RegExp("^" + searchValue, "i");
        result = await model.find(mongoQuery).limit(200);
        result.totalRows = await model.find(mongoQuery).countDocuments();
        return result;
      } else {
        result = await model.find(queryObj).limit(200);
        return result;
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async queryListWithOr({ resource, filters }) {
    try {
      await mongoose.connect(this.mongoDBUrl);
      const collectionName = config.mongoCollectionMap[resource];
      const model = mongoose.model(collectionName);
      const conditions = {
        $or: filters,
      };
      const result = await model.find(conditions);
      return result;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async getItemCount({ resource, queryObj }) {
    try {
      await mongoose.connect(this.mongoDBUrl);
      const collectionName = config.mongoCollectionMap[resource];
      const model = mongoose.model(collectionName);
      if (!queryObj || Object.entries(queryObj).length === 0) {
        return await model.estimatedDocumentCount();
      } else {
        const entries = Object.entries(queryObj);
        const attributeName = entries[0][0];
        const searchValue = entries[0][1] as string;
        const mongoQuery = {};
        mongoQuery[attributeName] = new RegExp("^" + searchValue, "i");
        return await model.find(mongoQuery).countDocuments();
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  }


  async findOne({ resource, queryObj }) {
    try {
      await mongoose.connect(this.mongoDBUrl);
      const collectionName = config.mongoCollectionMap[resource];
      const model = mongoose.model(collectionName);
      return await model.findOne(queryObj);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async patchItem({ resource, filter, attributesToUpdate }) {
    try {
      await mongoose.connect(this.mongoDBUrl);
      const collectionName = config.mongoCollectionMap[resource];
      const model = mongoose.model(collectionName);
      const result = await model.findOneAndUpdate(filter, attributesToUpdate, {
        new: true,
        upsert: true,
      });
      return result;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

 
  
  async getListOfItems({ resource, query }) {
    try {
      await mongoose.connect(this.mongoDBUrl);
      const collectionName = config.mongoCollectionMap[resource];
      const model = mongoose.model(collectionName);
      const result = await model.find(query).sort({ createdAt: -1 })
      return result
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
