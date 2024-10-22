'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { status } from '@/lib/data';
import { FilterProps } from '@/lib/types/props';
import React from 'react';

export default function FilterBy({ onFilterChange }: FilterProps) {
  function handleFilterChange(selectedValue: string) {
    onFilterChange(selectedValue);
  }

  return (
    <React.Fragment>
      <Select onValueChange={() => handleFilterChange}>
        <SelectTrigger
          className="w-[125px] border-none"
          aria-label="open filter by status options"
        >
          <SelectValue placeholder="Filter By" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup className="capitalize">
            {status.map((item) => (
              <SelectItem
                key={item}
                value={item}
                className="cursor-pointer"
              >
                <p className="capitalize">{status}</p>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </React.Fragment>
  );
}
