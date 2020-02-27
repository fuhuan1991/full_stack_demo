package com.winterproject.demo;

import com.winterproject.demo.user.User;

import javax.validation.constraints.NotBlank;
import java.util.UUID;

// used as a carrier of user info ans JWT
// It is sent back after a successful login
public class JWTResponse {

  private final UUID userId;

  private final String name;

  private final String password;

  private final String email;

  private final String jwt;

  public JWTResponse(User user, String jwt) {
    this.userId = user.getUserId();
    this.name = user.getName();
    this.password = user.getPassword();
    this.email = user.getEmail();
    this.jwt = jwt;
  }

  public UUID getUserId() {
    return userId;
  }

  public String getName() {
    return name;
  }

  public String getPassword() {
    return password;
  }

  public String getEmail() {
    return email;
  }

  public String getJwt() {
    return jwt;
  }
}
