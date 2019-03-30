import axios from 'axios';
import { AUTHORIZE_USER } from './types';
import { BASE_URL, BASE_URL_USER_API, USER_SELF_API } from '../static/Urls';
import { returnToken } from '../utils/tokenUtils';

const authorizeUser = async (dispatch) => {
  const token = await returnToken();
  const res = await axios.get(BASE_URL + BASE_URL_USER_API + USER_SELF_API, {
    headers: { Authorization: token },
  });
  dispatch({ type: AUTHORIZE_USER, payload: res.data });
};

export const authorizeUserAndPush = (history) => async (dispatch) => {
  try {
    authorizeUser(dispatch);
    history.push('/home');
  } catch (error) {
    dispatch({ type: AUTHORIZE_USER, payload: null });
  }
};

export const authorizeUserWithoutPush = () => async (dispatch) => {
  try {
    authorizeUser(dispatch);
  } catch (error) {
    dispatch({ type: AUTHORIZE_USER, payload: null });
  }
};
