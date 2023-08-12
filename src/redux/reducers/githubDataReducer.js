import { FETCH_GITHUB_DATA_FAILED, FETCH_GITHUB_DATA_LOADING, FETCH_GITHUB_DATA_SUCCESS } from "../actions/actionTypes";

const initialState = {
  data: [],
  loading: false,
  error: null
};

const githubDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_GITHUB_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_GITHUB_DATA_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_GITHUB_DATA_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default githubDataReducer;