package com.winterproject.demo.user;

import com.winterproject.demo.exception.LoginException;
import org.springframework.beans.factory.annotation.Autowired;
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

  @GetMapping
  public List<User> getAllUser() {
//    throw new ApiRequestException("Oops!");
    return userService.getAllUsers();
  }

  // register a new user
  @PostMapping
  public void addNewUser(@RequestBody @Valid User user) {
//    System.out.println(">>> new user: " + user + "\n");
    userService.addNewUser(user);
  }

  // login
  @GetMapping(path = "/login")
  public User login(@RequestParam String name, @RequestParam String password) {
    System.out.println("login:");
    System.out.println("name = " + name);
    System.out.println("password = " + password);
    List<User> userList = userService.getUserByName(name);

    if (userList.size() == 0) {
      throw new LoginException("The user name " + name + " does not exist.");
    }

    if (!userList.get(0).getPassword().equals(password)) {
      throw new LoginException("incorrect password.");
    }

    return userList.get(0);
  }

  // get all notes of a specific user
  @GetMapping(path = "{userId}/notes")
  public List<Note> getUserNotes(@PathVariable("userId") UUID userId) {
    return userService.getAllUserNotes(userId);
  }

  // create a new note
  @PostMapping(path = "{userId}/notes")
  public void addNewNote(@PathVariable("userId") UUID userId, @RequestBody @Valid Note note) {
    userService.addNewNote(userId, note);
  }
}
