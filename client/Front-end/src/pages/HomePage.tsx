import Navbar from "../components/core/navbar/Navbar";
import chefs_hat from "../assets/chefs_hat.png";
import OptionCard from "../components/Homepage/OptionCard";
import Pantry_image from "../assets/pantry.png";
import Recipe_book_image from "../assets/recipe_book.png";
import Meal_planner_image from "../assets/meal_planner.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <section className="w-[100vw] flex  justify-center">
        <div className="flex flex-col content-center items-end pt-6">
          <div className="width">
            <img src={chefs_hat} className="w-10" />
          </div>
          <div className="text-center ">
            <h1 className="text-black text-[40px] font-bold font-sans capitalize leading-[60px]">
              RecipeForMe
            </h1>
          </div>
        </div>
      </section>

      <section className="w-[100vw] flex justify-center p-2 ">
        <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[22vw] mr-5 "
          placeholder="search for a recipe"
          required
        />
        <div className="h-10 px-4 py-5 bg-[#795548] rounded-lg  shadow-[0px_4px_6px_-1px_rgba(33,33,33,0.20)] justify-center items-center  inline-flex">
          <button className="w-4 h-6 overflow-hidden">
            <FontAwesomeIcon icon={faSearch} style={{ color: "white" }} />
          </button>
        </div>
      </section>

      <h2 className="text-black text-3xl font-normal font-sans leading-4 text-center mt-10">
        Start by choosing your cooking plan
      </h2>

      <section className="flex mt-20 mx-20 justify-around">
        <OptionCard
          name="My pantry"
          buttonColor="#81C784"
          image={Pantry_image}
          pathToNavigate="/pantry"
        />
        <OptionCard
          name="Recipe book"
          buttonColor="#FF8A65"
          extraClasses="-mt-8"
          image={Recipe_book_image}
          pathToNavigate="/recipes"
        />
        <OptionCard
          name="Meal planner"
          buttonColor="#64B5F6"
          image={Meal_planner_image}
          pathToNavigate="/meal-scheduler"
        />
      </section>

      {/* <div>
        <button onClick={() => handleRedirect("/pantry")}>My Pantry</button>
        <button onClick={() => handleRedirect("/recipes")}>Recipes</button>
        <button onClick={() => handleRedirect("/meal-scheduler")}>
          MealScheduler
        </button>
        <button onClick={() => handleRedirect("/register")}>Register</button>
        <button onClick={() => handleRedirect("/login")}>Login</button>
      </div> */}
    </>
  );
};

export default HomePage;
