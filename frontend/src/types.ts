export interface Product {
    id: number;
    name: string;
    price: number;
    currentStock: number;
    lowStockThreshold: number;
}

export interface TabEntry {
    id: number;
    coworkerId: number;
    productId: number;
    productName: string;
    amount: number;
    isSettled: boolean;
    createdAt: string;
}

export interface Coworker {
    id: number;
    name: string;
    totalOwed: number;
    unpaidTabs: TabEntry[];
}

export interface DashboardStats {
    totalExpenses: number;
    totalCashIn: number;
    netProfit: number;
    totalUnpaidTabs: number;
}
