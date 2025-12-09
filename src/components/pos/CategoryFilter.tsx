import React from 'react';
import { cn } from '@/lib/utils';
import { categories } from '@/data/products';

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function CategoryFilter({ selectedCategory, onSelectCategory }: CategoryFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelectCategory(category.id)}
          className={cn(
            "flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap transition-all duration-200 font-medium text-sm",
            selectedCategory === category.id
              ? "bg-primary text-primary-foreground shadow-glow"
              : "glass hover:bg-secondary hover:border-primary/30"
          )}
        >
          <span className="text-base">{category.icon}</span>
          <span>{category.name}</span>
        </button>
      ))}
    </div>
  );
}
