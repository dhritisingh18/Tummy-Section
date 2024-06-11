package com.foodie.Food.Ordering.repository;

import com.foodie.Food.Ordering.model.IngredientCategory;
import com.foodie.Food.Ordering.model.IngredientsItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IngredientsItemRepository extends JpaRepository<IngredientsItem,Long> {

    public List<IngredientsItem> findByRestaurantId(Long id);
}
