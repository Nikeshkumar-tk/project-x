import { env } from "@/env.mjs"
import { Document } from "mongodb"
import mongoose from "mongoose"

import { MongoCreateItem, MongoGetItem } from "@/types/mongo"

import { getMongoSchema } from "./utils"

export class MongoDAL {
  private static instance: MongoDAL
  private constructor() {
    this.init()
    // this.getItemList = this.getItemList.bind(this);
    this.createItem = this.createItem.bind(this)
  }

  async init() {
    await mongoose.connect(env.MONGODB_URI)
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new MongoDAL()
    }
    return this.instance
  }

  async createItem<T>({
    data,
    resource,
  }: MongoCreateItem): Promise<Document & T> {
    try {
<<<<<<< HEAD
      
      const model = getMongoSchema(resource);
      const result = await model.create(data);
      return result;
=======
      const model = getMongoSchema(resource)
      const result = await model.create(data)
      return result
>>>>>>> 9a53be68ae9c718baf4590090a6246c5f3efbf20
    } catch (err) {
      console.log(err)
      throw err
    }
  }

<<<<<<< HEAD

  async getItemList<T>({  resource }:MongoGetItem) {
=======
  async getItemList({ resource }: MongoGetItem) {
>>>>>>> 9a53be68ae9c718baf4590090a6246c5f3efbf20
    try {
      const model = mongoose.model(resource)
      const result = await model.find({})
      return result
    } catch (err) {
      console.log(err)
      throw err
    }
  }
}

export const mongo = MongoDAL.getInstance()
