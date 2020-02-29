package com.my_portfolio.note;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/notes")
public class NoteController {

  private final NoteService noteService;

  @Autowired
  public NoteController(NoteService noteService) {
    this.noteService = noteService;
  }

  // get all notes of a specific user
  @GetMapping(path = "getUserNotes/{userId}")
  public List<Note> getUserNotes(@PathVariable("userId") UUID userId) {
    return noteService.getAllUserNotes(userId);
  }

  // create a new note
  @PostMapping(path = "{userId}")
  public void addNewNote(@PathVariable("userId") UUID userId, @RequestBody @Valid Note note) {
    noteService.addNewNote(userId, note);
  }

  // delete a specific note
  @DeleteMapping(path = "{noteId}")
  public void deleteNote(@PathVariable("noteId") UUID noteId) {
    noteService.deleteNote(noteId);
  }

  // update a existing note
  @PutMapping
  public void update(@RequestBody @Valid Note note) {
//    System.out.println(note);
    noteService.updateNote(note.getNoteId(), note.getTitle(), note.getDescription());
  }

}
