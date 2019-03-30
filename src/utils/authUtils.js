import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';
import { returnToken } from './tokenUtils';

export const validateBearerToken = async () => {
  const token = await returnToken();
  if (!token) {
    console.log('sem token');
    return false;
  }
  const tokenWithoutBearer = token.split(' ')[1];
  const ver = verify(
    tokenWithoutBearer,
    authConfig.secret,
    (error, decoded) => {
      if (error) {
        console.log(error);
        console.log('Token invalido.');
        return false;
      }
      return true;
    },
  );
  return ver;
};
