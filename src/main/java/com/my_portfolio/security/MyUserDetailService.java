package com.my_portfolio.security;

import com.my_portfolio.exception.LoginException;
import com.my_portfolio.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MyUserDetailService implements UserDetailsService {

  @Autowired
  private UserService userService;

  @Override
  public UserDetails loadUserByUsername (String userName) throws UsernameNotFoundException {

    List<com.my_portfolio.user.User> userList = userService.getUserByName(userName);

    if (userList.size() == 0) {
      throw new LoginException("The user name " + userName + " does not exist.");
    }

    com.my_portfolio.user.User target = userList.get(0);

    return new User(target.getName(), target.getPassword(), new ArrayList<>());
  }
}
