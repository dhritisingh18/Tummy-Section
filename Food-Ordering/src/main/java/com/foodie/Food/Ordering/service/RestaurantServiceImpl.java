package com.foodie.Food.Ordering.service;

import com.foodie.Food.Ordering.dto.RestaurantDto;
import com.foodie.Food.Ordering.model.Address;
import com.foodie.Food.Ordering.model.Restaurant;
import com.foodie.Food.Ordering.model.User;
import com.foodie.Food.Ordering.repository.AddressRepository;
import com.foodie.Food.Ordering.repository.RestaurantRepository;
import com.foodie.Food.Ordering.repository.UserRepository;
import com.foodie.Food.Ordering.request.CreateRestaurantRequest;
import com.foodie.Food.Ordering.request.RestaurantRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

@Service
public class RestaurantServiceImpl implements RestaurantService {

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public Restaurant createRestaurant(CreateRestaurantRequest createRestaurantRequest, User user) {

        Address address = addressRepository.save(createRestaurantRequest.getAddress());

        Restaurant restaurant = new Restaurant();
        restaurant.setAddress(address);
        restaurant.setContactInformation(createRestaurantRequest.getContactInformation());
        restaurant.setCuisineType(createRestaurantRequest.getCuisineType());
        restaurant.setDescription(createRestaurantRequest.getDescription());
        restaurant.setName(createRestaurantRequest.getName());
        restaurant.setOpeningHours(createRestaurantRequest.getOpeningHours());
        restaurant.setOwner(user);
        restaurant.setImages(createRestaurantRequest.getImages());
        restaurant.setRegistrationDate(LocalDateTime.now());


        return restaurantRepository.save(restaurant);
    }

    @Override
    public Restaurant updateRestaurant(Long restaurantId, CreateRestaurantRequest updatedRestaurant) throws Exception {
        Restaurant restaurant = findRestaurantById(restaurantId);
        if (restaurant.getName() != null) {
            restaurant.setName(updatedRestaurant.getName());
        }
        if (restaurant.getCuisineType() != null) {
            restaurant.setCuisineType(updatedRestaurant.getCuisineType());
        }

        if (restaurant.getDescription() != null) {
            restaurant.setDescription(updatedRestaurant.getDescription());
        }

        return restaurantRepository.save(restaurant);
    }

    @Override
    public void deleteRestaurant(Long restaurantId) throws Exception {
        Restaurant restaurant=findRestaurantById(restaurantId);
        restaurantRepository.delete(restaurant);
    }

    @Override
    public List<Restaurant> getAllRestaurants() {
        return restaurantRepository.findAll();
    }

    @Override
    public List<Restaurant> searchRestaurant(String keyword) {
        return restaurantRepository.findBySearchQuery(keyword);
    }

    @Override
    public Restaurant findRestaurantById(Long id) throws Exception {
        Optional<Restaurant> restaurant=restaurantRepository.findById(id);
        if(restaurant.isEmpty()){
            throw new Exception("No restaurant found with id "+id);
        }
        return restaurant.get();
    }

    @Override
    public Restaurant getRestaurantByUserId(Long userId) throws Exception {

        Restaurant restaurant=restaurantRepository.findByOwnerId(userId);
        if(restaurant==null){
            throw new Exception("No restaurant found with user Id "+userId);
        }
        return restaurant;
    }

    @Override
    public RestaurantDto addToFavorites(Long restaurantId, User user) throws Exception {

        Restaurant restaurant=findRestaurantById(restaurantId);
        RestaurantDto restaurantDto=new RestaurantDto();
        restaurantDto.setDescription(restaurant.getDescription());
        restaurantDto.setImages(restaurant.getImages());
        restaurantDto.setTitle(restaurant.getName());
        restaurantDto.setId(restaurantId);

        boolean foundMatchingRestaurant=false;
        Iterator<RestaurantDto> iterator = user.getFavorites().iterator();
        while (iterator.hasNext()) {
            RestaurantDto r = iterator.next();
            if (r.getId().equals(restaurantId)) {
                iterator.remove();
                foundMatchingRestaurant = true;
            }
        }

        if(!foundMatchingRestaurant){
            user.getFavorites().add(restaurantDto);
        }

         userRepository.save(user);

        return restaurantDto;
    }

    @Override
    public Restaurant updateRestaurantStatus(Long id) throws Exception {
        Restaurant restaurant=findRestaurantById(id);
        restaurant.setOpen(!restaurant.isOpen());
        return restaurantRepository.save(restaurant);
    }

    @Override
    public Restaurant updateRestaurantImages(RestaurantRequest restaurantRequest) throws Exception {
        Restaurant restaurant=findRestaurantById(restaurantRequest.getId());
        restaurant.setImages(restaurantRequest.getImages());

        return restaurantRepository.save(restaurant);
    }
}
