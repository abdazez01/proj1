import dotenv from 'dotenv';
import bcryptjs from 'bcryptjs';

dotenv.config();

const PASSWORD_SALT = Number(process.env.PASSWORD_SALT) || 10;

export const hashPassword = async (password: string) => {
  const salt = await bcryptjs.genSalt(PASSWORD_SALT);
  return bcryptjs.hash(password, salt);
};

export const comparePassword = async (password: string, hash: string) =>
  bcryptjs.compare(password, hash);
