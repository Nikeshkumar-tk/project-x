import { HTTP_RESOURCES } from "@/config/http-resources";


export interface IMongoDALCreateArg{
    data:any; 
    constraints?:{unique:Array<object>}
}

export interface IMongoDALQueryArg{
    filter:any; 
    skip?: number;
    limit?:number;
}

export interface IMongoDALPatchArg{
    filter:any; 
    data: any;
    constraints?:{unique:Array<string>}
}

export interface IMongoDALDeleteArg{
    filter:any;
}


export type MongoCreateItem = {
    resource:keyof typeof HTTP_RESOURCES,
    data:Record<string,any>,
}
export type MongoGetItem = {
    resource:keyof typeof HTTP_RESOURCES,
   
}