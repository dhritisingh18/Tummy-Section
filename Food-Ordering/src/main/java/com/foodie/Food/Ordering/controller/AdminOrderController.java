package com.foodie.Food.Ordering.controller;


import com.foodie.Food.Ordering.model.Order;
import com.foodie.Food.Ordering.service.OrderService;
import com.foodie.Food.Ordering.service.RestaurantService;
import com.foodie.Food.Ordering.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminOrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    @Autowired
    private RestaurantService restaurantService;


    @GetMapping("/order/restaurant/{id}")
    public ResponseEntity<List<Order>> getOrderHistory(@PathVariable Long restaurantId, @RequestParam(required = false) String orderStatus, @RequestHeader("Authorization") String jwt) throws Exception {

        List<Order> orders = orderService.getOrdersOfRestaurant(restaurantId, orderStatus);
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @PutMapping("/update-order-status/{orderId}/{orderStatus}")
    public ResponseEntity<Order> getUserOrders(@PathVariable Long orderId, @PathVariable String orderStatus, @RequestHeader("Authorization") String jwt) throws Exception {

        Order order = orderService.updateOrder(orderId, orderStatus);
        return new ResponseEntity<>(order, HttpStatus.OK);
    }
}
