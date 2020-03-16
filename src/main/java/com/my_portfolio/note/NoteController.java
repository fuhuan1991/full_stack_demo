package com.my_portfolio.note;


import com.my_portfolio.user.User;
import com.my_portfolio.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/notes")
public class NoteController {

  private final NoteService noteService;
  private final UserService userService;

  @Autowired
  public NoteController(NoteService noteService, UserService userService) {
    this.userService = userService;
    this.noteService = noteService;
  }

  // get all notes of a specific user
  @GetMapping(path = "getUserNotes/{userId}")
  public List<Note> getUserNotes(@PathVariable("userId") UUID userId) throws Exception {
    System.out.println("------------getUserNotes-----------");
    String nameFromToken = SecurityContextHolder.getContext().getAuthentication().getName();
    List<User> userList = userService.getUserByName(nameFromToken);
    UUID idFromToken = userList.get(0).getUserId();
    System.out.println("idFromToken: " + idFromToken);
    System.out.println("userId required: " + userId);
    System.out.println("-----------------------------------");
    if (idFromToken.equals(userId)) {
      return noteService.getAllUserNotes(userId);
    } else {
      throw new Exception("User name not match");
    }
  }

  // create a new note
  @PostMapping(path = "{userId}")
  public void addNewNote(@PathVariable("userId") UUID userId, @RequestBody @Valid Note note) throws Exception {
    System.out.println("------------addNewNote-----------");
    String nameFromToken = SecurityContextHolder.getContext().getAuthentication().getName();
    List<User> userList = userService.getUserByName(nameFromToken);
    UUID idFromToken = userList.get(0).getUserId();
    System.out.println("idFromToken: " + idFromToken);
    System.out.println("userId required: " + userId);
    System.out.println("-----------------------------------");
    if (idFromToken.equals(userId)) {
      noteService.addNewNote(userId, note);
    } else {
      throw new Exception("User name not match");
    }
  }

  // delete a specific note
  @DeleteMapping(path = "{noteId}")
  public void deleteNote(@PathVariable("noteId") UUID noteId) {
    noteService.deleteNote(noteId);
  }

  // update a existing note
  @PutMapping
  public void update(@RequestBody @Valid Note note) {
    noteService.updateNote(note.getNoteId(), note.getTitle(), note.getDescription());
  }

}
