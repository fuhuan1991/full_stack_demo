package com.winterproject.demo.user;

import com.winterproject.demo.student.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public class UserDataAccessService {
  private final JdbcTemplate jdbcTemplate;

  @Autowired
  public UserDataAccessService (JdbcTemplate jdbcTemplate) {
    this.jdbcTemplate = jdbcTemplate;
  }

  int insertUser(UUID userId, User user) {
    System.out.println("new user register:");
    System.out.println(user.getName());
    System.out.println(user.getEmail());

    String sql = "" +
            "INSERT INTO \"user\" (" +
            " user_id," +
            " name," +
            " email, " +
            " password) " +
            "VALUES (?, ?, ?, ?)";
    int update = jdbcTemplate.update(
            sql,
            userId,
            user.getName(),
            user.getEmail(),
            user.getPassword()
    );
    return update;
  }

  public List<User> selectAllUsers() {

    String sql = "" +
            "SELECT " +
            " user_id, " +
            " name, " +
            " email, " +
            " password " +
            "FROM \"user\"";

    List<User> users = jdbcTemplate.query(sql, mapUserFromDb());
    return users;
  }

  public List<User> getUserByName(String name) {
    String sql = "" +
            "SELECT " +
            " user_id, " +
            " name, " +
            " email," +
            " password " +
            "FROM \"user\"" +
            "WHERE name = ?";
    return jdbcTemplate.query(
            sql,
            new Object[]{name},
            mapUserFromDb()
    );
  }

  boolean isEmailTaken(String email) {
    String sql = "" +
            "SELECT EXISTS ( " +
            " SELECT 1 " +
            " FROM \"user\" " +
            " WHERE email = ? " +
            ")";
    return jdbcTemplate.queryForObject(sql, new Object[] {email}, (resultSet, i) -> resultSet.getBoolean(1));
  }

  boolean isNameTaken(String name) {
    String sql = "" +
            "SELECT EXISTS ( " +
            " SELECT 1 " +
            " FROM \"user\" " +
            " WHERE name = ? " +
            ")";
    return jdbcTemplate.queryForObject(sql, new Object[] {name}, (resultSet, i) -> resultSet.getBoolean(1));
  }

  private RowMapper<User> mapUserFromDb() {
    return (resultSet, i) -> {
      String userIdStr = resultSet.getString("user_id");
      UUID userId = UUID.fromString(userIdStr);

      String name = resultSet.getString("name");
      String email = resultSet.getString("email");
      String password = resultSet.getString("password");

      return new User(userId, name, email, password);
    };
  }
}
