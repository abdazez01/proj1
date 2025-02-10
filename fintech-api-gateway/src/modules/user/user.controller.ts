import { FastifyReply, FastifyRequest } from "fastify";
import { createUser, delUser, findUserByEmail, getUserInfo, getUserSalary, updateUserInfoInDatabase, updateUserPass, updateUserRecovryCode, updateUserVerification, updateUserVerificationCode } from "./user.service";
import { createUserInput, loginInput, passRCInput, updateUserSchema, verifySentInput, verifyUserInput } from "./user.schema";
import { comparePassword,generateVerificationCode, hashPassword } from "../../utils/hash";
import { server } from "../..";
import { delAllOCRForUser } from "../OCR/OCR.service";
import { delAllExpensesForUser, getAllExpensesPrice } from "../Expenses/Expenses.service";
import { sendRecoveryEmail, sendVerificationEmail } from '../../utils/verification';
import { delAllBonusesForUser, getAllBonusesPrice } from "../Bonuses/Bonuses.service";
import axios from 'axios';

export async function registerUserHandler(request:FastifyRequest<
    {
        Body: createUserInput;
    }
    >, reply:FastifyReply) {
    
    const body = request.body;

    try{
        const user = await createUser(body);

        return reply.code(201).send(user);
    }catch(e){
        console.log(e);
        return reply.code(500).send(e);
    }

}

export async function loginHandler(request:FastifyRequest<
    {
        Body: loginInput;
    }
    >, reply:FastifyReply) {
        const body= request.body

        const user = await findUserByEmail(body.Email)

        if(!user){
            return reply.code(401).send({
                message: "invalid email"
            });
        }

        const correctPassword = await comparePassword(body.HashedPassword,user.HashedPassword)

        if(correctPassword){
            const {HashedPassword,...rest}=user
            if(!user.EmailVerified){
                return reply.code(403).send({
                    message: "plz Verify your email"
                });
            }
            return {accessToken: server.jwt.sign(rest)}
        }
    else{
        return reply.code(401).send({
            message: "invalid password"
        });
    }
}

export async function getUserInfoHandler(request:FastifyRequest,reply:FastifyReply) 
{try{
const userInfo = await getUserInfo(request.user.ID)

return reply.code(201).send(userInfo);  
    }
    catch(e){
        console.log(e);
        return reply.code(500).send(e);
    }
}

export async function delUserHandler(request:FastifyRequest,reply:FastifyReply) 
{try{
    const delOcr = await delAllOCRForUser(request.user.ID)
    const delExpenses = await delAllExpensesForUser(request.user.ID)
    const delBonuses = await delAllBonusesForUser(request.user.ID)
    const delUsere = await delUser(request.user.ID)

return reply.code(201).send({
    message:"user deleted successfully"
})  
    }
    catch(e){
        console.log(e);
        return reply.code(500).send(e);
    }
}

export async function updateUserInfoHandler(request: FastifyRequest, reply: FastifyReply) {

    const ID = request.user.ID;

    const parsedResult = updateUserSchema.safeParse(request.body);

    if (!parsedResult.success) {
        return reply.status(400).send({ error: "Invalid input", details: parsedResult.error.errors });
    }

    const updates = parsedResult.data;

    try {
        const updatedUser = await updateUserInfoInDatabase(ID, updates);
        return reply.code(201).send(updatedUser);
    } catch (error) {
        console.error(error);
        return reply.status(500).send({ error: "An error occurred while updating user information." });
    }
}

export async function verificationSenderHandler(request: FastifyRequest<
    {
        Body: verifySentInput
    }
    >, reply: FastifyReply) {        
        const body= request.body

        const user = await findUserByEmail(body.Email)

        if(!user){
            return reply.code(401).send({
                message: "invalid email"
            });
        }
        const code= generateVerificationCode();
        try {
            await updateUserVerificationCode(body.Email, code);
            const EmailSent = await sendVerificationEmail(body.Email,code)
            return reply.code(201).send({EmailSent:EmailSent});
        } catch (error) {
            console.error(error);
            return reply.status(500).send({ error: "An error occurred while updating user information." });
        }

    
}

export async function verifiyUserHandler(
    request: FastifyRequest<{
        Body: verifyUserInput;
    }>,
    reply: FastifyReply
) {
    const body = request.body;

    const now = Date.now();

    const user = await findUserByEmail(body.Email);

    if (!user) {
        return reply.code(401).send({
            message: "Invalid email",
        });
    }

    if (user.VerificationExpiry === null) {
        console.log("Verification code has expired or is invalid");
        return reply.code(401).send({
            Emailverify: false,
        });
    }

    if (user.VerificationCode !== body.Code.toLowerCase()) {
        console.log("Invalid verification code");
        return reply.code(401).send({
 
            Emailverify: false,
        });
    }

    if (user.VerificationExpiry.getTime() < now) {
        console.log("Verification code has expired");

        return reply.code(401).send({
            Emailverify: false,
        });
    }
    const updatedUser = await updateUserVerification(user.Email,true);

    if(!updatedUser){
        console.log("Something Went Wrong");

        return reply.code(401).send({
            Emailverify: false,
        });
    }

    return reply.code(201).send({
        Emailverify: true,
    });
}

export async function userFinHandler(request: FastifyRequest, reply: FastifyReply) {
    try {
        const allPriceExpensesForUser = await getAllExpensesPrice(request.user.ID);
        const userSalaryResult = await getUserSalary(request.user.ID);
        const allPriceBonusesForUser = await getAllBonusesPrice(request.user.ID);

        if (!userSalaryResult ||!allPriceBonusesForUser|| userSalaryResult.Salary === 0) {
            return reply.status(400).send({ error: "Salary not found or is zero" });
        }
        const totalExpenses = allPriceExpensesForUser.reduce(
            
            (sum, expense) => sum + expense.Price * expense.Item_Count, 
            0
        );

        const totalBonuses = allPriceBonusesForUser.reduce(
            
            (sum, bonus) => sum +  bonus.Amount ,0
        );
        const percentage = (totalExpenses / (userSalaryResult.Salary+totalBonuses)) * 100;
        const balance =((userSalaryResult.Salary+totalBonuses)-(totalExpenses));


        return reply.code(201).send({
            totalExpenses,
            totalBonuses,
            balance,
            salary: userSalaryResult.Salary,
            percentage: percentage.toFixed(2),
        });
    } catch (error) {
        return reply.status(500).send({ error: "An error occurred while calculating percentage" });
    }
}

export async function recoverySenderHandler(request: FastifyRequest<
    {
        Body: verifySentInput
    }
    >, reply: FastifyReply) {        
        const body= request.body

        const user = await findUserByEmail(body.Email)

        if(!user){
            return reply.code(401).send({
                message: "invalid email"
            });
        }
        const code= generateVerificationCode();
        try {
            await updateUserRecovryCode(body.Email, code);
            const EmailSent = await sendRecoveryEmail(body.Email,code)
            return reply.code(201).send({EmailSent:EmailSent});
        } catch (error) {
            console.error(error);
            return reply.status(500).send({ error: "An error occurred while updating user information." });
        }

    
}

export async function recoverUserHandler(
    request: FastifyRequest<{
        Body: passRCInput;
    }>,
    reply: FastifyReply
) {
    const body = request.body;

    const now = Date.now();

    const user = await findUserByEmail(body.Email);

    if (!user) {
        return reply.code(401).send({
            message: "Invalid email",
        });
    }

    if (user.AskForRecovery === false) {
        console.log("Error");
        return reply.code(401).send({
            userRecoverd: false,
        });
    }

    if (user.RecoveryExpiry === null) {
        console.log("Verification code has expired or is invalid");
        return reply.code(401).send({
            userRecoverd: false,
        });
    }

  

    if (user.RecoveryCode !== body.Code.toLowerCase()) {
        console.log("Invalid verification code");
        return reply.code(401).send({
 
            userRecoverd: false,
        });
    }

    if (user.RecoveryExpiry.getTime() < now) {
        console.log("Verification code has expired");

        return reply.code(401).send({
            userRecoverd: false,
        });
    }
    const newps= await hashPassword(body.NewPassword);
    const updatedUser = await updateUserPass(user.Email,newps);

    if(!updatedUser){
        console.log("Something Went Wrong");

        return reply.code(401).send({
            userRecoverd: false,
        });
    }

    return reply.code(201).send({
        userRecoverd: true,
    });
}

export async function recommendUserHandler(request: FastifyRequest, reply: FastifyReply){
    try {
        const response = await axios.get('http://localhost:8080/', {
            headers: { Origin: 'https://localhost:3000' }
          });
        reply.code(201).send(response.data);
      } catch (error: any) {
        reply.code(500).send({ error });
      }
}