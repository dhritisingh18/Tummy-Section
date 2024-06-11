package com.foodie.Food.Ordering.service;

import com.foodie.Food.Ordering.model.Category;
import com.foodie.Food.Ordering.model.Food;
import com.foodie.Food.Ordering.model.Restaurant;
import com.foodie.Food.Ordering.request.CreateFoodRequest;
import com.foodie.Food.Ordering.request.FoodRequestImages;
import com.foodie.Food.Ordering.request.FoodRequestUpdate;

import java.util.List;

public interface FoodService {

    public Food createFood(CreateFoodRequest req, Category category, Restaurant restaurant);

    public void deleteFood(Long foodId) throws Exception;

    public List<Food> getRestaurantsFood(Long restaurantId, boolean isVegetarian, boolean isNonVeg, boolean isSeasonal, String foodCategory);

    public List<Food> searchFood(String keyword);

    public Food findFoodById(Long foodId) throws Exception;

    public Food updateAvailabilityStatus(Long foodId) throws Exception;

    public List<String> updateFoodImages(FoodRequestImages foodRequestImages) throws Exception;

    public Food updateFood(FoodRequestUpdate foodRequestUpdate) throws Exception;
}
