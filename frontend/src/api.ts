import type {Coworker, DashboardStats, Product} from "./types";

const API_BASE = "http://localhost:8080/api";

export const api = {
    getStats: async (): Promise<DashboardStats> => {
        const res = await fetch(`${API_BASE}/dashboard/stats`);
        return res.json();
    },

    getProducts: async (): Promise<Product[]> => {
        const res = await fetch(`${API_BASE}/products`);
        return res.json();
    },

    getCoworkers: async (): Promise<Coworker[]> => {
        const res = await fetch(`${API_BASE}/coworkers`);
        return res.json();
    },

    addTabEntry: async (coworkerId: number, productId: number) => {
        const res = await fetch(`${API_BASE}/tabs`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ coworkerId, productId }),
        });
        return res.json();
    },

    settleTab: async (coworkerId: number) => {
        const res = await fetch(`${API_BASE}/tabs/settle/${coworkerId}`, {
            method: "POST",
        });
        return res.json();
    },

    logRestock: async (description: string, amount: number, productId: number, quantityAdded: number) => {
        const res = await fetch(`${API_BASE}/expenses/restock`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ description, amount, productId, quantityAdded }),
        });
        return res.json();
    },

    collectCash: async (amount: number, note: string) => {
        const res = await fetch(`${API_BASE}/collections`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount, note }),
        });
        return res.json();
    },

    createProduct: async (name: string, price: number, currentStock: number) => {
        const res = await fetch(`${API_BASE}/products`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, price, currentStock, lowStockThreshold: 5 }),
        });
        return res.json();
    },

    createCoworker: async (name: string) => {
        const res = await fetch(`${API_BASE}/coworkers`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name }),
        });
        return res.json();
    }
};
