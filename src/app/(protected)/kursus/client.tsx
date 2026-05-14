"use client";

import { CourseCard } from "@/components/course/course-card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Course, CourseCategory, CourseParams } from "@/feat/kursus/dto";
import { cn } from "@/lib/utils";
import { Atom, ChevronUp, Filter, LoaderCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import queryString from "query-string";
import { useRef, useState, useTransition } from "react";

interface CourseProps {
  course: Course[];
  courseCategory: CourseCategory[];
  searchParams?: CourseParams;
}

function CourseClient({ course, courseCategory, searchParams }: CourseProps) {
  const router = useRouter();
  const [inputSearch, setInputSearch] = useState(searchParams?.search ?? "");
  const [isPending, startTransition] = useTransition();
  const debouncedRef = useRef<ReturnType<typeof setTimeout>>(void 0);
  const pathname = usePathname();
  const [openCategoryMenu, setOpenCategoryMenu] = useState(false);
  const [openCategoryAccordion, setOpenCategoryAccordion] = useState(false);
  const [openCategoryList, setOpenCategoryList] = useState<number | null>(null);
  const [filterCategory, setFilterCategory] = useState(
    searchParams?.subCategoryId ?? [],
  );

  const handleSearch = (value: string) => {
    if (debouncedRef.current) {
      clearTimeout(debouncedRef.current);
    }
    setInputSearch(value);

    if (searchParams?.search === value.trim()) {
      return;
    }

    const queryParams = queryString.stringify(
      { ...searchParams, search: value.trim() },
      { skipNull: true, skipEmptyString: true, arrayFormat: "comma" },
    );

    debouncedRef.current = setTimeout(() => {
      startTransition(() =>
        router.push(`${pathname}?${queryParams}`, { scroll: false }),
      );
    }, 500);
  };

  const handleFilter = (id: number) => {
    const currentCategory = filterCategory.includes(id)
      ? filterCategory.filter((item) => item !== id)
      : [...filterCategory, id];
    setFilterCategory(currentCategory);
    const queryParams = queryString.stringify(
      { ...searchParams, subCategoryId: currentCategory },
      { skipNull: true, skipEmptyString: true, arrayFormat: "comma" },
    );
    router.push(`${pathname}?${queryParams}`, { scroll: false });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between gap-2 max-sm:flex-col">
        <Button
          className="max-sm:w-full border border-grey shadow-[0_1px_2px_0_#1018280D] px-2 py-2.5 rounded-lg w-62.5 justify-between"
          onClick={() => setOpenCategoryMenu((prev) => !prev)}
        >
          <div className="gap-2 flex items-center">
            <Filter size={16} />
            Filter
          </div>
          <span className="bg-light-blue font-medium rounded-lg text-sm min-w-5 text-primary">
            {filterCategory.length}
          </span>
        </Button>

        <div className="relative">
          <Input
            type="search"
            value={inputSearch}
            onChange={(e) => {
              const value = e.target.value;
              handleSearch(value);
            }}
          />
          {isPending && (
            <Button
              disabled
              className="absolute top-1/2 -translate-y-1/2 right-1.75 size-8 animate-spin"
            >
              <LoaderCircle size={20} />
            </Button>
          )}
        </div>
      </div>

      <div className="flex gap-6 max-sm:flex-col">
        {openCategoryMenu && (
          <div className="border border-white-subtle sm:w-78">
            <div
              className="p-5 text-lg border border-light-grey border-t-lg justify-between flex cursor-pointer"
              onClick={() => setOpenCategoryAccordion((prev) => !prev)}
            >
              Category
              <ChevronUp
                className={cn(
                  "font-normal size-6 stroke-2",
                  !openCategoryAccordion && "rotate-180",
                )}
              />
            </div>
            {openCategoryAccordion && (
              <div className="sm:h-145 overflow-y-auto rounded-b-lg px-5 py-4">
                {!courseCategory.length ? (
                  <div className="flex items-center justify-center h-full">
                    Tidak ada data
                  </div>
                ) : (
                  <div className="space-y-4">
                    {courseCategory.map(({ subCategory, ...course }) => {
                      const isOpen = openCategoryList === course.id;
                      return (
                        <div key={`category${course.id}`} className="space-y-4">
                          <div
                            className="flex justify-between items-center gap-2 cursor-pointer"
                            onClick={() =>
                              setOpenCategoryList((prev) =>
                                prev === course.id ? null : course.id,
                              )
                            }
                          >
                            <div className="flex gap-3 text-sm font-medium items-center">
                              <Atom size={24} className="text-primary" />
                              {course.name}
                            </div>
                            <ChevronUp
                              size={16}
                              className={cn(
                                "text-primary",
                                !isOpen && "rotate-180",
                              )}
                            />
                          </div>
                          {isOpen && (
                            <ul className="space-y-2.5">
                              {subCategory?.map((sub) => (
                                <li key={`sub${course.id}${sub.id}`}>
                                  <label
                                    className="flex justify-between items-center gap-2"
                                    htmlFor={`sub${course.id}${sub.id}`}
                                  >
                                    <div className="wrap-anywhere flex items-center text-dark-grey gap-2 has-checked:text-primary">
                                      <Checkbox
                                        id={`sub${course.id}${sub.id}`}
                                        checked={filterCategory.includes(
                                          sub.id,
                                        )}
                                        onChange={() => handleFilter(sub.id)}
                                      />
                                      {sub.name}
                                    </div>
                                    <span className="font-medium text-sm text-disabled">
                                      {sub.count}
                                    </span>
                                  </label>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        <div className="@container/card-list w-full">
          {!course.length ? (
            <div className="font-poppins font-semibold text-4xl flex items-center justify-center h-125">
              Tidak ada data
            </div>
          ) : (
            <div className="grid grid-cols-1 @xl/card-list:grid-cols-2 @4xl/card-list:grid-cols-3 gap-6 @7xl/card-list:grid-cols-4">
              {course.map((item) => (
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
                        disabled={item.isEnrolled}
                      >
                        Tambah kursus
                      </Button>
                    </div>
                  }
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseClient;
