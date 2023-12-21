import { env } from "@/env.mjs";
import { MongoCreateItem, MongoGetItem } from "@/types/mongo";
import mongoose from "mongoose";
import { Document } from "mongodb";
import { getMongoSchema } from "./utils";



export class MongoDAL {
  private static instance: MongoDAL;
  private constructor() {
    this.init()
    // this.getItemList = this.getItemList.bind(this);
    this.createItem = this.createItem.bind(this);
  }

  async init(){
    await mongoose.connect(env.MONGODB_URI)
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new MongoDAL();
    }
    return this.instance;
  }

  async createItem<T>({ data, resource }: MongoCreateItem): Promise<Document & T> {
    try {
      const model = getMongoSchema(resource);
      const result = await model.create(data);
      return result;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }


  async getItemList<T>({  resource }:MongoGetItem) {
    try {
      const model = mongoose.model(resource);
      const result = await model.find({});
      return result;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

}

export const mongo =  MongoDAL.getInstance();

