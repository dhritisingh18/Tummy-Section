package com.foodie.Food.Ordering.service;

import com.foodie.Food.Ordering.model.Cart;
import com.foodie.Food.Ordering.model.CartItem;
import com.foodie.Food.Ordering.model.Food;
import com.foodie.Food.Ordering.model.User;
import com.foodie.Food.Ordering.repository.CartItemRepository;
import com.foodie.Food.Ordering.repository.CartRepository;
import com.foodie.Food.Ordering.repository.FoodRepository;
import com.foodie.Food.Ordering.request.AddCartItemRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CartServiceImpl implements CartService{

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private FoodRepository foodRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private FoodService foodService;

    @Override
    public CartItem addItemToCart(AddCartItemRequest req, String jwt) throws Exception {

        User user=userService.findUserByJwtToken(jwt);
        Food food=foodService.findFoodById(req.getFoodId());
        Cart cart=cartRepository.findByCustomerId(user.getId());

        for(CartItem cartItem: cart.getItems()){
            if(cartItem.getFood().equals(food)){
                int newQuantity=cartItem.getQuantity() + req.getQuantity();
                return updateCartItemQuantity(cartItem.getId(),newQuantity,jwt);
            }
        }

        CartItem newCartItem=new CartItem();
        newCartItem.setCart(cart);
        newCartItem.setFood(food);
        newCartItem.setQuantity(req.getQuantity());
        newCartItem.setIngredients(req.getIngredients());
        newCartItem.setTotalPrice(req.getQuantity()*food.getPrice());

        CartItem savedCartItem=cartItemRepository.save(newCartItem);
        cart.getItems().add(savedCartItem);
        return savedCartItem;
    }

    @Override
    public CartItem updateCartItemQuantity(Long cartItemId, int quantity,String jwt) throws Exception {

        Optional<CartItem> optionalCartItem=cartItemRepository.findById(cartItemId);
        if(optionalCartItem.isEmpty()){
            throw new Exception("No cart item found with id "+cartItemId);
        }
        User user=userService.findUserByJwtToken(jwt);

        Cart cart=findCartByUserId(user.getId());
        CartItem item=optionalCartItem.get();
        cart.getItems().remove(item);

        item.setQuantity(quantity);
        item.setTotalPrice(item.getFood().getPrice() * quantity);

        cart.getItems().add(item);
        cart.setTotal(calculateCartTotal(cart));
        cartRepository.save(cart);
        return  cartItemRepository.save(item);
    }

    @Override
    public Cart removeItemFromCart(Long cartItemId, String jwt) throws Exception {
        User user=userService.findUserByJwtToken(jwt);
        Optional<CartItem> optionalCartItem=cartItemRepository.findById(cartItemId);
        if(optionalCartItem.isEmpty()){
            throw new Exception("No cart item found with id "+cartItemId);
        }

        CartItem item=optionalCartItem.get();
        Cart cart=cartRepository.findByCustomerId(user.getId());
        cart.getItems().remove(item);
        cart.setTotal(calculateCartTotal(cart));
        return cartRepository.save(cart);
    }

    @Override
    public Long calculateCartTotal(Cart cart) throws Exception {

        Long total=0L;

        for(CartItem item: cart.getItems()){
            total += item.getFood().getPrice() * item.getQuantity();
        }
        return total;
    }

    @Override
    public Cart findCartById(Long id) throws Exception {
        Optional<Cart> optionalCart=cartRepository.findById(id);
        if(optionalCart.isEmpty()){
            throw new Exception("No cart found with id "+id);
        }
        return optionalCart.get();
    }

    @Override
    public Cart findCartByUserId(Long userId) throws Exception {

        Cart cart= cartRepository.findByCustomerId(userId);
        cart.setTotal(calculateCartTotal(cart));
        return cart;
    }

    @Override
    public Cart clearCart(Long userId) throws Exception {

        Cart cart=cartRepository.findByCustomerId(userId);
        cart.getItems().clear();
        return cartRepository.save(cart);
    }
}
