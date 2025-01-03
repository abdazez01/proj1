import {z} from 'zod'
import {buildJsonSchemas} from'fastify-zod'


const createUserSchema = z.object({
    Email: z.string(
        {
            required_error: 'Email is required',
            invalid_type_error: 'Email must be a string'
        }
    ).email(),
    HashedPassword :z.string(        {
        required_error: 'Password is required',
        invalid_type_error: 'Password must be a string'
    }),
    UserName: z.string(),
    Age: z.number(),
    Location: z.string(),
    Salary: z.number(),
    Currency: z.string(),
    Gender: z.boolean(),
});

const createUserResponseSchema = z.object({

    UserName: z.string(),
    Age: z.number(),
    Location: z.string(),
    Salary: z.number(),
    Currency: z.string(),
    Gender: z.boolean(),
});

const returnuserinfo = z.object({
    Email: z.string().optional(),
    UserName: z.string().optional(),
    Age: z.number().optional(),
    Location: z.string().optional(),
    Salary: z.number().optional(),
    Currency: z.string().optional(),
    Gender: z.boolean().optional(),
});

const loginSchema = z.object({
    Email: z.string(
        {
            required_error: 'Email is required',
            invalid_type_error: 'Email must be a string'
        }
    ).email(),
    HashedPassword :z.string(        {
        required_error: 'Password is required',
        invalid_type_error: 'Password must be a string'
    }),
});

const loginResponseSchema = z.object({
 accessToken: z.string(),
});

export const updateUserSchema = z.object({
    UserName: z.string().optional(),
    Location: z.string().optional(),
    Salary: z.number().optional(),
    Currency: z.string().optional(),
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>;

export type createUserInput = z.infer<typeof createUserSchema>;

export type loginInput = z.infer<typeof loginSchema>;

export const {schemas:userSchema, $ref}= buildJsonSchemas({
    createUserSchema,
    createUserResponseSchema,
    loginSchema,
    loginResponseSchema,
    returnuserinfo,
    updateUserSchema
},{ $id: "UserSchema" });