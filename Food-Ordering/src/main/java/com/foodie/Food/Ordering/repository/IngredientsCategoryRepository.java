package com.foodie.Food.Ordering.repository;

import com.foodie.Food.Ordering.model.IngredientCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IngredientsCategoryRepository extends JpaRepository<IngredientCategory,Long> {
    public List<IngredientCategory> findByRestaurantId(Long id);

}
