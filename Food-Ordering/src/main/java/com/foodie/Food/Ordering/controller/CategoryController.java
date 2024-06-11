package com.foodie.Food.Ordering.controller;


import com.foodie.Food.Ordering.model.Category;
import com.foodie.Food.Ordering.model.User;
import com.foodie.Food.Ordering.service.CategoryService;
import com.foodie.Food.Ordering.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private UserService userService;

    @PostMapping("/admin/category")
    public ResponseEntity<Category> createCategory(@RequestBody Category category, @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        Category category1=categoryService.createCategory(category.getName(),user.getId());
        return new ResponseEntity<>(category1, HttpStatus.CREATED);
    }

    @GetMapping("/category/restaurant")
    public ResponseEntity<List<Category>> getRestaurantByUserId(@RequestHeader("Authorization") String jwt) throws Exception {
        User user=userService.findUserByJwtToken(jwt);
        List<Category> categories=categoryService.findCategoryByRestaurantId(user.getId());
        return new ResponseEntity<>(categories,HttpStatus.OK);
    }

    @GetMapping("/category/restaurant/{id}")
    public ResponseEntity<List<Category>> getCategoriesByRestaurantId(@RequestHeader("Authorization") String jwt, @PathVariable Long id) throws Exception {
        List<Category> categories=categoryService.findCategoryByRestaurantIdWithoutUserId(id);
        return new ResponseEntity<>(categories,HttpStatus.OK);
    }


}
