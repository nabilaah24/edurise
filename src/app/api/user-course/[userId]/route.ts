import { NextResponse } from "next/server";
import COURSE_DATA from "@/data/course.json";
import MY_COURSE_DATA from "@/data/user-course.json";
import { MyCourse } from "@/feat/kursus/dto";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ userId: string }> },
): Promise<NextResponse<MyCourse[]>> {
  const { userId } = await params;
  const myCourse = MY_COURSE_DATA.data.filter(
    (course) => course.userId === +userId,
  );

  const mappingCourse = myCourse.map(({ id, courseId, progress }) => {
    const courseData = COURSE_DATA.courses.filter(
      (item) => item.id === courseId,
    )[0];

    const { idCategory, idSubCategory, ...restCourse } = courseData ?? {};

    const category = COURSE_DATA.categories.find((c) => c.id === idCategory);
    const subCategory = COURSE_DATA.subCategories.find(
      (sc) => sc.id === idSubCategory,
    );

    return {
      id,
      course: {
        ...restCourse,
        category,
        subCategory,
      },
      progress,
    };
  });

  return NextResponse.json(mappingCourse, { status: 200 });
}
