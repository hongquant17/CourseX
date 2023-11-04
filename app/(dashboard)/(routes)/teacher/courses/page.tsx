import { Button } from "@/components/ui/button";
import Link from "next/link";

const CoursesPage = () =>{
    return (
      <div className="h-full flex justify-center pt-20">
        <Link href="/teacher/create">
          <Button>Thêm khóa học</Button>
        </Link>
      </div>
    );
}

export default CoursesPage;