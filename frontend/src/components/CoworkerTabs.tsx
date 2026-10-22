import { api } from "../api";
import type { Coworker, Product } from "../types";

export function CoworkerTabs({
                                 coworkers,
                                 products,
                                 onRefresh,
                             }: {
    coworkers: Coworker[];
    products: Product[];
    onRefresh: () => void;
}) {
    const handleTakeItem = async (coworkerId: number, productId: number) => {
        await api.addTabEntry(coworkerId, productId);
        onRefresh(); // Instantly syncs the UI with the database
    };

    const handleSettle = async (coworkerId: number) => {
        await api.settleTab(coworkerId);
        onRefresh();
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {coworkers.map((coworker) => (
                <div key={coworker.id} className="bg-golda-white p-6 rounded-lg shadow-md border-l-4 border-golda-yellow flex flex-col">

                    {/* Header: Name & Debt */}
                    <div className="flex justify-between items-center mb-4 border-b pb-2">
                        <h2 className="text-xl font-bold text-golda-coffee">{coworker.name}</h2>
                        <span className={`font-bold ${coworker.totalOwed > 0 ? 'text-golda-coffee' : 'text-golda-green'}`}>
              ₱{coworker.totalOwed.toFixed(2)}
            </span>
                    </div>

                    {/* Quick Add Pill Buttons */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {products.map((product) => (
                            <button
                                key={product.id}
                                onClick={() => handleTakeItem(coworker.id, product.id)}
                                className="bg-golda-cream text-golda-coffee text-sm font-semibold py-1 px-3 rounded-full hover:bg-golda-yellow transition-colors shadow-sm"
                            >
                                + {product.name}
                            </button>
                        ))}
                    </div>

                    {/* Unpaid Items List */}
                    <div className="mb-4 flex-grow">
                        {coworker.unpaidTabs.length > 0 ? (
                            <>
                                <p className="text-xs font-bold text-gray-500 uppercase mb-2">Unpaid Items:</p>
                                <ul className="text-sm text-golda-coffee space-y-1">
                                    {coworker.unpaidTabs.map((tab) => (
                                        <li key={tab.id} className="flex justify-between border-b border-gray-100 last:border-0 pb-1">
                                            <span>{tab.productName}</span>
                                            <span>₱{tab.amount.toFixed(2)}</span>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        ) : (
                            <p className="text-sm text-gray-400 italic">No outstanding items.</p>
                        )}
                    </div>

                    {/* Settle Button */}
                    <button
                        onClick={() => handleSettle(coworker.id)}
                        disabled={coworker.totalOwed === 0}
                        className={`mt-auto py-2 rounded font-bold transition-colors ${
                            coworker.totalOwed > 0
                                ? 'bg-golda-yellow text-golda-coffee hover:bg-opacity-80'
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                    >
                        {coworker.totalOwed > 0 ? 'Settle Debt' : 'All Settled'}
                    </button>
                </div>
            ))}
        </div>
    );
}
