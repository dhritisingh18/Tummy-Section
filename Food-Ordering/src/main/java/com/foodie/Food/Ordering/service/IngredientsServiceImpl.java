package com.foodie.Food.Ordering.service;

import com.foodie.Food.Ordering.model.IngredientCategory;
import com.foodie.Food.Ordering.model.IngredientsItem;
import com.foodie.Food.Ordering.model.Restaurant;
import com.foodie.Food.Ordering.repository.IngredientsCategoryRepository;
import com.foodie.Food.Ordering.repository.IngredientsItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class IngredientsServiceImpl implements IngredientsService {

    @Autowired
    private RestaurantService restaurantService;

    @Autowired
    private IngredientsItemRepository ingredientsItemRepository;

    @Autowired
    private IngredientsCategoryRepository ingredientsCategoryRepository;

    @Override
    public IngredientCategory createIngredientCategory(String name, Long restaurantId) throws Exception {
        IngredientCategory ingredientCategory = new IngredientCategory();
        ingredientCategory.setName(name);
        Restaurant restaurant = restaurantService.findRestaurantById(restaurantId);
        ingredientCategory.setRestaurant(restaurant);

        return ingredientsCategoryRepository.save(ingredientCategory);

    }

    @Override
    public IngredientCategory findIngredientCategoryById(Long id) throws Exception {
        Optional<IngredientCategory> category = ingredientsCategoryRepository.findById(id);
        if (category.isEmpty()) {
            throw new Exception("No ingredient category found with id " + id);
        }
        return category.get();
    }

    @Override
    public List<IngredientCategory> findIngredientCategoryByRestaurantId(Long id) throws Exception {
        Restaurant restaurant = restaurantService.findRestaurantById(id);
        List<IngredientCategory> categories = ingredientsCategoryRepository.findByRestaurantId(id);
        return categories;
    }

    @Override
    public IngredientsItem createIngredientItem(Long restaurantId, String ingredientName, Long categoryId) throws Exception {
        IngredientsItem ingredientsItem = new IngredientsItem();
        Restaurant restaurant = restaurantService.findRestaurantById(restaurantId);
        IngredientCategory ingredientCategory = findIngredientCategoryById(categoryId);
        ingredientsItem.setName(ingredientName);
        ingredientsItem.setRestaurant(restaurant);
        ingredientsItem.setCategory(ingredientCategory);

        IngredientsItem savedIngredientItem = ingredientsItemRepository.save(ingredientsItem);
        ingredientCategory.getIngredientsItems().add(savedIngredientItem);
        return savedIngredientItem;
    }

    @Override
    public List<IngredientsItem> findRestaurantsIngredients(Long restaurantId) {

        List<IngredientsItem> ingredientsItems = ingredientsItemRepository.findByRestaurantId(restaurantId);
        return ingredientsItems;
    }

    @Override
    public IngredientsItem updateStock(Long id) throws Exception {
        Optional<IngredientsItem> optionalIngredientsItem = ingredientsItemRepository.findById(id);
        if (optionalIngredientsItem.isEmpty()) {
            throw new Exception("No ingredient item found with id " + id);
        }
        IngredientsItem ingredientsItem = optionalIngredientsItem.get();
        ingredientsItem.setInStock(!ingredientsItem.isInStock());

        return ingredientsItem;
    }
}
