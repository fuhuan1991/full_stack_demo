package com.winterproject.demo.user;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotBlank;
import java.util.UUID;

public class Task {
  private final UUID noteId;
  private final UUID userId;
  private final String title;
  @NotBlank
  private final String description;
  private final String deadline;

  public Task(
          @JsonProperty("noteId") UUID noteId,
          @JsonProperty("userId") UUID userId,
          @JsonProperty("title") String title,
          @JsonProperty("description") String description,
          @JsonProperty("deadline") String deadline) {
    this.noteId = noteId;
    this.userId = userId;
    this.title = title;
    this.description = description;
    this.deadline = deadline;
  }

  public UUID getNoteId() {
    return noteId;
  }

  public UUID getUserId() {
    return userId;
  }

  public String getTitle() {
    return title;
  }

  public String getDescription() {
    return description;
  }

  public String getDeadline() {
    return deadline;
  }

  @Override
  public String toString() {
    return "Task{" +
            "noteId=" + noteId +
            ", userId=" + userId +
            ", title='" + title + '\'' +
            ", description='" + description + '\'' +
            ", deadline='" + deadline + '\'' +
            '}';
  }
}
