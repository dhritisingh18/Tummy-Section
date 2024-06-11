package com.foodie.Food.Ordering.service;

import com.foodie.Food.Ordering.model.Order;
import com.foodie.Food.Ordering.model.User;
import com.foodie.Food.Ordering.request.OrderRequest;

import java.util.List;

public interface OrderService {

    public Order createOrder(OrderRequest req, User user) throws Exception;

    public Order updateOrder(Long orderId, String orderStatus) throws Exception;

    public void cancleOrder(Long orderId) throws Exception;

    public List<Order> getOrdersOfUser(Long userId) throws Exception;

    public List<Order> getOrdersOfRestaurant(Long restaurantId, String orderStatus) throws Exception;

    public Order findOrderById(Long orderId) throws Exception;
}
