import uniqueData from "@/utils/getUniqueData";
import { FETCH_GITHUB_DATA_FAILED, FETCH_GITHUB_DATA_LOADING, FETCH_GITHUB_DATA_SUCCESS, SEND_INPUT_QUERY_PARAMS } from "../actions/actionTypes";
import getDataBasedOnCache from "@/utils/getDataBasedOnCache";

const initialState = {
  data: [],
  loading: false,
  error: null,
  cachesData: []
};

const githubDataReducer = (state = initialState, action) => {
  const distinctCachesData = uniqueData(state.cachesData);

  switch (action.type) {
    case FETCH_GITHUB_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
        cachesData: [...distinctCachesData, {
          inputQuery: action.payload.inputQuery,
          inputSelect: action.payload.inputSelect,
          inputPage: action.payload.inputPage,
          items: action.payload.items,
          total_count: action.payload.total_count
        }]
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
    case SEND_INPUT_QUERY_PARAMS:
      return {
        ...state,
        data: getDataBasedOnCache(state?.cachesData, [{
            inputQuery: action.payload.inputQuery,
            inputSelect: action.payload.inputSelect,
            inputPage: action.payload.inputPage,
          }]),
      };
    default:
      return state;
  }
};

export default githubDataReducer;