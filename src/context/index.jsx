import { useState, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import BaseUrl from '../components/base-url';

export const GlobalContext = createContext(null);

const GlobalState = ({ children }) => {
  const [searchParam, setSearchParam] = useState('');
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [recipeDetailsData, setRecipeDetailsData] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${BaseUrl.url}?search=${searchParam}`);
      const data = await response.json();

      if (data?.data?.recipes) {
        setRecipes(data?.data?.recipes);
        setLoading(false);
        setSearchParam('');
        navigate('/');
      }
    } catch (e) {
      setLoading(false);
      setError(e.message);
      setSearchParam('');
    }
  };

  const handleAddToFavorites = (getCurrentItem) => {
    const copyFavorites = [...favorites];
    const index = copyFavorites.findIndex((item) => item.id === getCurrentItem.id);

    if (index === -1) {
      copyFavorites.push(getCurrentItem);
    } else {
      copyFavorites.splice(index);
    }

    setFavorites(copyFavorites);
  };

  return (
    <GlobalContext.Provider
      value={{
        searchParam,
        setSearchParam,
        loading,
        recipes,
        error,
        handleSubmit,
        recipeDetailsData,
        setRecipeDetailsData,
        handleAddToFavorites,
        favorites,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

GlobalState.propTypes = {
  children: PropTypes.string.isRequired,
};

export default GlobalState;
