package com.foodie.Food.Ordering.controller;


import com.foodie.Food.Ordering.model.Cart;
import com.foodie.Food.Ordering.model.CartItem;
import com.foodie.Food.Ordering.model.User;
import com.foodie.Food.Ordering.request.AddCartItemRequest;
import com.foodie.Food.Ordering.request.UpdateCartItemRequest;
import com.foodie.Food.Ordering.service.CartService;
import com.foodie.Food.Ordering.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CartController {

    @Autowired
    private CartService cartService;

    @Autowired
    private UserService userService;

    @PutMapping("/cart/add")
    public ResponseEntity<CartItem> addCartItem(@RequestBody AddCartItemRequest req, @RequestHeader("Authorization") String jwt)throws Exception{
        CartItem cartItem=cartService.addItemToCart(req,jwt);
        return new ResponseEntity<>(cartItem, HttpStatus.OK);
    }

    @PutMapping("/cart-item/update")
    public ResponseEntity<CartItem> updateCartItem(@RequestBody UpdateCartItemRequest req, @RequestHeader("Authorization") String jwt)throws Exception{
        CartItem cartItem=cartService.updateCartItemQuantity(req.getCartItemId(),req.getQuantity(),jwt);
        return new ResponseEntity<>(cartItem, HttpStatus.OK);
    }

    @DeleteMapping("/cart-item/{id}/remove")
    public ResponseEntity<Cart> removeCartItem(@PathVariable Long id, @RequestHeader("Authorization") String jwt)throws Exception{
        Cart cart=cartService.removeItemFromCart(id,jwt);
        return new ResponseEntity<>(cart, HttpStatus.OK);
    }

    @PutMapping("/cart/clear")
    public ResponseEntity<Cart> clearCart(@RequestHeader("Authorization") String jwt)throws Exception{
        User user=userService.findUserByJwtToken(jwt);
        Cart cart=cartService.clearCart(user.getId());
        return new ResponseEntity<>(cart, HttpStatus.OK);
    }


    @GetMapping("/cart")
    public ResponseEntity<Cart> userCart(@RequestHeader("Authorization") String jwt)throws Exception{
        User user=userService.findUserByJwtToken(jwt);
        Cart cart=cartService.findCartByUserId(user.getId());
        return new ResponseEntity<>(cart, HttpStatus.OK);
    }

    @GetMapping("/cart/{id}/items")
    public ResponseEntity<List<CartItem>> getAllCartItems(@RequestHeader("Authorization") String jwt, @PathVariable Long id)throws Exception{
        Cart cart=cartService.findCartById(id);
        List<CartItem> items=cart.getItems();
        return new ResponseEntity<>(items, HttpStatus.OK);
    }

}
