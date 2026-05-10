import { PageContainer } from "@/components/layout/page-container";
import DashboardClient from "./client";
import { getAllCourse, getMyCourse } from "@/feat/kursus/api";
import { auth } from "@/lib/helper";
import { SummaryCardProps } from "@/components/course/summary-card";

async function DashboardPage() {
  const session = await auth();
  const userId = session?.user.id;
  const { data: myCourse } = await getMyCourse(userId ?? 0);
  const { data: course } = await getAllCourse({ userId });
  const recommendationCourse = course.filter((item) => !item.isEnrolled);
  const enrolledCourses = myCourse.length;
  const activeCourses = myCourse.filter(
    (course) => course.progress < 100,
  ).length;
  const completedCourses = myCourse.filter(
    (course) => course.progress === 100,
  ).length;
  const summary: SummaryCardProps[] = [
    {
      icon: "play-circle",
      label: "Kursus diikuti",
      value: enrolledCourses,
      emptyState: !enrolledCourses ? "Belum ada kursus yang diikuti" : "",
      className: "bg-warning",
    },
    {
      icon: "check-square",
      label: "Kursus aktif",
      value: activeCourses,
      emptyState: !activeCourses ? "Tidak ada kursus yang aktif" : "",
      className: "bg-info",
    },
    {
      icon: "trophy",
      label: "Kursus selesai",
      value: completedCourses,
      emptyState: !completedCourses ? "Belum ada kursus yang selesai" : "",
      className: "bg-success-light",
    },
  ];

  return (
    <PageContainer title="Kursus">
      <DashboardClient {...{ summary, myCourse, recommendationCourse }} />
    </PageContainer>
  );
}

export default DashboardPage;
