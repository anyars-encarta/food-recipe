import { useState, createContext } from "react";

export const GlobalContext = createContext(null)

const GlobalState = ({ children }) => {
    const [searchParam, setSearchParam] = useState('');
    const [loading, setLoading] = useState(false);
    const [recipes, setRecipes] = useState([]);
    const [error, setError] = useState(null);
    const [recipeDetailsData, setRecipeDetailsData] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true)
        try {
            const response = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`);
            const data = await response.json();

            if (data?.data?.recipes) {
                setRecipes(data?.data?.recipes);
                setLoading(false)
                setSearchParam('')
            }

        } catch (e) {
            setLoading(false)
            setError(e.message)
            setSearchParam('')
        }
    };

    return <GlobalContext.Provider
        value={{
            searchParam,
            setSearchParam,
            loading,
            recipes,
            error,
            handleSubmit,
            recipeDetailsData,
            setRecipeDetailsData
        }}>
        {children}
    </GlobalContext.Provider>
}

export default GlobalState;