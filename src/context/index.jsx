import { useState, createContext } from "react";

export const GlobalContext = createContext(null)

const GlobalState = ({ children }) => {
    const [searchParam, setSearchParam] = useState('')
    const [loading, setLoading] = useState(false)
    const [recipes, setRecipes] = useState(null)
    const [error, setError] = useState(null)

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true)
        try {
            const response = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`);
            const data = await response.json();

            console.log(data);
            setRecipes(data);

        } catch (e) {
            setLoading(false)
            setError(e.message) 
        }
    };

    return <GlobalContext.Provider value={{ searchParam, setSearchParam, handleSubmit }}>{children}</GlobalContext.Provider>
}

export default GlobalState;