import {z} from 'zod'
import {buildJsonSchemas} from'fastify-zod'

export const getImageSchema = z.object({
    Id:z.number()
});

const ocrSchema = z.object({
    ExpenseName:z.string(),
    Price:z.number(),
    createdAt:z.date(),
    Category:z.string(),
    Item_Count:z.number(),
  });
  const ocrresponsSchema = z.object({
    responss:z.array(ocrSchema)
  })
export type getImageinput = z.infer<typeof getImageSchema>;

export const {schemas:ocrsSchema, $ref}= buildJsonSchemas({
    ocrresponsSchema
    
    },{ $id: "ocrSchema" });