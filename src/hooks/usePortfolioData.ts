import { useState, useEffect } from 'react';
import { getPortfolioData } from '@/lib/db_service';

export function usePortfolioData() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any>(null);

    const refreshData = async () => {
        try {
            setLoading(true);
            const portfolioData = await getPortfolioData();
            setData(portfolioData);
        } catch (err) {
            setError(err);
            console.error('Error fetching portfolio data:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refreshData();
    }, []);

    return { data, loading, error, refreshData };
}
