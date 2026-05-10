import { Course } from "@/feat/kursus/dto";
import Image from "next/image";
import { ProgressBar } from "../ui/progress-bar";

interface CourseCardProps {
  course: Course;
  progress?: number;
  withCategory?: boolean;
  footer: React.ReactNode;
}

function CourseCard({
  course,
  progress,
  withCategory,
  footer,
}: CourseCardProps) {
  return (
    <div
      className="rounded-lg bg-white-subtle shadow-[0_12px_48px_0_#1D20261F] flex flex-col h-full"
      key={`course${course.id}`}
    >
      <Image
        src="/kursus.png"
        alt="Kursus Image"
        width={1000}
        height={1000}
        className="rounded-t-lg w-full h-55 object-cover"
      />

      <div className="p-4 space-y-4 flex flex-col flex-1">
        {withCategory && (
          <div className="bg-light-blue text-primary py-0.5 px-2 rounded-2xl text-sm font-medium w-fit">
            {course.category?.name}
          </div>
        )}
        <div className="space-y-1.5">
          <div className="text-dark-grey font-medium text-sm line-clamp-2">
            {course.name}
          </div>
          <div className="line-clamp-2">{course.chapter}</div>
        </div>
        {progress !== undefined && <ProgressBar width={progress} />}
        <div className="mt-auto flex flex-col">{footer}</div>
      </div>
    </div>
  );
}

export { CourseCard };
