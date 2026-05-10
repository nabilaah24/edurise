"use server";

import { BaseURL } from "@/config";
import { Course, CourseCategory, CourseParams, MyCourse } from "./dto";
import axios from "axios";
import { createResponseError } from "@/lib/utils";

const getAllCourse = async (
  params?: CourseParams,
): Promise<{
  data: Course[];
  error?: string;
}> => {
  try {
    const response = await axios.get<Course[]>(`${BaseURL}/api/course`, {
      params: { ...params },
    });
    return { data: response.data };
  } catch (error) {
    return createResponseError<Course[]>({ data: [], error });
  }
};

const getAllCourseCategory = async (): Promise<{
  data: CourseCategory[];
  error?: string;
}> => {
  try {
    const response = await axios.get<CourseCategory[]>(
      `${BaseURL}/api/course-category`,
    );
    return { data: response.data };
  } catch (error) {
    return createResponseError<CourseCategory[]>({ data: [], error });
  }
};

const getMyCourse = async (
  userId: number,
): Promise<{ data: MyCourse[]; error?: string }> => {
  try {
    const response = await axios.get<MyCourse[]>(
      `${BaseURL}/api/user-course/${userId}`,
    );
    return { data: response.data };
  } catch (error) {
    return createResponseError<MyCourse[]>({ data: [], error });
  }
};

export { getAllCourse, getAllCourseCategory, getMyCourse };
