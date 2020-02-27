package com.winterproject.demo.user;

import com.winterproject.demo.*;
import com.winterproject.demo.exception.LoginException;
import com.winterproject.demo.note.Note;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

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

  @GetMapping(path = "/hello")
  public String hello() {
    return "Hello";
  }

  @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
  public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws Exception {

    try {
      this.authenticationManager.authenticate(
              new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword())
      );
    } catch (BadCredentialsException e) {
      throw new Exception("Incorrect username or password", e);
    }

    final UserDetails userDetails = userDetailService.loadUserByUsername(authenticationRequest.getUsername());

    final String jwt = this.jwtTokenUtil.generateToken(userDetails);

    return ResponseEntity.ok(new AuthenticationResponse(jwt));
  }

  // register a new user
  @PostMapping
  public void addNewUser(@RequestBody @Valid User user) {
//    System.out.println(">>> new user: " + user + "\n");
    userService.addNewUser(user);
  }

  // login
  @GetMapping(path = "/login")
  public JWTResponse login(@RequestParam String name, @RequestParam String password) throws Exception {
//    try {
//      this.authenticationManager.authenticate(
//              new UsernamePasswordAuthenticationToken(name, password)
//      );
//    } catch (BadCredentialsException e) {
//      throw new Exception("Incorrect username or password", e);
//    }

    // old user checking method
    List<User> userList = userService.getUserByName(name);
    if (userList.size() == 0) {
      throw new LoginException("The user name " + name + " does not exist.");
    }

    if (!userList.get(0).getPassword().equals(password)) {
      throw new LoginException("incorrect password.");
    }

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
