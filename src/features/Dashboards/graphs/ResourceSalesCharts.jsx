import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function ResourceSalesCharts({ stats }) {
    const data = [
        {
            status: 'Pending',
            Items: stats.pending.items,
            'Total Cost': stats.pending.total
        },
        {
            status: 'Shipped',
            Items: stats.shipped.items,
            'Total Cost': stats.shipped.total
        },
        {
            status: 'Completed',
            Items: stats.completed.items,
            'Total Cost': stats.completed.total
        }
    ];

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="status" />
                <YAxis yAxisId="left" orientation="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="Items" fill="#4dabf5" />
                <Bar yAxisId="right" dataKey="Total Cost" fill="#2e7d32" />
            </BarChart>
        </ResponsiveContainer>
    );
}
