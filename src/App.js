import react,{useEffect,useState} from 'react';
import Recipe from './Recipe';
import './App.css';

const App =() =>{

  const APP_ID='67a642d6';
  const APP_KEY='d685c7a0f2221353a49047a4f00173c6';

  const [recipes,setRecipes] =useState ([]);
  const [search,setSearch]=useState("");
  const [query,setQuery]=useState('chicken');

  

  useEffect(() => {
    getRecipes();
  },[query]);

  const getRecipes=async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data= await  response.json();
    setRecipes(data.hits);
   console.log(data.hits);
  }

  const updateSearch = e =>{
    setSearch(e.target.value);
    
  }

  const getSearch = e =>{
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

return (
    <div className='App'>
      
      
      <form onSubmit={getSearch} className='search-form'>
        <input className='search-bar' type='text' value={search} onChange={updateSearch}/>
        <button 
         className='search-button' type='submit'>
          search
        </button>
      </form>
      <h1 className='headtitle'>React-Recipe-App </h1>
      <p className='creator'>Created by Barath Kailash</p>
      <div className='recipes'>
      {recipes.map(recipe => (
        <Recipe
        key={recipe.recipe.label}
        title={recipe.recipe.label} 
        calories={recipe.recipe.calories}
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}
        />
      ))}
      </div>
      
    </div>
  );
};

function error(){
  return(
      <div className="alert alert-danger mx-5" role="alert">
          Please Enter city and country
      </div>
  );
}

export default App;
