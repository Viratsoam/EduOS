import { Injectable } from "@nestjs/common";
import { demoTenantContext } from "../../common/tenant/tenant-context";
import { CreateCourseDto } from "./dto/create-course.dto";
import { CoursesRepository } from "./courses.repository";

@Injectable()
export class CoursesService {
  constructor(private readonly coursesRepository: CoursesRepository) {}

  listCourses() {
    return this.coursesRepository.listByTenant(demoTenantContext);
  }

  createCourse(dto: CreateCourseDto) {
    return this.coursesRepository.create(demoTenantContext, dto.title);
  }
}
