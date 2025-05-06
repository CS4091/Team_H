'use client';

import { RouteProvider } from "@/contexts/RouteOptionsContext";
import CreateRouteContent from "@/components/CreateRouteContent";

export default function CreateRoutePage() {
    return (
        <RouteProvider>
            <CreateRouteContent/>
        </RouteProvider>
    );
};