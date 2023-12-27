import { env } from "@/env.mjs"
import mongoose, { ObjectId } from "mongoose"

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
  }: MongoCreateItem): Promise<{ _id: ObjectId } & T> {
    try {
 
      const model = getMongoSchema(resource)
      const result = await model.create(data)
      return result
    } catch (err) {
      console.log(err)
      throw err
    }
  }

  async getItemList({ resource }: MongoGetItem) {
    try {
      const model = getMongoSchema(resource)
      const result = await model.find({})
      return result
    } catch (err) {
      console.log(err)
      throw err
    }
  }
}

export const mongo = MongoDAL.getInstance()
