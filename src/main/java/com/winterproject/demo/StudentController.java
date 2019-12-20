package com.winterproject.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("students")
public class StudentController {
  @GetMapping
  public List<Student> getAllStudent() {
    return List.of(
            new Student(
                    UUID.randomUUID(),
                    "James",
                    "Bond",
                    "james_bond@gmail.com",
                    Student.Gender.MALE),
            new Student(
                    UUID.randomUUID(),
                    "Elisa",
                    "Tamara",
                    "elisa_tamara@hotmail.com",
                    Student.Gender.FEMALE)
    );
  }
}
