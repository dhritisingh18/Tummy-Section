package com.foodie.Food.Ordering.dto;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;

import java.util.List;

@Data
@Embeddable
public class RestaurantDto {

    private String title;

    private String description;

    private Long id;

    @Column(length=1000)
    private List<String> images;
}
