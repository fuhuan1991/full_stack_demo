package com.my_portfolio.note;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public class NoteDataAccessService {
  private final JdbcTemplate jdbcTemplate;

  @Autowired
  public NoteDataAccessService (JdbcTemplate jdbcTemplate) {
    this.jdbcTemplate = jdbcTemplate;
  }

  int insertNote(UUID noteId, UUID userId, Note note) {
    System.out.println("new note:");
    System.out.println(note.getTitle());
    System.out.println(note.getDescription());

    String sql = "" +
            "INSERT INTO note (" +
            " note_id, " +
            " user_id, " +
            " title, " +
            " description) " +
            "VALUES (?, ?, ?, ?)";
    int update = jdbcTemplate.update(
            sql,
            noteId,
            userId,
            note.getTitle(),
            note.getDescription()
    );
    return update;
  }

  public List<Note> selectAllUserNotes(UUID userId) {
    String sql = "" +
            "SELECT " +
            " note_id, " +
            " user_id, " +
            " title, " +
            " description " +
            "FROM note " +
            "WHERE user_id = ?";
    return jdbcTemplate.query(
            sql,
            new Object[]{userId},
            mapNoteFromDb()
    );
  }

  int deleteNote(UUID noteId) {
    System.out.println("delete note:");
    System.out.println("note id: " + noteId);

    String sql = "" +
            "DELETE FROM note " +
            "WHERE note_id = ?";
    int update = jdbcTemplate.update(
            sql,
            noteId
    );
    return update;
  }

  int updateNote(UUID noteId, String newTitle, String newDescription) {
    String sql = "UPDATE note " +
                 "SET title = ?, " +
                 " description = ? " +
                 "WHERE note_id = ?";
    int update = jdbcTemplate.update(
            sql,
            newTitle,
            newDescription,
            noteId
    );
    return update;
  }

  private RowMapper<Note> mapNoteFromDb() {
    return (resultSet, i) -> {
      String noteIdStr = resultSet.getString("note_id");
      UUID noteId = UUID.fromString(noteIdStr);
      String userIdStr = resultSet.getString("user_id");
      UUID userId = UUID.fromString(userIdStr);

      String title = resultSet.getString("title");
      String description = resultSet.getString("description");

      return new Note(noteId, userId, title, description);
    };
  }
}
