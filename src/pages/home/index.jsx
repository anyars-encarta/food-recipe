import { useContext } from "react";
import { GlobalContext } from "../../context";
import RecipeItem from "../../components/recipe-item";

const Home = () => {
    const { loading, recipes, error } = useContext(GlobalContext);

    if (loading) {
        return <h3 className='lg:text-4xl text-xl text-center text-black'>Loading...</h3>
    };

    if (error) {
        return <h3 className='lg:text-4xl text-xl text-center text-black'>Oops! Something went wrong. Please try our search again</h3>
    };

    return (
        <div className='py-8 container mx-auto flex flex-wrap justify-center gap-10'>
            {
                recipes && recipes.length > 0 ?
                    recipes.map(item => <RecipeItem item={item} />)
                    : <div>
                        <h3 className='lg:text-4xl text-xl text-center text-black font-extrabold'>Nothing to show. Please search another recipe</h3>
                    </div>
            }
        </div>

    )
}

export default Home;