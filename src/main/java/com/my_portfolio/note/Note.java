package com.my_portfolio.note;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotBlank;
import java.util.UUID;

public class Note {
  private final UUID noteId;
  private final UUID userId;
  private final String title;
  @NotBlank
  private final String description;

  public Note(
          @JsonProperty("noteId") UUID noteId,
          @JsonProperty("userId") UUID userId,
          @JsonProperty("title") String title,
          @JsonProperty("description") String description) {
    this.noteId = noteId;
    this.userId = userId;
    this.title = title;
    this.description = description;
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


  @Override
  public String toString() {
    return "Note{" +
            "noteId=" + noteId +
            ", userId=" + userId +
            ", title='" + title + '\'' +
            ", description='" + description + '\'' +
            '}';
  }
}
