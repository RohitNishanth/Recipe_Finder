import React from "react";
import "./Filters.css";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../../redux/recipeSlice";

const Filters = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.recipes);

  const handleFilterChange = (e) => {
    dispatch(setFilters({ ...filters, [e.target.name]: e.target.value }));
  };

  return (
    <div className="filters">
      <h4>Filter Recipes</h4>
      <select name="category" onChange={handleFilterChange}>
        <option value="">Select Category</option>
        <option value="breakfast">Breakfast</option>
        <option value="lunch">Lunch</option>
        <option value="dinner">Dinner</option>
      </select>

      <select name="dietary" onChange={handleFilterChange}>
        <option value="">Dietary Restrictions</option>
        <option value="vegetarian">Vegetarian</option>
        <option value="gluten-free">Gluten-free</option>
        <option value="vegan">Vegan</option>
      </select>
    </div>
  );
};

export default Filters;
