const initialState = {
  countries: [],
  countriesCopy: [],
  activities: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    //------
    case 'GET_COUNTRIES_TO_DB': {
      return {
        ...state,
        countries: action.payload,
        countriesCopy: action.payload
      }
    }
    //------
    case 'GET_COUNTRIES': {
      const continents = action.payload.map(c => c.continents)
      const continentsFiltered = [...new Set(continents)];

      return {
        ...state,
        countries: action.payload,
        continents: continentsFiltered,
        countriesCopy: action.payload
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

    case 'ORDER_BY_POPULATION':
      let sort = action.payload === 'low' ?
        state.countries.sort(function (a, b) {
          if (a.population > b.population) {
            return 1;
          }
          if (b.population > a.population) {
            return -1;
          }
          return 0;
        }) :
        state.countries.sort(function (a, b) {
          if (a.population > b.population) {
            return -1
          }
          if (b.population > a.population) {
            return 1;
          }
          return 0;
        }
        )
      return {
        ...state,
        countries: sort
      }

    case 'GET_NAME_COUNTRIES':
      return {
        ...state,
        countries: action.payload
      }
    case 'POST_ACTIVITY':
      return {
        ...state,
      }
    case 'GET_COUNTRY_CODE':
      return {
        ...state,
        countryByCode: action.payload[0],
        activities: action.payload[0].Activities
      }
    case 'FILTER_COUNTRIRES_BY_ACTIVITY':
      switch (action.payload) {
        case 'all':
          return {
            ...state,
            countries: state.countriesCopy
          }

        case "with-activity":
          const countriesWithActivities = state.countriesCopy.filter(country => country.Activities.length > 0)

          return {
            ...state,
            countries: countriesWithActivities
          }

        case "without-activity":
          const countriesWithoutActivities = state.countriesCopy.filter(country => country.Activities.length === 0)


          return {
            ...state,
            countries: countriesWithoutActivities
          }

        default:
          return {
            ...state,
          }
      }

    case 'FILTER_COUNTRIRES_BY_CONTINENT':

      if (action.payload === 'all') {
        return {
          ...state,
          countries: state.countriesCopy
        }
      }

      const countriesfilteredByContinent = state.countriesCopy.filter(country => country.continents === action.payload);

      return {
        ...state,
        countries: countriesfilteredByContinent
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



