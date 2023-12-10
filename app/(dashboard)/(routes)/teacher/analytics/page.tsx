import { redirect } from "next/navigation";
import { getAnalytics } from "@/actions/get-analytic";
import { DataCard } from "./_components/data-card";
import { Chart } from "./_components/chart";
import { getSession } from "@/lib/auth";

const AnalyticPage = async () => {
  const session = await getSession();
    
    if (!session) {
        return redirect("/");
    }

    const userId = session.user.uid;

  const { data, totalRevenue, totalSales } = await getAnalytics(userId);

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
        <DataCard
          label="Total Revenue"
          value={totalRevenue}
          shouldFormat
        />
        <DataCard
          label="Total Sales"
          value={totalSales}
        />
      </div>
      <Chart
        data={data}
      />
    </div>
  );
};

export default AnalyticPage;
