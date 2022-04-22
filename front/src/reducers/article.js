export const initialState = {
  articleAddLoading: false,
  articleAddDone: false,
  articleAddError: null,
  articleAdd: null,
  articleListLoading: false,
  articleListDone: false,
  articleListError: null,
  articleList: null,
}

export const ARTICLE_ADD_REQUEST = 'ARTICLE_ADD_REQUEST'
export const ARTICLE_ADD_SUCCESS = 'ARTICLE_ADD_SUCCESS'
export const ARTICLE_ADD_FAILURE = 'ARTICLE_ADD_FAILURE'

export const ARTICLE_LIST_REQUEST = 'ARTICLE_LIST_REQUEST'
export const ARTICLE_LIST_SUCCESS = 'ARTICLE_LIST_SUCCESS'
export const ARTICLE_LIST_FAILURE = 'ARTICLE_LIST_FAILURE'

export const articleAddRequestAction = (data) => {
  return {
    type: ARTICLE_ADD_REQUEST,
    data,
  }
}

export const articleListRequestAction = (data) => {
  return {
    type: ARTICLE_LIST_REQUEST,
    data: data.userId,
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ARTICLE_ADD_REQUEST:
      return {
        ...state,
        articleAddLoading: true,
        articleAddError: null,
        articleAddDone: false,
      }
    case ARTICLE_ADD_SUCCESS:
      return {
        ...state,
        articleAddLoading: false,
        articleAddDone: true,
        articleAdd: action.data,
      }
    case ARTICLE_ADD_FAILURE:
      return {
        ...state,
        articleAddLoading: false,
        articleAddError: action.error,
      }
    case ARTICLE_LIST_REQUEST:
      return {
        ...state,
        articleListLoading: true,
        articleListError: null,
        articleListDone: false,
      }
    case ARTICLE_LIST_SUCCESS:
      return {
        ...state,
        articleListLoading: false,
        articleListDone: true,
        articleList: action.data,
      }
    case ARTICLE_LIST_FAILURE:
      return {
        ...state,
        articleListLoading: false,
        articleListError: action.error,
      }
    default:
      return state
  }
}

export default reducer
