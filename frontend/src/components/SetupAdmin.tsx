import { useState } from "react";
import { api } from "../api";

export function SetupAdmin({ onDataAdded }: { onDataAdded: () => void }) {
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productStock, setProductStock] = useState("");

    const [coworkerName, setCoworkerName] = useState("");

    const handleAddProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!productName || !productPrice || !productStock) return;

        await api.createProduct(productName, Number(productPrice), Number(productStock));
        setProductName("");
        setProductPrice("");
        setProductStock("");
        onDataAdded();
    };

    const handleAddCoworker = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!coworkerName) return;

        await api.createCoworker(coworkerName);
        setCoworkerName("");
        onDataAdded();
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-golda-white p-6 rounded-lg shadow-md border-t-4 border-golda-yellow">
                <h2 className="text-xl font-bold text-golda-coffee mb-4">Add New Product</h2>
                <form onSubmit={handleAddProduct} className="flex flex-col gap-3">
                    <input
                        type="text" placeholder="Product Name (e.g. Golda)"
                        value={productName} onChange={e => setProductName(e.target.value)}
                        className="border p-2 rounded"
                    />
                    <div className="flex gap-3">
                        <input
                            type="number" placeholder="Price (₱)"
                            value={productPrice} onChange={e => setProductPrice(e.target.value)}
                            className="border p-2 rounded w-1/2"
                        />
                        <input
                            type="number" placeholder="Initial Stock"
                            value={productStock} onChange={e => setProductStock(e.target.value)}
                            className="border p-2 rounded w-1/2"
                        />
                    </div>
                    <button type="submit" className="bg-golda-coffee text-white font-bold py-2 rounded hover:bg-opacity-90">
                        Save Product
                    </button>
                </form>
            </div>

            <div className="bg-golda-white p-6 rounded-lg shadow-md border-t-4 border-golda-yellow">
                <h2 className="text-xl font-bold text-golda-coffee mb-4">Add Coworker</h2>
                <form onSubmit={handleAddCoworker} className="flex flex-col gap-3">
                    <input
                        type="text" placeholder="Coworker Name"
                        value={coworkerName} onChange={e => setCoworkerName(e.target.value)}
                        className="border p-2 rounded"
                    />
                    <button type="submit" className="bg-golda-coffee text-white font-bold py-2 rounded hover:bg-opacity-90 mt-auto">
                        Save Coworker
                    </button>
                </form>
            </div>
        </div>
    );
}
