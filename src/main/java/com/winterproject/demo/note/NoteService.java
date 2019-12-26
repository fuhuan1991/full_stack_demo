package com.winterproject.demo.note;

import com.winterproject.demo.EmailValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class NoteService {

  private final NoteDataAccessService noteDataAccessService;
  private final EmailValidator emailValidator;

  @Autowired
  public NoteService(NoteDataAccessService noteDataAccessService, EmailValidator emailValidator) {
    this.noteDataAccessService = noteDataAccessService;
    this.emailValidator = emailValidator;
  }

  List<Note> getAllUserNotes(UUID userId) {
    return noteDataAccessService.selectAllUserNotes(userId);
  }

  void addNewNote(UUID userId, Note note) {
    UUID noteId = UUID.randomUUID();
    noteDataAccessService.insertNote(noteId, userId, note);
  }

  void deleNote(UUID noteId) {
    noteDataAccessService.deleteNote(noteId);
  }

  void updateNote(UUID noteId, String newTitle, String newDescription) {
    noteDataAccessService.updateNote(noteId, newTitle, newDescription);
  }

}

