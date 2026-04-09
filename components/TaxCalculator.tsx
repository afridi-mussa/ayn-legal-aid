"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/footer";
import { Navigation } from "@/components/navigation";

export default function TaxCalculator() {
  const [monthlyIncome, setMonthlyIncome] = useState<number>(0);
  const [currentType, setCurrentType] = useState<0 | 1>(0); // 0 = Salaried, 1 = Non-Salaried

  // Tax slabs for 2026 only
  const slabs2026 = {
    salaried: [
      { limit: 600_000, rate: 0, fixed: 0 },
      { limit: 1_200_000, rate: 0.01, fixed: 0 },
      { limit: 2_200_000, rate: 0.11, fixed: 6_000 },
      { limit: 3_200_000, rate: 0.23, fixed: 116_000 },
      { limit: 4_100_000, rate: 0.3, fixed: 346_000 },
      { limit: Infinity, rate: 0.35, fixed: 616_000 },
    ],
    nonsalaried: [
      { limit: 600_000, rate: 0, fixed: 0 },
      { limit: 1_200_000, rate: 0.15, fixed: 0 },
      { limit: 1_600_000, rate: 0.2, fixed: 90_000 },
      { limit: 3_200_000, rate: 0.3, fixed: 170_000 },
      { limit: 5_600_000, rate: 0.4, fixed: 650_000 },
      { limit: Infinity, rate: 0.45, fixed: 1_610_000 },
    ],
  };

  const calculateTax = () => {
    if (monthlyIncome <= 0) return null;

    const annualIncome = monthlyIncome * 12;
    let taxableIncome = annualIncome;

    const slabs = currentType === 0 ? slabs2026.salaried : slabs2026.nonsalaried;

    let tax = 0;
    for (let i = 0; i < slabs.length; i++) {
      const slab = slabs[i];
      if (taxableIncome <= slab.limit) {
        if (i > 0) {
          const prevLimit = slabs[i - 1].limit;
          tax = slabs[i - 1].fixed + (taxableIncome - prevLimit) * slab.rate;
        }
        break;
      }
    }

    if (taxableIncome > 10_000_000) {
      tax *= currentType === 0 ? 1.09 : 1.1;
    }

    const monthlyTax = Math.round(tax / 12);
    const monthlyNet = Math.round(monthlyIncome - monthlyTax);

    return {
      monthlyGross: monthlyIncome,
      yearlyGross: annualIncome,
      taxableIncome,
      yearlyTax: Math.round(tax),
      monthlyTax,
      monthlyNet,
    };
  };

  const result = calculateTax();

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-background text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          🇵🇰 Income Tax Calculator 2026
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Calculate your monthly and yearly income tax for Salaried and Non-Salaried individuals.
        </p>
      </section>

      {/* Calculator Form */}
      <section className="py-16 bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl mb-2">Calculate Your Tax</CardTitle>
              <p className="text-muted-foreground text-sm">
                Select your type and enter your monthly income.
              </p>
            </CardHeader>
            <CardContent className="space-y-6">

              {/* Type Toggle */}
              <div className="flex gap-4 bg-card rounded-full p-1">
                <Button
                  variant={currentType === 0 ? "default" : "outline"}
                  className="flex-1"
                  onClick={() => setCurrentType(0)}
                >
                  Salaried
                </Button>
                <Button
                  variant={currentType === 1 ? "default" : "outline"}
                  className="flex-1"
                  onClick={() => setCurrentType(1)}
                >
                  Non-Salaried
                </Button>
              </div>

              {/* Income Input */}
              <div>
                <label className="block mb-2 font-medium text-foreground">Monthly Income (PKR)</label>
                <input
                  type="number"
                  value={monthlyIncome || ""}
                  onChange={(e) => setMonthlyIncome(parseFloat(e.target.value))}
                  placeholder="e.g. 150000"
                  className="w-full p-3 text-lg border-2 border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>

              {/* Result */}
              {result && (
                <Card className="bg-primary/5 border border-primary mt-4">
                  <CardContent>
                    <table className="w-full text-left border-collapse text-sm md:text-base">
                      <tbody>
                        <tr>
                          <th className="py-2">Monthly Gross</th>
                          <td className="py-2">{result.monthlyGross.toLocaleString("en-PK")}</td>
                        </tr>
                        <tr>
                          <th className="py-2">Yearly Gross</th>
                          <td className="py-2">{result.yearlyGross.toLocaleString("en-PK")}</td>
                        </tr>
                        <tr>
                          <th className="py-2">Taxable Income</th>
                          <td className="py-2">{result.taxableIncome.toLocaleString("en-PK")}</td>
                        </tr>
                        <tr>
                          <th className="py-2">Yearly Tax</th>
                          <td className="py-2 font-bold text-primary">{result.yearlyTax.toLocaleString("en-PK")}</td>
                        </tr>
                        <tr>
                          <th className="py-2">Monthly Tax</th>
                          <td className="py-2 font-bold text-primary">{result.monthlyTax.toLocaleString("en-PK")}</td>
                        </tr>
                        <tr>
                          <th className="py-2">Take-Home Pay</th>
                          <td className="py-2 font-bold text-primary">{result.monthlyNet.toLocaleString("en-PK")}</td>
                        </tr>
                      </tbody>
                    </table>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

     
    </main>
  );
}