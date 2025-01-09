import {z} from 'zod';
import {buildJsonSchemas} from'fastify-zod';

const bonusSchema = z.object({
    Amount:z.number(),
    createdAt:z.date(),
});

const bonusResponseSchema = z.object({
    Bonus_ID:z.number(),
    Amount:z.number(),
    createdAt:z.date(),
});

const bonusUpdateSchema = z.object({
    Bonus_ID:z.number(),
    Amount:z.number(),
});

const bonusDelSchema = z.object({
    Bonus_ID:z.number(),
});

const bonusResponsesSchema = z.array(bonusResponseSchema);

export type createbonusinput = z.infer<typeof bonusSchema>;

export type bonusupdate = z.infer<typeof bonusUpdateSchema>;

export type delBonusInput = z.infer<typeof bonusDelSchema>;


export const {schemas:bonusesSchema, $ref}= buildJsonSchemas({
bonusSchema,
bonusResponseSchema,
bonusUpdateSchema,
bonusResponsesSchema,
bonusDelSchema
},{ $id: "BonusesSchema" });