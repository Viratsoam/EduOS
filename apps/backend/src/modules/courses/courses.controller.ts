import { Body, Controller, Get, Post, Version } from "@nestjs/common";
import { RequirePermissions } from "../../common/decorators/permissions.decorator";
import { CoursesService } from "./courses.service";
import { CreateCourseDto } from "./dto/create-course.dto";

@Controller("courses")
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  @Version("1")
  @RequirePermissions("student.view")
  listCourses() {
    return this.coursesService.listCourses();
  }

  @Post()
  @Version("1")
  @RequirePermissions("course.create")
  createCourse(@Body() dto: CreateCourseDto) {
    return this.coursesService.createCourse(dto);
  }
}
