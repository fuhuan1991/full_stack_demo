package com.my_portfolio.event;


import com.my_portfolio.note.Note;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;

@Repository
public class EventDataAccessService {
  private final JdbcTemplate jdbcTemplate;

  @Autowired
  public EventDataAccessService (JdbcTemplate jdbcTemplate) {
    this.jdbcTemplate = jdbcTemplate;
  }

  int insertEvent(UUID eventId, UUID userId, Event event) {

    Timestamp timestamp = Timestamp.valueOf(event.getTime());

    System.out.println("new event: ");
    System.out.println(event.getName());
    System.out.println(event.getDescription());
    System.out.println(timestamp);

    String sql = "" +
            "INSERT INTO event (" +
            " event_id, " +
            " user_id, " +
            " name, " +
            " description, " +
            " time) " +
            "VALUES (?, ?, ?, ?, ?)";
    int update = jdbcTemplate.update(
            sql,
            eventId,
            userId,
            event.getName(),
            event.getDescription(),
            timestamp
    );

    return update;
  }

  public List<Event> selectAllUserEvents(UUID userId) {
    String sql = "" +
            "SELECT " +
            " event_id, " +
            " user_id, " +
            " name, " +
            " description, " +
            " time " +
            "FROM event " +
            "WHERE user_id = ?";

    return jdbcTemplate.query(sql, new Object[]{userId}, mapEventFromDb());
  }

  public List<Event> selectAllEvents() {
    String sql = "" +
            "SELECT " +
            " event_id, " +
            " user_id, " +
            " name, " +
            " description, " +
            " time " +
            "FROM event ";

    return jdbcTemplate.query(sql, new Object[]{}, mapEventFromDb());
  }

  private RowMapper<Event> mapEventFromDb() {
    return (resultSet, i) -> {
      String eventIdStr = resultSet.getString("event_id");
      UUID eventId = UUID.fromString(eventIdStr);
      String userIdStr = resultSet.getString("user_id");
      UUID userId = UUID.fromString(userIdStr);

      String name = resultSet.getString("name");
      String description = resultSet.getString("description");
      String time = resultSet.getString("time");

      return new Event(eventId, userId, name, description, time);
    };
  }

  int deleteEvent(UUID eventId) {
    System.out.println("delete event:");
    System.out.println("event id: " + eventId);

    String sql = "" +
            "DELETE FROM event " +
            "WHERE event_id = ?";

    int update = jdbcTemplate.update(sql, eventId);
    return update;
  }

  int updateEvent(UUID eventId, String newName, String newDescription, String newTime) {

    Timestamp timestamp = Timestamp.valueOf(newTime);

    String sql = "UPDATE event " +
            "SET name = ?, " +
            " description = ?, " +
            " time = ? " +
            "WHERE event_id = ?";

    int update = jdbcTemplate.update(sql, newName, newDescription, timestamp, eventId);
    return update;
  }
}
