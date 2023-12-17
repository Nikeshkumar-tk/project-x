import mongoose, { Schema } from "mongoose";
import { IMongoDALCreateArg } from "./mongo";
// import { config } from "../../config";

import { HTTP_RESOURCES } from "./resources";

//Review schema defenition

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
    this.getListOfItems = this.getListOfItems.bind(this)

    this.mongoDBUrl = process.env.MONGO_DB_URL || "mongodb+srv://vinayaksukhalal:1234@cluster0.opl3kke.mongodb.net/ProjectX";
  }

  async createItem( arg: any,model:any) {
    try {
      await mongoose.connect(this.mongoDBUrl);
     
  
        // Create the model if it doesn't exist
       
        const newDoc = new model(arg.data);
        const result = JSON.parse(JSON.stringify(newDoc));
        await newDoc.save();
        return result;
   
     
    //   if (arg.constraints?.unique) {
    //     const uniqQuery = MongoQueryBuilder.checkUnique(arg.constraints.unique);
    //     const result = await model.findOne(uniqQuery);
    //     if (result) {
    //       const errorObj = new Error();
    //       errorObj.message = DB_ERROR_MESSAGES.uniqueCheckFailed;
    //       errorObj.name = DB_ERRORS.uniqueCheckFailed;
    //       throw errorObj;
    //     }
    //   }
    
    } catch (err) {
        console.log(err);

      throw err;
    }
  }

  async insertMany({ resource, data }:any) {
    try {
      await mongoose.connect(this.mongoDBUrl);

      const model = mongoose.model(resource);
      const result = await model.insertMany(data);
      return result;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }



  async deleteMany({ resource, filters }:any) {
    try {
      const conditions = {
        $or: filters,
      };
      await mongoose.connect(this.mongoDBUrl);
   
      const model = mongoose.model(resource);
      const result = await model.deleteMany(conditions);
      return result;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  async createOrUpdateItem({ resource, queryObj, data }:any) {
    try {
      await mongoose.connect(this.mongoDBUrl);

      const model = mongoose.model(resource);
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



  async createItems(resource:any, data:any) {
    try {
      await mongoose.connect(this.mongoDBUrl);
     
      const model = mongoose.model(resource);
      const result = await model.insertMany(data);
      return result;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async getItem({ resource, queryObj }:any) {
    try {
      await mongoose.connect(this.mongoDBUrl);

      const model = mongoose.model(resource);
      const result = await model.findOne(queryObj);
      return result;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async deleteItem({ resource, queryObj }:any) {
    try {
      await mongoose.connect(this.mongoDBUrl);
 
      const model = mongoose.model(resource);
      const result = await model.deleteOne(queryObj);
      return result;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }






  async getItemList( model :any) {
    try {
      await mongoose.connect(this.mongoDBUrl);
 
     
      let result;
   
        result = await model.find({}).sort({ createdAt: "desc" }).limit(200);
      
        return result;
     
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

 




  async findOne({ resource, queryObj }:any) {
    try {
      await mongoose.connect(this.mongoDBUrl);
    
      const model = mongoose.model(resource);
      return await model.findOne(queryObj);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async patchItem({ resource, filter, attributesToUpdate }:any) {
    try {
      await mongoose.connect(this.mongoDBUrl);
   
      const model = mongoose.model(resource);
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

 
  
  async getListOfItems({ resource, query }:any) {
    try {
      await mongoose.connect(this.mongoDBUrl);
  
      const model = mongoose.model(resource);
      const result = await model.find(query).sort({ createdAt: -1 })
      return result
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
