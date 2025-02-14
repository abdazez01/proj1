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

const recommendSchema = z.object({
    "Ticker": z.string(),
    "Close": z.number(),
    "Prob_Buy": z.number(),
    "Date": z.date()
});

const recommendedSchema = z.object({
    "Recommendations":z.array(recommendSchema)
});

export const updateUserSchema = z.object({
    UserName: z.string().optional(),
    Location: z.string().optional(),
    Salary: z.number().optional(),
    Currency: z.string().optional(),
});

export const verifySentSchema = z.object({
    Email: z.string(
        {
            required_error: 'Email is required',
            invalid_type_error: 'Email must be a string'
        }
    ).email(),
});

export const verifySentResponseSchema = z.object({
    EmailSent:z.boolean()
});


export const verifyUserSchema = z.object({
    Email: z.string(
        {
            required_error: 'Email is required',
            invalid_type_error: 'Email must be a string'
        }
    ).email(),
    Code:z.string()
});

export const verifyUserResponseSchema = z.object({
    Emailverify:z.boolean()
});

export const finInfoSchema = z.object({
    totalExpenses: z.number(),
    totalBonuses:z.number(),
    balance:z.number(),
    salary: z.number(),
    percentage:z.string(),
  });

export const recoverPassword=z.object({
    Email: z.string(
        {
            required_error: 'Email is required',
            invalid_type_error: 'Email must be a string'
        }
    ).email(),
    NewPassword :z.string(        {
        required_error: 'Password is required',
        invalid_type_error: 'Password must be a string'
    }),
    Code:z.string()
})

export const recoverUserResponseSchema = z.object({
    userRecoverd:z.boolean()

});





export const noooooSchema = z.object({
    question:z.string()

});

export const TokenLogProbSchema = z.object({
    token: z.string(),
    logprob: z.number(),
    bytes: z.array(z.number()),
    top_logprobs: z.array(z.any()),
  });
  
  export const LogProbsSchema = z.object({
    content: z.array(TokenLogProbSchema),
    refusal: z.array(z.any()), 
  });
  
  export const MessageSchema = z.object({
    role: z.string(), 
    content: z.string(),
    refusal: z.nullable(z.string()), 
  });
  
  export const ChoiceSchema = z.object({
    logprobs: LogProbsSchema,
    finish_reason: z.string(),
    native_finish_reason: z.string(),
    index: z.number(),
    message: MessageSchema,
  });
  
  export const UsageSchema = z.object({
    prompt_tokens: z.number(),
    completion_tokens: z.number(),
    total_tokens: z.number(),
  });
  
  export const DeepSeekAPIResponseSchema = z.object({
    id: z.string(),
    provider: z.string(),
    model: z.string(),
    object: z.string(),
    created: z.number(),
    choices: z.array(ChoiceSchema),
    usage: UsageSchema,
  });







export type UpdateUserInput = z.infer<typeof updateUserSchema>;

export type createUserInput = z.infer<typeof createUserSchema>;

export type loginInput = z.infer<typeof loginSchema>;

export type verifySentInput = z.infer<typeof verifySentSchema>;

export type verifyUserInput = z.infer<typeof verifyUserSchema>;

export type passRCInput = z.infer<typeof recoverPassword>;


export const {schemas:userSchema, $ref}= buildJsonSchemas({
    createUserSchema,
    createUserResponseSchema,
    loginSchema,
    loginResponseSchema,
    returnuserinfo,
    updateUserSchema,
    verifySentSchema,
    verifySentResponseSchema,
    verifyUserResponseSchema,
    verifyUserSchema,
    finInfoSchema,
    recoverPassword,
    recoverUserResponseSchema,
    recommendedSchema,
    DeepSeekAPIResponseSchema,
    noooooSchema
},{ $id: "UserSchema" });