'use client';
import { pillVariants } from '@/components/ui/Pill';
import { cn } from '@/lib/utils';
import { IBook } from '@/types';

type BookStatus = IBook['book']['status'];

const STATUSES: BookStatus[] = ['read', 'unread'];

export interface StatusFilterProps {
	activeFilters: BookStatus[];
	onToggle: (status: BookStatus) => void;
}

export function StatusFilter({ activeFilters, onToggle }: StatusFilterProps) {
	return (
		<div role="group" aria-label="Filter by status" className="flex gap-2">
			{STATUSES.map((status) => {
				const isActive = activeFilters.includes(status);
				return (
					<button
						key={status}
						type="button"
						aria-pressed={isActive}
						onClick={() => onToggle(status)}
						className={cn(
							pillVariants({ status }),
							!isActive && 'opacity-40',
						)}
					>
						{status}
					</button>
				);
			})}
		</div>
	);
}
