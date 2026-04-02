'use client';
import { useState, useEffect } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { cn } from '@/lib/utils';

export interface SearchInputProps {
	/** Called with the debounced value after the user stops typing. */
	onSearch: (value: string) => void;
	placeholder?: string;
	className?: string;
}

export function SearchInput({ onSearch, placeholder = 'Search…', className }: SearchInputProps) {
	const [value, setValue] = useState('');
	const debounced = useDebounce(value);

	useEffect(() => {
		onSearch(debounced);
	}, [debounced, onSearch]);

	return (
		<label className="sr-only-label flex flex-col gap-1 w-full">
			<span className="sr-only">Search</span>
			<input
				type="search"
				value={value}
				onChange={(e) => setValue(e.target.value)}
				placeholder={placeholder}
				aria-label="Search"
				className={cn(
					'w-full rounded-md border border-brand bg-surface-base px-3 py-2 text-sm text-neutral',
					'placeholder:text-neutral/50',
					'focus:outline-none focus:ring-2 focus:ring-brand',
					'dark:bg-surface-dark',
					className,
				)}
			/>
		</label>
	);
}
