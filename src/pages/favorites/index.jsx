import { useContext } from 'react';
import { GlobalContext } from '../../context';
import RecipeItem from '../../components/recipe-item';

const Favorites = () => {
  const { favorites } = useContext(GlobalContext);

  return (
    <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
      {
                favorites && favorites.length > 0
                // eslint-disable-next-line
                  ? favorites.map((item) => <RecipeItem item={item} />)
                  : (
                    <div>
                      <h3 className="lg:text-4xl text-xl text-center text-black font-extrabold">Nothing added to favorites list. Come back later!</h3>
                    </div>
                  )
            }
    </div>

  );
};

export default Favorites;
