import mongoose from "mongoose"

import { MongoCreateItem } from "@/types/mongo"
import { getEnv } from "@/config/env"

import { initializeSchemas } from "./schema"

const env = getEnv()
mongoose.connect(env.MONGODB_URI)

initializeSchemas()

export class MongoDAL {
  constructor() {
    // this.getItemList = this.getItemList.bind(this);
    this.createItem = this.createItem.bind(this)
  }

  async createItem({ data, resource }: MongoCreateItem) {
    try {
      const model = mongoose.model(resource)
      const result = await model.create(data)
      return result
    } catch (err) {
      console.log(err)
      throw err
    }
  }

  // async getItemList(model: any) {
  //   try {
  //     await mongoose.connect(this.mongoDBUrl);

  //     let result;

  //     result = await model.find({}).sort({ createdAt: "desc" }).limit(200);

  //     return result;

  //   } catch (err) {
  //     console.log(err);
  //     throw err;
  //   }
  // }
}

export const mongo = new MongoDAL()
