import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export type FieldType = string;

const sortedFields: FieldType[] = [
  'invoiceDate',
  'paymentDue',
  'businessName',
  'clientName',
  'total',
];

function formatFieldName(field: string): string {
  return field
    .replace(/([A-Z])/g, ' $1')
    .replace(/_/g, ' ')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default function SortInvoices() {
  return (
    <Select>
      <SelectTrigger
        className="w-[150px] border-none"
        aria-label="open sort by fields"
      >
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {sortedFields.map((field) => (
            <SelectItem
              key={field}
              value={field}
              className="cursor-pointer"
            >
              {formatFieldName(field)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
