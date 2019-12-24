package com.winterproject.demo.student;

import com.winterproject.demo.exception.ApiRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/students")
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

  @GetMapping(path = "{studentId}/courses")
  public List<StudentCourse> getAllcoursesForStudent(@PathVariable("studentId") UUID studentId) {
    System.out.println("get all courses of a student: " + studentId);
    return studentService.getAllCoursesForStudent(studentId);
  }

  @PostMapping
  public void addNewStudent(@RequestBody @Valid Student student) {
    System.out.println("new student: " + student);
    studentService.addNewStudent(student);
  }
}
