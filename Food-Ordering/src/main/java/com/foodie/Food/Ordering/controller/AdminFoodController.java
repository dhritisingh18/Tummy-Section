package com.foodie.Food.Ordering.controller;


import com.foodie.Food.Ordering.model.Food;
import com.foodie.Food.Ordering.model.Restaurant;
import com.foodie.Food.Ordering.request.CreateFoodRequest;
import com.foodie.Food.Ordering.request.FoodRequestImages;
import com.foodie.Food.Ordering.request.FoodRequestUpdate;
import com.foodie.Food.Ordering.response.MessageRespone;
import com.foodie.Food.Ordering.service.FoodService;
import com.foodie.Food.Ordering.service.RestaurantService;
import com.foodie.Food.Ordering.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin/food")
public class AdminFoodController {

    @Autowired
    private FoodService foodService;

    @Autowired
    private UserService userService;

    @Autowired
    private RestaurantService restaurantService;

    @PostMapping()
    public ResponseEntity<Food> createFood(@RequestBody CreateFoodRequest req, @RequestHeader("Authorization") String jwt) throws Exception {
        Restaurant restaurant=restaurantService.findRestaurantById(req.getRestaurantId());
        Food food=foodService.createFood(req,req.getCategory(),restaurant);
        return new ResponseEntity<>(food, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<MessageRespone> deleteFood(@PathVariable Long id,@RequestHeader("Authorization")  String jwt) throws Exception {
        foodService.deleteFood(id);
        MessageRespone messageRespone=new MessageRespone();
        messageRespone.setMessage("Food deleted successfully with id "+id);
        return  new ResponseEntity<>(messageRespone,HttpStatus.OK);
    }

    @PutMapping("/{id}/update-availability-status")
    public ResponseEntity<Food> updateFoodAvailabilityStatus(@PathVariable Long id,@RequestHeader("Authorization") String jwt) throws Exception {
        Food food=foodService.updateAvailabilityStatus(id);
        return new ResponseEntity<>(food,HttpStatus.OK);
    }

    @PutMapping("/update-images")
    public ResponseEntity<List<String>> updateFoodImages( @RequestBody FoodRequestImages foodRequestImages, @RequestHeader("Authorization") String jwt) throws Exception {
        List<String> images=foodService.updateFoodImages(foodRequestImages);
        return new ResponseEntity<>(images,HttpStatus.OK);
    }

    @PutMapping("/update-food")
    public ResponseEntity<Food> updateFoodImages(@RequestBody FoodRequestUpdate foodRequest, @RequestHeader("Authorization") String jwt) throws Exception {
        Food food=foodService.updateFood(foodRequest);
        return new ResponseEntity<>(food,HttpStatus.OK);
    }
}
