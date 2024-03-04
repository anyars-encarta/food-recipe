import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const RecipeItem = ({ item }) => (
  <div className="flex flex-col w-80 overflow-hidden p-5 bg-white/75 shadow-xl gap-5 border-2 rounded-2xl border-white">
    <div className="height-40 flex justify-center overflow-hidden items-center rounded-xl group">
      <img src={item?.image_url} alt="recipe item" className="block w-full group-hover:scale-105 duration-300" />
    </div>

    <div>
      <span className="text-sm text-cyan-700 font-medium">{item?.publisher}</span>
      <h3 className="font-bold text-2xl truncate text-black">{item?.title}</h3>
      <Link
        to={`/recipe-item/${item?.id}`}
        className="text-sm p-3 mt-5 px-8 rounded-lg uppercase font-medium tracking-wider inline-block shadow-medium bg-black text-white"
      >
        Recipe Details
      </Link>
    </div>
  </div>
);

RecipeItem.propTypes = {
  item: PropTypes.string.isRequired,
};

export default RecipeItem;
