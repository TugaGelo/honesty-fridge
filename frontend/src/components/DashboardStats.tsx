import type { DashboardStats as StatsType } from '../types';

export function DashboardStats({ stats }: { stats: StatsType | null }) {
    if (!stats) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-golda-white p-6 rounded-lg shadow-md border-t-4 border-golda-coffee">
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide">Total Expenses</h3>
                <p className="text-3xl font-bold text-golda-coffee mt-2">₱{stats.totalExpenses.toFixed(2)}</p>
            </div>

            <div className="bg-golda-white p-6 rounded-lg shadow-md border-t-4 border-golda-coffee">
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide">Cash In Jar</h3>
                <p className="text-3xl font-bold text-golda-coffee mt-2">₱{stats.totalCashIn.toFixed(2)}</p>
            </div>

            <div className="bg-golda-white p-6 rounded-lg shadow-md border-t-4 border-golda-green">
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide">Net Profit</h3>
                <p className={`text-3xl font-bold mt-2 ${stats.netProfit >= 0 ? 'text-golda-green' : 'text-golda-yellow'}`}>
                    ₱{stats.netProfit.toFixed(2)}
                </p>
            </div>

            <div className="bg-golda-white p-6 rounded-lg shadow-md border-t-4 border-golda-yellow">
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide">Outstanding Debt</h3>
                <p className="text-3xl font-bold text-golda-coffee mt-2">₱{stats.totalUnpaidTabs.toFixed(2)}</p>
            </div>
        </div>
    );
}
