import { SetupAdmin } from "./components/SetupAdmin";

export default function App() {
    const refreshData = () => {
        console.log("Data added! Refreshing...");
    };

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-golda-coffee mb-8 text-center">
                    ☕ Office Honesty Fridge
                </h1>

                <SetupAdmin onDataAdded={refreshData} />
            </div>
        </div>
    );
}
