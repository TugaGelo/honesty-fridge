import { useEffect, useState } from "react";
import { api } from "./api";
import type { Coworker, DashboardStats as StatsType, Product } from "./types";
import { SetupAdmin } from "./components/SetupAdmin";
import { DashboardStats } from "./components/DashboardStats";
import { CoworkerTabs } from "./components/CoworkerTabs";
import { QuickActions } from "./components/QuickActions";

export default function App() {
    // Master State
    const [stats, setStats] = useState<StatsType | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [coworkers, setCoworkers] = useState<Coworker[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Data Fetching
    const refreshAllData = async () => {
        try {
            const [fetchedStats, fetchedProducts, fetchedCoworkers] = await Promise.all([
                api.getStats(),
                api.getProducts(),
                api.getCoworkers()
            ]);
            setStats(fetchedStats);
            setProducts(fetchedProducts);
            setCoworkers(fetchedCoworkers);
        } catch (error) {
            console.error("Failed to fetch data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch immediately on mount
    useEffect(() => {
        refreshAllData();
    }, []);

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-golda-coffee mb-8 text-center border-b-2 border-golda-coffee pb-4 inline-block mx-auto w-full">
                    ☕ Office Honesty Fridge
                </h1>

                {isLoading ? (
                    <p className="text-center text-golda-coffee font-bold animate-pulse">Loading fridge data...</p>
                ) : (
                    <>
                        {/* Top Stats Row */}
                        <DashboardStats stats={stats} />

                        {/* Coworker Grid */}
                        <CoworkerTabs
                            coworkers={coworkers}
                            products={products}
                            onRefresh={refreshAllData}
                        />

                        {/* Daily Actions (Restock & Cash Collection) */}
                        <QuickActions
                            products={products}
                            onRefresh={refreshAllData}
                        />

                        {/* Bottom Setup Row (Add Products/Coworkers) */}
                        <SetupAdmin onDataAdded={refreshAllData} />
                    </>
                )}
            </div>
        </div>
    );
}
