import Link from "next/link";

export default function DashboardPage() {
    return (
        <div className="flex flex-col h-screen justify-center items-center">
            <h1>DASHBOARD PAGE</h1>
            <div>
                <Link
                    href="/auth/route-generator"
                    className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                    Route Generator
                </Link>
            </div>
        </div>
    );
};