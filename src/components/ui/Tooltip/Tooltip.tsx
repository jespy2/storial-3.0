'use client'
export const Tooltip = ({
	message,
	parent,
}: {
	message: string;
	parent: string;
}) => {
	return (
		<>
			<div className={` tooltip tooltip-${parent} after:content-['']`}>
				{message}
			</div>
		</>
	);
};
