package com.my_portfolio.user;

import com.my_portfolio.security.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("api/users")
public class UserController {

  private final UserService userService;

  @Autowired
  public UserController(UserService userService) {
    this.userService = userService;
  }

  @Autowired
  private AuthenticationManager authenticationManager;

  @Autowired
  private MyUserDetailService userDetailService;

  @Autowired
  private JwtUtil jwtTokenUtil;

  @GetMapping
  public List<User> getAllUser() {
//    throw new ApiRequestException("Oops!");
    return userService.getAllUsers();
  }

  // register a new user
  @PostMapping
  public void addNewUser(@RequestBody @Valid User user) {
    userService.addNewUser(user);
  }

  // login
  @GetMapping(path = "/login")
  public JWTResponse login(@RequestParam String name, @RequestParam String password) throws Exception {

    try {
      this.authenticationManager.authenticate(
              new UsernamePasswordAuthenticationToken(name, password)
      );
    } catch (BadCredentialsException e) {
      throw new Exception("Incorrect username or password", e);
    }

    // old user checking method
    List<User> userList = userService.getUserByName(name);

    final UserDetails userDetails = userDetailService.loadUserByUsername(name);
    final String jwt = this.jwtTokenUtil.generateToken(userDetails);

    System.out.println("---------------Login-------------------------");
    System.out.println("login:");
    System.out.println("name = " + name);
    System.out.println("password = " + password);
    System.out.println(userList.get(0));
    System.out.println(jwt);
    System.out.println("---------------------------------------------");
    JWTResponse response = new JWTResponse(userList.get(0), jwt);
    return response;
  }
}
