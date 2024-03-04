import { useState, createContext } from "react";
import BaseUrl from "../components/base-url";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext(null)

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
        setLoading(true)
        try {
            const response = await fetch(`${BaseUrl.url}?search=${searchParam}`);
            const data = await response.json();

            if (data?.data?.recipes) {
                setRecipes(data?.data?.recipes);
                setLoading(false)
                setSearchParam('')
                navigate('/')
            }

        } catch (e) {
            setLoading(false)
            setError(e.message)
            setSearchParam('')
        }
    };

    const handleAddToFavorites =(getCurrentItem) => {
        console.log(getCurrentItem);
        let copyFavorites = [...favorites];
        const index = copyFavorites.findIndex(item => item.id === getCurrentItem.id);

        if(index === -1) {
            copyFavorites.push(getCurrentItem)
        } else {
            copyFavorites.splice(index)
        }

        setFavorites(copyFavorites)
    }

    console.log('Favorites List', favorites);

    return <GlobalContext.Provider
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
            favorites
        }}>
        {children}
    </GlobalContext.Provider>
}

export default GlobalState;