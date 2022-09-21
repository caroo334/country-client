const initialState = {
  countries: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    //------
    case 'GET_COUNTRIES_TO_DB': {
      return {
        ...state,
        countries: action.payload
      }
    }
    //------
    case 'GET_COUNTRIES': {
      return {
        ...state,
        countries: action.payload
      }
    }

    case 'ORDER_BY_NAME': {
      let sortedArr = action.payload === 'asc' ?
        state.countries.sort(function (a, b) {

          if (a.name > b.name) {
            return 1;
          }
          if (b.name > a.name) {
            return -1;
          }
          return 0;
        }) :
        state.countries.sort(function (a, b) {
          if (a.name > b.name) {
            return -1
          }
          if (b.name > a.name) {
            return 1;
          }
          return 0;
        }
        )
      return {
        ...state,
        countries: sortedArr
      }
    }

    case 'GET_NAME_COUNTRIES':
      return {
        ...state,
        countries: action.payload
      }
    case 'POST_COUNTRY':
      return {
        ...state,
      }
    case 'GET_COUNTRY_CODE':
      return {
        ...state,
        countryByCode: action.payload[0]
      }


    default: return state;
  }
}

















/* const initialState = {
  countries: [],
  darkMode: false
}

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_COUNTRIES':
      return {
        ...state,
        countries: action.payload
      }

    case 'SET_DARKMODE':
      return {
        ...state,
        darkMode: !state.darkMode
      }
  }
}
 */



