"use client";

import { Card } from "@/components/ui/card";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface ChartProps {
  data: {
    name: string;
    total: number;
  }[];
}

export const Chart = ({ data }: ChartProps) => {
  return (
    <Card>
      <ResponsiveContainer width="100%" height={500}>
        <BarChart className="pt-4 pb-2" data={data}>
          <XAxis
            dataKey="name"
            stroke="black"
            fontSize={13}
            tickLine={true}
            axisLine={true}
          />
          <YAxis
            stroke="black"
            fontSize={13}
            tickLine={true}
            axisLine={true}
            tickFormatter={(value) => `${value}`}
          />
          <Bar dataKey="total" fill="#0369a1" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};
