import { useState } from "react";
import { api } from "../api";
import type { Product } from "../types";

export function QuickActions({
                                 products,
                                 onRefresh,
                             }: {
    products: Product[];
    onRefresh: () => void;
}) {
    // Cash Box State
    const [cashAmount, setCashAmount] = useState("");
    const [cashNote, setCashNote] = useState("");

    // Restock Expense State
    const [desc, setDesc] = useState("");
    const [expenseAmount, setExpenseAmount] = useState("");
    const [productId, setProductId] = useState("");
    const [qty, setQty] = useState("");

    const handleCashSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!cashAmount) return;
        await api.collectCash(Number(cashAmount), cashNote);
        setCashAmount("");
        setCashNote("");
        onRefresh();
    };

    const handleRestockSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!desc || !expenseAmount) return;
        await api.logRestock(desc, Number(expenseAmount), Number(productId), Number(qty));
        setDesc("");
        setExpenseAmount("");
        setProductId("");
        setQty("");
        onRefresh();
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Daily Cash Collection Form */}
            <div className="bg-golda-white p-6 rounded-lg shadow-md border-t-4 border-golda-green">
                <h2 className="text-xl font-bold text-golda-coffee mb-4">📥 Collect Cash</h2>
                <form onSubmit={handleCashSubmit} className="flex flex-col gap-3">
                    <input
                        type="number" step="0.01" placeholder="Amount Found in Jar (₱)"
                        value={cashAmount} onChange={e => setCashAmount(e.target.value)}
                        className="border p-2 rounded"
                    />
                    <input
                        type="text" placeholder="Note (e.g., End of day Friday)"
                        value={cashNote} onChange={e => setCashNote(e.target.value)}
                        className="border p-2 rounded"
                    />
                    <button type="submit" className="bg-golda-green text-white font-bold py-2 rounded hover:bg-opacity-90">
                        Log Collection
                    </button>
                </form>
            </div>

            {/* Restock Expense Form */}
            <div className="bg-golda-white p-6 rounded-lg shadow-md border-t-4 border-golda-coffee">
                <h2 className="text-xl font-bold text-golda-coffee mb-4">🛒 Log Restock Expense</h2>
                <form onSubmit={handleRestockSubmit} className="flex flex-col gap-3">
                    <input
                        type="text" placeholder="Description (e.g., Grocery Run)"
                        value={desc} onChange={e => setDesc(e.target.value)}
                        className="border p-2 rounded"
                    />
                    <input
                        type="number" step="0.01" placeholder="Total Cost (₱)"
                        value={expenseAmount} onChange={e => setExpenseAmount(e.target.value)}
                        className="border p-2 rounded"
                    />
                    <div className="flex gap-3">
                        <select
                            value={productId} onChange={e => setProductId(e.target.value)}
                            className="border p-2 rounded w-1/2 bg-white"
                        >
                            <option value="">Select Product...</option>
                            {products.map(p => (
                                <option key={p.id} value={p.id}>{p.name}</option>
                            ))}
                        </select>
                        <input
                            type="number" placeholder="Qty Added"
                            value={qty} onChange={e => setQty(e.target.value)}
                            className="border p-2 rounded w-1/2"
                        />
                    </div>
                    <button type="submit" className="bg-golda-coffee text-white font-bold py-2 rounded hover:bg-opacity-90">
                        Save Expense
                    </button>
                </form>
            </div>
        </div>
    );
}
