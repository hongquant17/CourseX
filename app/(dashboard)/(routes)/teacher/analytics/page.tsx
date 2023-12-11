import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getAnalytics } from "@/actions/get-analytic";
import { DataCard } from "./_components/data-card";
import { Chart } from "./_components/chart";

const AnalyticPage = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const { data, totalCourses, totalEnrollment } = await getAnalytics(userId);

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
        <DataCard
          label="Total Courses"
          value={totalCourses}
          shouldFormat
        />
        <DataCard
          label="Total Enrollment"
          value={totalEnrollment}
        />
      </div>
      <Chart
        data={data}
      />
    </div>
  );
};

export default AnalyticPage;
