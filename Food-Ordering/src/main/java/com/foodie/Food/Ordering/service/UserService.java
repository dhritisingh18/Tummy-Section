package com.foodie.Food.Ordering.service;

import com.foodie.Food.Ordering.model.User;

public interface UserService {

    public User findUserByJwtToken(String jwt) throws Exception;

    public User findUserByEmail(String email) throws Exception;


}
