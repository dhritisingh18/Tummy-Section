package com.foodie.Food.Ordering.request;

import lombok.Data;

import java.util.List;

@Data
public class RestaurantRequest {

    private Long id;
    private List<String> images;
}
