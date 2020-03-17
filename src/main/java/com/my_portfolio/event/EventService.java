package com.my_portfolio.event;

import com.my_portfolio.note.Note;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class EventService {

  private final EventDataAccessService eventDataAccessService;

  @Autowired
  public EventService(EventDataAccessService eventDataAccessService) {
    this.eventDataAccessService = eventDataAccessService;
  }

  void addNewEvent(UUID userId, Event event) {
    UUID eventId = UUID.randomUUID();
    eventDataAccessService.insertEvent(eventId, userId, event);
  }

  List<Event> getAllUserEvents(UUID userId) {
    return eventDataAccessService.selectAllUserEvents(userId);
  }

  List<Event> getAllEvents() {
    return eventDataAccessService.selectAllEvents();
  }

  void deleteEvent(UUID eventId) {
    eventDataAccessService.deleteEvent(eventId);
  }

  void updateEvent(UUID eventId, String newName, String newDescription, String newTime) {
    eventDataAccessService.updateEvent(eventId, newName, newDescription, newTime);
  }
}
