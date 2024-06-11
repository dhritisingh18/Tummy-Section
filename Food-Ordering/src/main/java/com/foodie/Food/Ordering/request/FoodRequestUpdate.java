package com.foodie.Food.Ordering.request;

import com.foodie.Food.Ordering.model.IngredientsItem;
import lombok.Data;

import java.util.List;

@Data
public class FoodRequestUpdate {

    private Long id;

    private List<IngredientsItem> ingredientsItems;
}
