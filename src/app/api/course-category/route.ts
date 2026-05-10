import { NextResponse } from "next/server";
import COURSE_DATA from "@/data/course.json";
import { CourseCategory } from "@/feat/kursus/dto";

export async function GET(): Promise<NextResponse<CourseCategory[]>> {
  const subCategoryCount = COURSE_DATA.courses.reduce(
    (acc: { idSubCategory: number; count: number }[], val) => {
      const key = val.idSubCategory;
      const find = acc.find((item) => item.idSubCategory === key);

      if (!find) {
        acc.push({ idSubCategory: key, count: 1 });
      } else {
        find.count += 1;
      }

      return acc;
    },
    [],
  );

  const result = COURSE_DATA.categories.map((category) => {
    const subCategory = COURSE_DATA.subCategories
      .filter((sub) => sub.idCategory === category.id)
      .map((sub) => ({
        id: sub.id,
        name: sub.name,
      }));

    return {
      id: category.id,
      name: category.name,
      subCategory: subCategory.map((item) => ({
        ...item,
        count:
          subCategoryCount.find((sub) => sub.idSubCategory === item.id)
            ?.count ?? 0,
      })),
    };
  });

  return NextResponse.json(result, { status: 200 });
}
