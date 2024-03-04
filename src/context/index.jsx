import { useState, createContext } from "react";

export const GlobalContext = createContext(null)

const GlobalState = ({ children }) => {
    const [searchParam, setSearchParam] = useState('')

    return <GlobalContext.Provider value={{ searchParam, setSearchParam }}>{children}</GlobalContext.Provider>
}

export default GlobalState;