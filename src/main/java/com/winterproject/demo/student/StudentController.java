package com.winterproject.demo.student;

import com.winterproject.demo.exception.ApiRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("students")
public class StudentController {

  private final StudentService studentService;

  @Autowired
  public StudentController(StudentService studentService) {
    this.studentService = studentService;
  }

  @GetMapping
  public List<Student> getAllStudent() {
//    throw new ApiRequestException("Oops!");
    return studentService.getAllStudents();
  }

  @PostMapping
  public void addNewStudent(@RequestBody @Valid Student student) {
    System.out.println("new student: " + student);
    studentService.addNewStudent(student);
  }
}
