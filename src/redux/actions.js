import axios from "axios";

////// ----------------------------------------------
// Para Cargar en la Base de Datos
export function getCountriesToDb() {
  return async function (dispatch) {
    const { data } = await axios.get(
      `${process.env.REACT_APP_MY_API_URL}/countriesFromDB/initial-data`
    );

    return dispatch({
      type: "GET_COUNTRIES_TO_DB",
      payload: data,
    });
  };
}

////// ----------------------------------------------

export function getCountries() {
  return async function (dispatch) {
    const { data } = await axios.get(
      `${process.env.REACT_APP_MY_API_URL}/countriesFromDB`
    );

    return dispatch({
      type: "GET_COUNTRIES",
      payload: data,
    });
  };
}

//DETAIL
export function getCountryByCode(code) {
  return async function (dispatch) {
    const { data } = await axios.get(
      `${process.env.REACT_APP_MY_API_URL}/countriesFromDB/${code}`
    );

    return dispatch({
      type: "GET_COUNTRY_CODE",
      payload: data,
    });
  };
}

//FILTRADO ALFABETICO
export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}

export function orderByPopulation(payload) {
  return {
    type: "ORDER_BY_POPULATION",
    payload,
  };
}

//SEARCHBAR
export function getNameCountries(name) {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_MY_API_URL}/countriesFromDB`,
        {
          params: {
            name: name,
          },
        }
      );
      return dispatch({
        type: "GET_NAME_COUNTRIES",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

//AUN NO ANDA
export function postActivity(payload) {
  return async function (dispatch) {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_MY_API_URL}/countriesFromDB`,
        payload
      );
      console.log(response);
      return dispatch({
        type: "POST_ACTIVITY",
        payload: response.data,
      });
    } catch (error) {
        alert('Hubo un error')
        return(error);
    }
  };
}

export function getCountriesFilteredByActivities(payload) {
  return async function (dispatch) {
    return dispatch({
      type: "FILTER_COUNTRIRES_BY_ACTIVITY",
      payload,
    });
  };
}

export function getCountriesFilteredByContinent(payload) {
  return async function (dispatch) {
    return dispatch({
      type: "FILTER_COUNTRIRES_BY_CONTINENT",
      payload,
    });
  };
}
