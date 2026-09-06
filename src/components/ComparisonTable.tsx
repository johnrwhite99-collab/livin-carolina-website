export interface ComparisonRow {
  label: string;
  values: string[];
}

export function ComparisonTable({
  columns,
  rows,
}: {
  columns: string[];
  rows: ComparisonRow[];
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-left text-sm">
        <thead className="bg-brand-black text-white">
          <tr>
            <th className="px-4 py-3 font-semibold"></th>
            {columns.map((col) => (
              <th key={col} className="px-4 py-3 font-semibold">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-t border-border bg-surface">
              <td className="px-4 py-3 font-medium text-brand-black">{row.label}</td>
              {row.values.map((value, i) => (
                <td key={i} className="px-4 py-3 text-foreground/70">
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
