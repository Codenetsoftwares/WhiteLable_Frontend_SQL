import { getAdminInitialState } from '../Utils/service/initiateState';
import strings from '../Utils/constant/stringConstant';


export const reducer = (state, action) => {
  switch (action.type) {

    case strings.LOG_IN:
      return { ...state, admin: getAdminInitialState(action.payload) };
    case strings.LOG_OUT:
      return {
        ...state,
        admin: getAdminInitialState({ isLogin: false }),
      };

    default:
      return state;
  }
};
