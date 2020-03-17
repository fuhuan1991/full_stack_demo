package com.my_portfolio.event;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotBlank;
import java.util.UUID;

public class Event {

  private final UUID eventId;
  private final UUID userId;
  @NotBlank
  private final String name;
  private final String description;
  @NotBlank
  private final String time;

  public Event(
          @JsonProperty("eventId") UUID eventId,
          @JsonProperty("userId") UUID userId,
          @JsonProperty("name") String name,
          @JsonProperty("description") String description,
          @JsonProperty("time") String time) {
    this.eventId = eventId;
    this.userId = userId;
    this.name = name;
    this.description = description;
    this.time = time;
  }

  public UUID getEventId() {
    return eventId;
  }

  public UUID getUserId() {
    return userId;
  }

  public String getName() {
    return name;
  }

  public String getDescription() {
    return description;
  }

  public String getTime() {
    return time;
  }

  @Override
  public String toString() {
    return "Event{" +
            "eventId=" + eventId +
            ", userId=" + userId +
            ", name='" + name + '\'' +
            ", description='" + description + '\'' +
            ", time='" + time + '\'' +
            '}';
  }
}
