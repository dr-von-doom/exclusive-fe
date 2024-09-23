import filtersData from "@/data/filters.json";
import { Filter as FilterType } from "@/types/Filter";
import React, { useState } from "react";
import ArrowOpen from "@/assets/icons/arrowopen.svg";
import ArrowClosed from "@/assets/icons/arrowclosed.svg";

export type FilterProps = {
  onFilterChange: (selectedOptions: Record<string, string[]>) => void;
  categoryId: number;
};

export const Filter: React.FC<FilterProps> = ({ onFilterChange, categoryId }: FilterProps) => {
  const [openFilters, setOpenFilters] = useState<Set<string>>(new Set());
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string[]>
  >({});

  const toggleFilter = (filterName: string) => {
    const newOpenFilters = new Set(openFilters);
    if (newOpenFilters.has(filterName)) {
      newOpenFilters.delete(filterName);
    } else {
      newOpenFilters.add(filterName);
    }
    setOpenFilters(newOpenFilters);
    onFilterChange(selectedOptions);
  };

  const handleOptionChange = (
    filterName: string,
    option: string,
    checked: boolean,
  ) => {
    const newSelectedOptions = { ...selectedOptions };
    if (!newSelectedOptions[filterName]) {
      newSelectedOptions[filterName] = [];
    }
    if (checked) {
      newSelectedOptions[filterName].push(option);
    } else {
      newSelectedOptions[filterName] = newSelectedOptions[filterName].filter(
        (opt) => opt !== option,
      );
    }
    setSelectedOptions(newSelectedOptions);
    onFilterChange(newSelectedOptions);
  };

  const filteredFilters =
    (filtersData as FilterType[]).find(
      (filterCategory) => filterCategory.categoryId === categoryId,
    )?.filters || [];

  return (
    <div className="m-0 font-poppins">
      <h2 className="mb-4 text-xl text-black md:text-2xl">Filters</h2>
      {filteredFilters.map((filter) => (
        <div key={filter.name} className="mb-2">
          <div
            className="flex cursor-pointer items-center rounded-md border border-gray-200 bg-gray-100 p-4 px-3 py-2 font-medium"
            onClick={() => toggleFilter(filter.name)}
          >
            <span
              className={'mr-2'}
            >
              <img
                src={openFilters.has(filter.name) ? ArrowOpen : ArrowClosed}
                alt="Arrow Icon"
                className="h-4 w-4"
              />
            </span>

            <span className="text-sm capitalize">{filter.name}</span>
          </div>
          {openFilters.has(filter.name) && (
            <ul className="rounded-md border border-gray-300 p-2">
              {filter.options.map((option) => (
                <li key={option} className="flex items-center rounded p-2">
                  <input
                    type={filter.type}
                    id={option}
                    name={filter.name}
                    className="h-4 w-4 cursor-pointer rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    onChange={(e) =>
                      handleOptionChange(filter.name, option, e.target.checked)
                    }
                  />
                  <label
                    htmlFor={option}
                    className="text-black-600 ml-2 cursor-pointer text-sm"
                  >
                    {option}
                  </label>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default Filter;
