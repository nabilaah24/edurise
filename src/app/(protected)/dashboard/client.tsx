"use client";

import { CourseCard } from "@/components/course/course-card";
import {
  SummaryCard,
  SummaryCardProps,
} from "@/components/course/summary-card";
import { Button } from "@/components/ui/button";
import { Course, MyCourse } from "@/feat/kursus/dto";
import { Download } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";

interface DashboardProps {
  summary: SummaryCardProps[];
  myCourse: MyCourse[];
  recommendationCourse: Course[];
}

const INCREMENT = 4;

function DashboardClient({
  summary,
  myCourse,
  recommendationCourse,
}: DashboardProps) {
  const router = useRouter();
  const [maxCard, setMaxCard] = useState(INCREMENT);
  const displayedRecCourse = useMemo(
    () => recommendationCourse.slice(0, maxCard),
    [recommendationCourse, maxCard],
  );
  const handleShowMore = () => {
    setMaxCard((prev) => prev + INCREMENT);
  };

  return (
    <div className="space-y-10">
      {/* card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {summary.map((item, index) => (
          <SummaryCard key={`summary${index}`} {...item} />
        ))}
      </div>

      {/* kursus saya */}
      <div className="space-y-6">
        <h1 className="font-poppins text-2xl font-medium">
          Kursus saya ({myCourse.length})
        </h1>

        {!myCourse.length ? (
          <div className="gap-6 flex items-center justify-center flex-col h-125">
            <div className="font-poppins font-semibold text-4xl">
              Belum ada kursus yang diikuti
            </div>
            <div className="text-lg">Tambah kursus di daftar kursus</div>
            <Button variant="primary" onClick={() => router.push("/kursus")}>
              Tambah kursus
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {myCourse.map((item) => (
              <CourseCard
                key={`myCourse${item.id}`}
                course={item.course}
                progress={item.progress}
                footer={
                  <div className="flex gap-2 flex-col">
                    <Button variant="primary">Lanjutkan Kursus</Button>
                    <Button
                      variant="primary-light"
                      disabled={item.progress < 100}
                    >
                      <Download />
                      Download sertifikat
                    </Button>
                  </div>
                }
              />
            ))}
          </div>
        )}
      </div>

      {/* rekomendasi kursus */}
      <div className="space-y-6">
        <h1 className="font-poppins text-2xl font-medium">
          Rekomendasi kursus
        </h1>

        {!recommendationCourse.length ? (
          <div className="gap-6 flex items-center justify-center flex-col h-125">
            <div className="font-poppins font-semibold text-4xl max-w-146.5 text-center">
              Belum ada daftar kursus yang dapat diikuti
            </div>
            <div className="text-lg">Mohon tunggu beberapa saat ...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedRecCourse.map((item) => (
              <CourseCard
                key={`recomendCourse${item.id}`}
                course={item}
                withCategory
                footer={
                  <div className="flex flex-col gap-4">
                    <Button variant="primary">Lihat detail kursus</Button>
                    <Button
                      variant="outline"
                      onClick={() => router.push("/kursus")}
                    >
                      Tambah kursus
                    </Button>
                  </div>
                }
              />
            ))}
          </div>
        )}

        {displayedRecCourse.length !== recommendationCourse.length && (
          <Button variant="outline" className="w-full" onClick={handleShowMore}>
            Lihat lebih banyak
          </Button>
        )}
      </div>
    </div>
  );
}

export default DashboardClient;
