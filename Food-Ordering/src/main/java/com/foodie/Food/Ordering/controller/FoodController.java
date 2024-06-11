package com.foodie.Food.Ordering.controller;

import com.foodie.Food.Ordering.model.Food;
import com.foodie.Food.Ordering.service.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/food")
public class FoodController {

    @Autowired
    private FoodService foodService;

    @GetMapping("/search")
    public ResponseEntity<List<Food>> searchFood(@RequestParam String name, @RequestHeader("Authorization") String jwt){
        List<Food> foods=foodService.searchFood(name);
        return new ResponseEntity<>(foods, HttpStatus.OK);
    }

    @GetMapping("/get-restaurant-food/{restaurantId}")
    public ResponseEntity<List<Food>> getRestaurantFood(@RequestParam boolean isVegetarian, @RequestParam boolean isNonVeg, @RequestParam boolean isSeasonal , @RequestParam(required = false) String foodCategory, @PathVariable Long restaurantId, @RequestHeader("Authorization") String jwt){
        List<Food> foods=foodService.getRestaurantsFood(restaurantId,isVegetarian,isNonVeg,isSeasonal,foodCategory);
        return new ResponseEntity<>(foods,HttpStatus.OK);
    }
}
