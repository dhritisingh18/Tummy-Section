package com.foodie.Food.Ordering.service;

import com.foodie.Food.Ordering.dto.RestaurantDto;
import com.foodie.Food.Ordering.model.Restaurant;
import com.foodie.Food.Ordering.model.User;
import com.foodie.Food.Ordering.request.CreateRestaurantRequest;
import com.foodie.Food.Ordering.request.RestaurantRequest;

import java.util.List;


public interface RestaurantService {

    public Restaurant createRestaurant(CreateRestaurantRequest createRestaurantRequest, User user);

    public Restaurant updateRestaurant(Long restaurantId, CreateRestaurantRequest updatedRestaurant) throws Exception;

    public void deleteRestaurant(Long restaurantId) throws Exception;

    public List<Restaurant> getAllRestaurants();

    public List<Restaurant> searchRestaurant(String keyword);

    public Restaurant findRestaurantById(Long id) throws Exception;

    public Restaurant getRestaurantByUserId(Long userId) throws Exception;

    public RestaurantDto addToFavorites(Long restaurantId, User user) throws Exception;

    //    public List<RestaurantDto> removeFromFravorites(Long restuarantId,User user) throws Exception;
    public Restaurant updateRestaurantStatus(Long id) throws Exception;

    public Restaurant updateRestaurantImages(RestaurantRequest restaurantRequest) throws Exception;
}
