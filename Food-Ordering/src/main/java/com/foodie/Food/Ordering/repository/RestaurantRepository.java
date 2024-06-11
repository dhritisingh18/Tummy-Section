package com.foodie.Food.Ordering.repository;

import com.foodie.Food.Ordering.model.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant,Long> {

    @Query("SELECT r FROM Restaurant r WHERE lower(r.name) LIKE lower(concat('%',:query,'%')) " + "OR lower(r.cuisineType) LIKE lower(concat('%',:query,'%'))")
    public List<Restaurant> findBySearchQuery(String query);

    public Restaurant findByOwnerId(Long userId);
}
