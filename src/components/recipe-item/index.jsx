const RecipeItem = ({item}) => {
    return (
    <div className='flex flex-col w-80 overflow-hidden p-5 bg-white/75 shadow-xl gap-5 border-2 rounded-2xl border-white'>
        <div className='height-40 flex justify-center overflow-hidden items-center rounded-xl'>
            <img src={item?.image_url} alt="recipe item" className='block w-full'/>

        </div>
    </div>)
}

export default RecipeItem;