import { AUTHORIZE_USER } from '../actions/types';

export default function (state = null, action) {
  switch (action.type) {
    case AUTHORIZE_USER:
      return action.payload || false;
    default:
      return state;
  }
}
