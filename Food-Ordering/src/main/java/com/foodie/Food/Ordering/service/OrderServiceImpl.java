package com.foodie.Food.Ordering.service;

import com.foodie.Food.Ordering.model.Address;
import com.foodie.Food.Ordering.model.Cart;
import com.foodie.Food.Ordering.model.CartItem;
import com.foodie.Food.Ordering.model.Order;
import com.foodie.Food.Ordering.model.OrderItem;
import com.foodie.Food.Ordering.model.Restaurant;
import com.foodie.Food.Ordering.model.User;
import com.foodie.Food.Ordering.repository.AddressRepository;
import com.foodie.Food.Ordering.repository.OrderItemRepository;
import com.foodie.Food.Ordering.repository.OrderRepository;
import com.foodie.Food.Ordering.repository.RestaurantRepository;
import com.foodie.Food.Ordering.repository.UserRepository;
import com.foodie.Food.Ordering.request.OrderRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RestaurantService restaurantService;

    @Autowired
    private CartService cartService;

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Override
    public Order createOrder(OrderRequest req, User user) throws Exception {

        Address shippingAddress = req.getDeliveryAddress();

        Address savedAddress = addressRepository.save(shippingAddress);

        if (!user.getAddresses().contains(savedAddress)) {
            user.getAddresses().add(savedAddress);
        }

        userRepository.save(user);

        Restaurant restaurant = restaurantService.findRestaurantById(req.getRestaurantId());

        Cart cart = cartService.findCartByUserId(user.getId());

        Order order = new Order();
        order.setCustomer(user);
        order.setCreatedAt(new Date());
        order.setDeliveryAddress(savedAddress);
        order.setOrderStatus("PENDING");
        order.setRestaurant(restaurant);

        List<OrderItem> orderItems = new ArrayList<>();
        int totalItems=0;
        for (CartItem cartItem : cart.getItems()) {
            OrderItem orderItem = new OrderItem();
            orderItem.setFood(cartItem.getFood());
            orderItem.setIngredients(cartItem.getIngredients());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setTotalPrice(cartItem.getFood().getPrice() * cartItem.getQuantity());
            totalItems+=orderItem.getQuantity();
            OrderItem savedOrderItem = orderItemRepository.save(orderItem);
            orderItems.add(savedOrderItem);
        }

        order.setItems(orderItems);
        order.setTotalItem(totalItems);
        Long totalPrice = cartService.calculateCartTotal(cart);
        order.setTotalPrice(totalPrice);

        Order savedOrder = orderRepository.save(order);

        restaurant.getOrders().add(savedOrder);
        restaurantRepository.save(restaurant);

        return savedOrder;
    }

    @Override
    public Order updateOrder(Long orderId, String orderStatus) throws Exception {
        Order order = findOrderById(orderId);
        if (orderStatus.equals("OUT_FOR_DELIVERY") || orderStatus.equals("DELIVERED") || orderStatus.equals("COMPLETED") || orderStatus.equals("PENDING")) {
            return orderRepository.save(order);
        } else {
            throw new Exception("Invalid order status " + orderStatus);
        }
    }

    @Override
    public void cancleOrder(Long orderId) throws Exception {
        Order order = findOrderById(orderId);
        orderRepository.deleteById(orderId);
    }

    @Override
    public List<Order> getOrdersOfUser(Long userId) throws Exception {
        List<Order> orders = orderRepository.findByCustomerId(userId);
        return orders;
    }

    @Override
    public List<Order> getOrdersOfRestaurant(Long restaurantId, String orderStatus) throws Exception {

        List<Order> orders = orderRepository.findByRestaurantId(restaurantId);
        if (orderStatus != null) {
            orders = orders.stream().filter(order -> order.getOrderStatus().equals(orderStatus)).collect(Collectors.toList());
        }
        return orders;
    }

    @Override
    public Order findOrderById(Long orderId) throws Exception {
        Optional<Order> optionalOrder = orderRepository.findById(orderId);
        if (optionalOrder.isEmpty()) {
            throw new Exception("No order found with order id " + orderId);
        }

        Order order = optionalOrder.get();
        return order;
    }
}
