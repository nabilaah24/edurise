interface Category {
  id: number;
  name: string;
}

interface SubCategory {
  id: number;
  name: string;
  idCategory: number;
}

interface CourseCategory {
  id: number;
  name: string;
  subCategory?: (Pick<SubCategory, "id" | "name"> & { count: number })[];
}

interface Course {
  id: number;
  name: string;
  chapter: string;
  category?: Category;
  subCategory?: SubCategory;
  isEnrolled?: boolean;
}

interface MyCourse {
  id: number;
  course: Course;
  progress: number;
}

interface CourseParams {
  search?: string;
  subCategoryId?: number[];
  userId?: number;
}

export type {
  Category,
  SubCategory,
  CourseCategory,
  Course,
  MyCourse,
  CourseParams,
};
