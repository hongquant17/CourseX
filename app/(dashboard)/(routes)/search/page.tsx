import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { SearchInput } from "@/components/search-input";
import { getCourses } from "@/actions/get-courses";
import { CoursesList } from "@/components/courses-list";

import { Categories } from "./_components/categories";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

interface SearchPageProps {
    searchParams: {
        title: string;
        categoryId: string;
    }
};

const SearchPage = async ({
    searchParams
}: SearchPageProps) => {
    const session = await getServerSession(options);
    if (!session) {
        redirect("/api/auth/signin?callbackUrl=/");
    }
    const userId = "123"
    const categories = await db.category.findMany({
        orderBy: {
            name: "asc"
        }
    });

    const courses = await getCourses({
        userId,
        ...searchParams,
    });

    return (
        <>
            <div className="px-6 pt-6 md:hidden md:mb-0 block">
                <SearchInput />
            </div>
            <div className="p-6 space-y-4">
                <Categories
                    items={categories}
                />
                <CoursesList items={courses} />
            </div>
        </>
    );
}

export default SearchPage;