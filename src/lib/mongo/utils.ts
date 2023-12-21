import { HTTP_RESOURCES } from "@/config/http-resources";
import { RESOURCE_SCHEMA_MAPPER } from "./schema";

export function getMongoSchema(schema: keyof typeof HTTP_RESOURCES) {
    const mongoSchema = RESOURCE_SCHEMA_MAPPER[schema]
    return mongoSchema;
}