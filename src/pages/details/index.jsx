import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../../context";
import BaseUrl from "../../components/base-url";

const Details = () => {
    const {id} = useParams();
    const {recipeDetailsData, setRecipeDetailsData} = useContext(GlobalContext);

    const getRecipeDetails = async () => {
        const response = await fetch(`${BaseUrl.url}/${id}`)
        const data = await response.json();
        
        if(data?.data) {
            setRecipeDetailsData(data?.data);
        }

        console.log('details data', recipeDetailsData);
    };

    useEffect(() => {
        getRecipeDetails();
    }, []);

    return (
        <div>
            Details
            <p>{recipeDetailsData?.recipe?.publisher}</p>
        </div>
    )
}

export default Details;