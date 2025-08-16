"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Lead } from "@/lib/types/lead"

interface ChartsProps {
  leads: Lead[]
}

function DashboardCharts({ leads }: ChartsProps) {
  return (
    <div className="dashboard-charts-grid grid gap-4 grid-cols-1 md:grid-cols-5 lg:grid-cols-5">
      <Card>
        <CardHeader>
          <CardTitle>Dashboard Charts</CardTitle>
          <CardDescription>Charts will be restored shortly</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Total leads: {leads.length}</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default DashboardCharts;
export { DashboardCharts };