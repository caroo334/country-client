import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postActivity } from "../redux/actions";
import { Link, useNavigate } from "react-router-dom";
import "../styles/createActivity.css";

const CreateActivity = () => {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    name: {
      value: "",
      error: null,
    },
    countries: {
      value: [],
      error: null,
    },
    difficulty: {
      value: "",
      error: null,
    },
    duration: {
      value: "",
      error: null,
    },
    season: {
      value: "",
      error: null,
    },
  });

  const handleChangeCoutriesSelect = (e) => {
    setFormState((prevState) => ({
      ...prevState,
      countries: {
        value: [...new Set([...prevState.countries.value, countries[e.target.value]])],
      },
    }));
  };

  const handleBlurCountriesSelect = (e) => {
    if (e.target.value.length === 0) {
      setFormState((prevState) => ({
        ...prevState,
        countries: {
          value: prevState.countries.value,
          error: "Este campo es requerido",
        },
      }));
    }
  };

  const handleChange = (e) => {
    setFormState((prevState) => ({
      ...prevState,
      [e.target.name]: {
        value: e.target.value,
      },
    }));
  };

  const handleBlur = (e) => {
    if (e.target.value === "") {
      setFormState((prevState) => ({
        ...prevState,
        [e.target.name]: {
          value: prevState[e.target.name].value,
          error: "Este campo es requerido",
        },
      }));
    }
  };

  const handleDeleteCountry = (country) => {
    setFormState((prevState) => ({
      ...prevState,
      countries: {
        ...prevState.countries,
        value: prevState.countries.value.filter((c) => c !== country),
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = Object.values(formState).every(
      (field) => field.error !== null
    );

    if (isValid) {
      dispatch(postActivity(formState));
      navigate("/home");
    } else {
      alert(
        "Debe completar todos los campos antes de interntar crear la actividad!"
      );
    }
  };

  return (
    <div className="create-container">
        <div className="create-container-sub">
      <Link to="/home">
        <button className="create-button">Home</button>
      </Link>

      <form onSubmit={handleSubmit} className="create-form">
        <div className="form-control">
          <label htmlFor="name">Nombre</label>
          <input
            name="name"
            id="name"
            type="text"
            placeholder="Sky sobre Hielo"
            onChange={handleChange}
            onBlur={handleBlur}
            value={formState.name.value}
            className="create-label"
          />
          {formState.name.error && (
            <span className="form-control-error">{formState.name.error}</span>
          )}
        </div>

        <div className="form-control">
          <label htmlFor="countries">Paises</label>
          <select
            name="countries"
            id="countries"
            onChange={handleChangeCoutriesSelect}
            onBlur={handleBlurCountriesSelect}
            className="create-label"
          >
            <option value="">Seleccionar</option>
            {countries.length > 0 &&
              countries.map((country, index) => (
                <option key={`${country.name}_${index}`} value={index}>
                  {country.name}
                </option>
              ))}
          </select>
          {formState.countries.error && (
            <span className="form-control-error">
              {formState.countries.error}
            </span>
          )}
        </div>

        <div className="form-control">
          <label htmlFor="difficulty">Dificultad</label>
          <select
            name="difficulty"
            id="difficulty"
            onChange={handleChange}
            onBlur={handleBlur}
            value={formState.difficulty.value}
            className="create-label"
          >
            <option value="">Seleccionar</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          {formState.difficulty.error && (
            <span className="form-control-error">
              {formState.difficulty.error}
            </span>
          )}
        </div>

        <div className="form-control">
          <label htmlFor="season">Temporada</label>
          <select
            name="season"
            id="season"
            onChange={handleChange}
            onBlur={handleBlur}
            value={formState.season.value}
            className="create-label"
          >
            <option value="">Seleccionar</option>
            <option value="primavera">Primavera</option>
            <option value="verano">Verano</option>
            <option value="otonio">Otoño</option>
            <option value="invierno">Invierno</option>
          </select>
          {formState.season.error && (
            <span className="form-control-error">{formState.season.error}</span>
          )}
        </div>

        <div className="form-control">
          <label htmlFor="duration">Duración</label>
          <input
            name="duration"
            id="duration"
            type="time"
            placeholder="Sky sobre Hielo"
            onChange={handleChange}
            onBlur={handleBlur}
            value={formState.duration.value}
            className="create-label"
          />
          {formState.duration.error && (
            <span className="form-control-error">
              {formState.duration.error}
            </span>
          )}
        </div>

        <div className="form-control">
          <button type="submit" className="create-button">Crear Actividad</button>
        </div>
      </form>
      </div>

      <div className="countries-list">
        <h3>Paises en donde funcioan esta actividad: </h3>
        {formState.countries.value.length > 0 ? (
          formState.countries.value.map((country, index) => (
            <div className="country-item" key={`${country.id}_${index}`}>
              <span>{country.name}</span>
              <button onClick={() => handleDeleteCountry(country)} className="button-x">x</button>
            </div>
          ))
        ) : (
          <span>No se seleccionaron paises, aun</span>
        )}
      </div>

    </div>
  );
};

export { CreateActivity };
