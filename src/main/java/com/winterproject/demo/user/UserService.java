package com.winterproject.demo.user;

import com.winterproject.demo.EmailValidator;
import com.winterproject.demo.exception.ApiRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

  private final UserDataAccessService userDataAccessService;
  private final EmailValidator emailValidator;

  @Autowired
  public UserService(UserDataAccessService userDataAccessService, EmailValidator emailValidator) {
    this.userDataAccessService = userDataAccessService;
    this.emailValidator = emailValidator;
  }

  List<User> getAllUsers() {
    return userDataAccessService.selectAllUsers();
  }

  void addNewUser(User user) {
    addNewUser(null, user);
  }

  void addNewUser(UUID userId, User user) {
    UUID newStudentId = Optional.ofNullable(userId).orElse(UUID.randomUUID());

    if (!emailValidator.test(user.getEmail())) {
      throw new ApiRequestException(user.getEmail() + "is not valid");
    }

    if (userDataAccessService.isEmailTaken(user.getEmail())) {
      throw new ApiRequestException(user.getEmail() + " is taken");
    }

    if (userDataAccessService.isNameTaken(user.getName())) {
      throw new ApiRequestException(user.getName() + " is taken");
    }

    userDataAccessService.insertUser(newStudentId, user);
  }

   List<User> getUserByName(String name) {
    return userDataAccessService.getUserByName(name);
  }
}
