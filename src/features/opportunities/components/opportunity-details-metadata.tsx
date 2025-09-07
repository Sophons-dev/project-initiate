import { formatKey } from '@/lib/utils';

interface MetadataRendererProps {
  data: unknown;
  inline?: boolean;
}

export const MetadataRenderer = ({ data, inline }: MetadataRendererProps) => {
  if (data === null || data === undefined) {
    return <span>-</span>;
  }

  if (Array.isArray(data)) {
    return (
      <ul className='list-disc ml-6'>
        {data.map((item, i) => (
          <li key={i}>
            <MetadataRenderer data={item} />
          </li>
        ))}
      </ul>
    );
  }

  if (typeof data === 'object') {
    return (
      <div className='ml-4 space-y-1'>
        {Object.entries(data as Record<string, unknown>).map(([k, v]) => {
          const isPrimitive =
            v === null || ['string', 'number', 'boolean'].includes(typeof v);

          return (
            <div key={k} className='flex flex-wrap'>
              <span className='capitalize font-medium'>{formatKey(k)}:</span>
              {isPrimitive ? (
                <span className='ml-1'>{String(v)}</span>
              ) : (
                <MetadataRenderer data={v} />
              )}
            </div>
          );
        })}
      </div>
    );
  }

  // Primitive
  return <span>{String(data)}</span>;
};
