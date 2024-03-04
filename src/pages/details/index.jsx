import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GlobalContext } from '../../context';
import BaseUrl from '../../components/base-url';

const Details = () => {
  const { id } = useParams();
  const {
    recipeDetailsData, setRecipeDetailsData, favorites, handleAddToFavorites,
  } = useContext(GlobalContext);

  const getRecipeDetails = async () => {
    const response = await fetch(`${BaseUrl.url}/${id}`);
    const data = await response.json();

    if (data?.data) {
      setRecipeDetailsData(data?.data);
    }
  };

  useEffect(() => {
    getRecipeDetails();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container mx-auto py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div className="row-start-2 lg:row-start-auto">
        <div className="h-96 overflow-hidden rounded-xl group">
          <img
            src={recipeDetailsData?.recipe?.image_url}
            className="w-full h-full object-cover block group-hover:scale-105 duration-300"
            alt="recipe"
          />
        </div>
      </div>

      <div className="flex flex-col gap 3">
        <span className="text-sm text-cyan-700 font-medium">{recipeDetailsData?.recipe?.publisher}</span>
        <h3 className="font-bold text-2xl truncate text-black">{recipeDetailsData?.recipe?.title}</h3>

        <div>
          <button
            type="button"
            onClick={() => handleAddToFavorites(recipeDetailsData?.recipe)}
            className="p-3 px-8 rounded-lg text-sm uppercase font-medium tracking-wider mt-3 inline-block shadow-medium bg-black text-white"
          >
            {
              // eslint-disable-next-line
              favorites && favorites.length > 0 && favorites.findIndex((item) => item.id === recipeDetailsData?.recipe?.id) !== -1
                ? 'Remove from Favorites'
                : 'Add to Favorites'
            }
          </button>
        </div>

        <div>
          <span className="text-2xl font-semibold text-black">Ingedients:</span>
          <ul className="flex flex-col gap-3">
            {
              recipeDetailsData?.recipe?.ingredients.map((ingredient) => (
                <li key={ingredient.id}>
                  <span className="text-2xl font-semibold text-black">
                    {ingredient.quantity}
                    {' '}
                    {ingredient.unit}
                  </span>
                  <span className="text-2xl font-semibold text-black">{ingredient.description}</span>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Details;
