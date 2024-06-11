package com.foodie.Food.Ordering.service;

import com.foodie.Food.Ordering.model.Category;
import com.foodie.Food.Ordering.model.Food;
import com.foodie.Food.Ordering.model.IngredientsItem;
import com.foodie.Food.Ordering.model.Restaurant;
import com.foodie.Food.Ordering.repository.FoodRepository;
import com.foodie.Food.Ordering.repository.RestaurantRepository;
import com.foodie.Food.Ordering.request.CreateFoodRequest;
import com.foodie.Food.Ordering.request.FoodRequestImages;
import com.foodie.Food.Ordering.request.FoodRequestUpdate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FoodServiceImpl implements FoodService{

    @Autowired
    private FoodRepository foodRepository;

    @Autowired
    private RestaurantRepository restaurantRepository;
    @Override
    public Food createFood(CreateFoodRequest req, Category category, Restaurant restaurant) {

        Food food=new Food();
        food.setFoodCategory(category);
        food.setRestaurant(restaurant);
        food.setAvailable(req.isAvailable());
        food.setDescription(req.getDescription());
        food.setImages(req.getImages());
        food.setPrice(req.getPrice());
        food.setIngredientsItems(req.getIngredientsItems());
        food.setVegetarian(req.isVegetarian());
        food.setSeasonal(req.isSeasonal());
        food.setName(req.getName());
        food.setCreationDate(new Date());

        Food savedFood=foodRepository.save(food);

        restaurant.getFoods().add(savedFood);
        restaurantRepository.save(restaurant);
        return savedFood;
    }

    @Override
    public void deleteFood(Long foodId) throws Exception {
        Food food=findFoodById(foodId);
        food.setRestaurant(null);
        foodRepository.save(food);
    }

    @Override
    public List<Food> getRestaurantsFood(Long restaurantId, boolean isVegetarian, boolean isNonVeg, boolean isSeasonal, String foodCategory) {
        List<Food> foods=foodRepository.findByRestaurantId(restaurantId);
        if(isVegetarian){
            foods=filterByIsVeg(isVegetarian,foods);
        }
        if(isNonVeg){
            foods=filterByIsNonVeg(isNonVeg,foods);
        }
        if(isSeasonal){
            foods=filterByIsSeasonal(isSeasonal,foods);
        }

        if(foodCategory!=null && !foodCategory.equals("")){
            foods=filterByFoodCategory(foodCategory,foods);
        }


        return foods;
    }

    private List<Food> filterByFoodCategory(String foodCategory, List<Food> foods) {
        return foods.stream().filter(food -> {
            if(food.getFoodCategory()!=null){
                return food.getFoodCategory().getName().equals(foodCategory);
            }
            return false;
        }).collect(Collectors.toList());
    }

    private List<Food> filterByIsVeg(boolean isVegetarian, List<Food> foods) {
        return foods.stream().filter(food -> food.isVegetarian()==isVegetarian).collect(Collectors.toList());
    }
    private List<Food> filterByIsNonVeg(boolean isNonVeg, List<Food> foods) {
        return foods.stream().filter(food -> food.isVegetarian()==false).collect(Collectors.toList());
    }
    private List<Food> filterByIsSeasonal(boolean isSeasonal, List<Food> foods) {
        return foods.stream().filter(food -> food.isSeasonal()==isSeasonal).collect(Collectors.toList());
    }

    @Override
    public List<Food> searchFood(String keyword) {
        List<Food> foods=foodRepository.searchFood(keyword);
        return foods;
    }

    @Override
    public Food findFoodById(Long foodId) throws Exception {
        Optional<Food> food=foodRepository.findById(foodId);
        if(food.isEmpty()){
            throw new Exception("Food does not exist with id "+foodId);
        }
        return food.get();
    }

    @Override
    public Food updateAvailabilityStatus(Long foodId) throws Exception {

        Food food=findFoodById(foodId);
        food.setAvailable(!food.isAvailable());

        return foodRepository.save(food);
    }

    @Override
    public List<String> updateFoodImages(FoodRequestImages foodRequestImages) throws Exception {
        Food food=findFoodById(foodRequestImages.getId());
        food.setImages(foodRequestImages.getImages());
        Food newFood =foodRepository.save(food);
        return newFood.getImages();
    }

    @Override
    public Food updateFood(FoodRequestUpdate foodRequestUpdate) throws Exception {
        Food food=findFoodById(foodRequestUpdate.getId());

        List<IngredientsItem> items=food.getIngredientsItems();
        for(IngredientsItem item : foodRequestUpdate.getIngredientsItems()){
            items.add(item);
        }

        food.setIngredientsItems(items);
        return foodRepository.save(food);
    }
}
