import { NextRequest, NextResponse } from "next/server";
import COURSE_DATA from "@/data/course.json";
import MY_COURSE from "@/data/user-course.json";
import { Course } from "@/feat/kursus/dto";

export async function GET(req: NextRequest): Promise<NextResponse<Course[]>> {
  // search and filter
  const searchParams = req.nextUrl.searchParams;
  const search = searchParams.get("search")?.toLowerCase() ?? "";
  const filterBySubCategory = searchParams.getAll("subCategoryId[]") ?? [];
  const userId = searchParams.getAll("userId") ?? "";
  const allCourse = COURSE_DATA.courses;
  const myCourse = MY_COURSE.data;

  let mappingCourse = allCourse.map(
    ({ idCategory, idSubCategory, ...course }) => {
      const category = COURSE_DATA.categories.find(
        (ctg) => ctg.id === idCategory,
      );
      const subCategory = COURSE_DATA.subCategories.find(
        (sub) => sub.id === idSubCategory,
      );
      let isEnrolled = false;
      if (userId) {
        isEnrolled = myCourse.some(
          (enrolled) =>
            enrolled.userId === +userId && enrolled.id === course.id,
        );
      }
      return {
        ...course,
        category,
        subCategory,
        ...(userId ? { isEnrolled } : {}),
      };
    },
  );

  if (search || filterBySubCategory) {
    mappingCourse = mappingCourse.filter((course) => {
      const searching =
        !search ||
        [course.name, course.chapter].some((item) =>
          item.toLowerCase().includes(search),
        );
      const filter =
        !filterBySubCategory.length ||
        filterBySubCategory.includes(`${course.subCategory?.id}`);

      return searching && filter;
    });
  }

  return NextResponse.json(mappingCourse, { status: 200 });
}
