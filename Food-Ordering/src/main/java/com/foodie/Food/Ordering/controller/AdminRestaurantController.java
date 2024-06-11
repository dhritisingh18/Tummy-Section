package com.foodie.Food.Ordering.controller;

import com.foodie.Food.Ordering.model.Restaurant;
import com.foodie.Food.Ordering.model.User;
import com.foodie.Food.Ordering.repository.RestaurantRepository;
import com.foodie.Food.Ordering.request.CreateRestaurantRequest;
import com.foodie.Food.Ordering.request.RestaurantRequest;
import com.foodie.Food.Ordering.response.MessageRespone;
import com.foodie.Food.Ordering.service.RestaurantService;
import com.foodie.Food.Ordering.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin/restaurants")
public class AdminRestaurantController {

    @Autowired
    private RestaurantService restaurantService;

    @Autowired
    private UserService userService;

    @PostMapping()
    public ResponseEntity<Restaurant> createRestaurant(@RequestBody CreateRestaurantRequest req, @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        Restaurant restaurant = restaurantService.createRestaurant(req, user);

        return new ResponseEntity<>(restaurant, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Restaurant> updateRestaurant(@RequestBody CreateRestaurantRequest req, @RequestHeader("Authorization") String jwt , @PathVariable Long id) throws Exception {
        Restaurant restaurant = restaurantService.updateRestaurant(id,req);

        return new ResponseEntity<>(restaurant, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<MessageRespone> deleteRestaurant(@RequestHeader("Authorization") String jwt,@PathVariable Long id) throws Exception {
       restaurantService.deleteRestaurant(id);
        MessageRespone messageRespone=new MessageRespone();
        messageRespone.setMessage("Restaurant deleted successfully");
        return new ResponseEntity<>(messageRespone,HttpStatus.OK);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Restaurant> updateRestaurantStatus(@RequestHeader("Authorization") String jwt,@PathVariable Long id) throws Exception {
        Restaurant restaurant=restaurantService.updateRestaurantStatus(id);
        return new ResponseEntity<>(restaurant,HttpStatus.OK);
    }

    @GetMapping("/user")
    public ResponseEntity<Restaurant> findRestaurantByUserId(@RequestHeader("Authorization") String jwt) throws Exception {
        User user=userService.findUserByJwtToken(jwt);
        Restaurant restaurant=restaurantService.getRestaurantByUserId(user.getId());

        return new ResponseEntity<>(restaurant,HttpStatus.OK);
    }

    @PutMapping("/update-images")
    public ResponseEntity<List<String>>  updateRestaurantImages(@RequestHeader("Authorization") String jwt, @RequestBody RestaurantRequest res) throws Exception{
       Restaurant restaurant=restaurantService.updateRestaurantImages(res);
        return new ResponseEntity<>(restaurant.getImages(),HttpStatus.OK);

    }

}
