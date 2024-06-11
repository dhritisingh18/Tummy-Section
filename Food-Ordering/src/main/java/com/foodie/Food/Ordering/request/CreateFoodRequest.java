package com.foodie.Food.Ordering.request;


import com.foodie.Food.Ordering.model.Category;
import com.foodie.Food.Ordering.model.IngredientsItem;
import com.foodie.Food.Ordering.model.Restaurant;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class CreateFoodRequest {

    private String name;

    private String description;

    private Long price;

    private Category category;

    private List<String> images;

    private boolean available;

    private Long restaurantId;

    private boolean vegetarian;

    private boolean seasonal;

    private List<IngredientsItem> ingredientsItems;
}
