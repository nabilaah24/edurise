import { PageContainer } from "@/components/layout/page-container";
import CourseClient from "./client";
import { getAllCourse, getAllCourseCategory } from "@/feat/kursus/api";
import { CourseParams } from "@/feat/kursus/dto";
import queryString from "query-string";
import { auth } from "@/lib/helper";

async function CoursePage(props: { searchParams: Promise<CourseParams> }) {
  const searchParams = await props.searchParams;
  const session = await auth();
  const { subCategoryId } = queryString.parse(
    `subCategoryId=${searchParams.subCategoryId}`,
    {
      arrayFormat: "comma",
      parseNumbers: true,
    },
  );
  const subCategoryParsed: number[] = Array.isArray(subCategoryId)
    ? subCategoryId.filter((item) => typeof item === "number")
    : typeof subCategoryId === "number"
      ? [subCategoryId]
      : [];
  const { data: course } = await getAllCourse({
    ...searchParams,
    subCategoryId: subCategoryParsed,
    userId: session?.user.id,
  });
  const { data: courseCategory } = await getAllCourseCategory();

  return (
    <PageContainer title={`Kursus (${course.length})`}>
      <CourseClient
        {...{
          course,
          courseCategory,
        }}
        searchParams={{
          ...searchParams,
          subCategoryId: subCategoryParsed,
        }}
      />
    </PageContainer>
  );
}

export default CoursePage;
