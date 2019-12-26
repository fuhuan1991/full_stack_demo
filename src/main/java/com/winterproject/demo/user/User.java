package com.winterproject.demo.user;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.UUID;

public class User {
  private final UUID userId;
  @NotBlank
  private final String name;
  @NotBlank
  private final String password;
  @NotBlank
  private final String email;

  public User(
          @JsonProperty("userId") UUID userId,
          @JsonProperty("name") String name,
          @JsonProperty("email") String email,
          @JsonProperty("password") String password) {
    this.userId = userId;
    this.name = name;
    this.email = email;
    this.password = password;
  }


  public UUID getUserId() {
    return userId;
  }

  public String getName() {
    return name;
  }

  public String getEmail() {
    return email;
  }

  public String getPassword() { return password; }

  @Override
  public String toString() {
    return "User{" +
            "userId=" + userId +
            ", name='" + name + '\'' +
            ", email='" + email + '\'' +
            ", password='" + password + '\'' +
            '}';
  }


}
