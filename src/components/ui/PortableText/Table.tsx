import {
  PortableText,
  type PortableTextReactComponents,
} from "@portabletext/react";
import { stegaClean } from "@sanity/client/stega";

interface TableCell {
  _key: string;
  value?: unknown[];
}

interface TableRow {
  _key: string;
  cells?: TableCell[];
}

export interface PortableTextTableValue {
  headerRows?: number;
  caption?: string;
  rows?: TableRow[];
}

interface PortableTextTableProps {
  value: PortableTextTableValue;
}

const cellMarks: PortableTextReactComponents["marks"] = {
  strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
  link: ({ children, value }) => {
    const href = value?.href as string | undefined;
    const isExternal =
      Boolean(value?.blank) || stegaClean(href ?? "").startsWith("http");
    return (
      <a
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="text-brand-secondary-dark underline hover:no-underline"
      >
        {children}
      </a>
    );
  },
};

const cellComponents: Partial<PortableTextReactComponents> = {
  block: {
    normal: ({ children }) => <p className="m-0 leading-snug">{children}</p>,
  },
  marks: cellMarks,
};

function CellContent({ value }: { value?: unknown[] }) {
  if (!value?.length) return null;

  return (
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    <PortableText value={value as any} components={cellComponents} />
  );
}

export default function PortableTextTable({ value }: PortableTextTableProps) {
  const rows = value.rows?.filter((row) => row.cells?.length) ?? [];
  if (!rows.length) return null;

  const headerCount = Math.min(value.headerRows ?? 0, rows.length);
  const headerRows = rows.slice(0, headerCount);
  const bodyRows = rows.slice(headerCount);

  return (
    <figure className="my-8">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-[0.95em]">
          {headerRows.length > 0 && (
            <thead>
              {headerRows.map((row) => (
                <tr key={row._key} className="bg-brand-primary text-white">
                  {row.cells?.map((cell) => (
                    <th
                      key={cell._key}
                      scope="col"
                      className="px-4 py-3 font-semibold"
                    >
                      <CellContent value={cell.value} />
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
          )}
          {bodyRows.length > 0 && (
            <tbody>
              {bodyRows.map((row) => (
                <tr
                  key={row._key}
                  className="border-b border-brand-border even:bg-brand-surface"
                >
                  {row.cells?.map((cell) => (
                    <td key={cell._key} className="px-4 py-3 align-top">
                      <CellContent value={cell.value} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
      {value.caption && (
        <figcaption className="mt-3 text-sm italic text-brand-muted">
          {value.caption}
        </figcaption>
      )}
    </figure>
  );
}
