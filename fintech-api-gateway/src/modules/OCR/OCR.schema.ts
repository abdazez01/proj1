import {z} from 'zod'
import {buildJsonSchemas} from'fastify-zod'

export const getImageSchema = z.object({
    Id:z.number()
});

export const sendImageSchema = z.object({
  ImageInBase64:z.string()
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
export type sendImageinput = z.infer<typeof sendImageSchema>;


export const {schemas:ocrsSchema, $ref}= buildJsonSchemas({
    ocrresponsSchema,
    sendImageSchema
    },{ $id: "ocrSchema" });