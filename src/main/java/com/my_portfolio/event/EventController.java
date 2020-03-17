package com.my_portfolio.event;

import com.my_portfolio.note.Note;
import com.my_portfolio.note.NoteService;
import com.my_portfolio.user.User;
import com.my_portfolio.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/events")
public class EventController {

  private final EventService eventService;
  private final UserService userService;

  @Autowired
  public EventController(EventService eventService, UserService userService) {
    this.userService = userService;
    this.eventService = eventService;
  }

  // create a new event
  @PostMapping(path = "{userId}")
  public void addNewEvent(@PathVariable("userId") UUID userId, @RequestBody @Valid Event event) throws Exception {
    System.out.println("------------add New Event-----------");
//    String nameFromToken = SecurityContextHolder.getContext().getAuthentication().getName();
//    List<User> userList = userService.getUserByName(nameFromToken);
//    UUID idFromToken = userList.get(0).getUserId();
//    System.out.println("idFromToken: " + idFromToken);
//    System.out.println("userId required: " + userId);
//    System.out.println("-----------------------------------");
//    if (idFromToken.equals(userId)) {
//      eventService.addNewEvent(userId, event);
//    } else {
//      throw new Exception("User name not match");
//    }
    eventService.addNewEvent(userId, event);
  }

  // get all events of a specific user
  @GetMapping(path = "getUserEvents/{userId}")
  public List<Event> getUserEvents(@PathVariable("userId") UUID userId) throws Exception {
//    System.out.println("------------getUserNotes-----------");
//    String nameFromToken = SecurityContextHolder.getContext().getAuthentication().getName();
//    List<User> userList = userService.getUserByName(nameFromToken);
//    UUID idFromToken = userList.get(0).getUserId();
//    System.out.println("idFromToken: " + idFromToken);
//    System.out.println("userId required: " + userId);
//    System.out.println("-----------------------------------");
//    if (idFromToken.equals(userId)) {
//      return noteService.getAllUserNotes(userId);
//    } else {
//      throw new Exception("User name not match");
//    }
    return eventService.getAllUserEvents(userId);
  }

  @GetMapping(path = "getAllEvents")
  public List<Event> getAllEvents() throws Exception {
    return eventService.getAllEvents();
  }

  // delete a specific event
  @DeleteMapping(path = "{eventId}")
  public void deleteEvent(@PathVariable("eventId") UUID eventId) {
    eventService.deleteEvent(eventId);
  }

  // update a existing event
  @PutMapping
  public void update(@RequestBody @Valid Event event) {
    eventService.updateEvent(event.getEventId(), event.getName(), event.getDescription(), event.getTime());
  }

}
