import { getClaimChart } from "@/services/dashboardService";
import { useQuery } from "@tanstack/react-query";

export function useClaimChart(year?: number) {
    return useQuery({
        queryKey: ["claim-chart", year],
        queryFn: () => getClaimChart(year),
    });
}