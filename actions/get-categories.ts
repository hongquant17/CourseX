import { db } from "@/lib/db";

export default async function getAllCategories() {
  try {
    const categories = await db.category.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return categories;
  } catch (error) {
    console.error("[GET_CATEGORIES]", error);
    return [];
  }
}
