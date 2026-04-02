import type { Meta, StoryObj } from "@storybook/react";
import { Table, variants } from "./index";

const meta: Meta<typeof Table> = {
	title: "UI/Table",
	component: Table,
	tags: ["autodocs"],
	argTypes: {
		height: {
			control: { type: "select" },
			options: variants.height,
			description: "Controls the height of the table container",
		},
		isLoading: {
			control: { type: "boolean" },
			description: "Shows loading text in place of table content",
		},
		loadingText: {
			control: { type: "text" },
			description: "Text shown while isLoading is true",
		},
	},
};

export default meta;
type Story = StoryObj<typeof Table>;

const sampleRows = (
	<>
		<thead>
			<tr>
				<th className="table-header">Read</th>
				<th className="table-header">Title</th>
				<th className="table-header">Author</th>
				<th className="table-header">Notes</th>
			</tr>
		</thead>
		<tbody>
			<tr className="table-row">
				<td className="border-r p-3">read</td>
				<td className="border-r p-3">The Pragmatic Programmer</td>
				<td className="border-r p-3">David Thomas</td>
				<td className="p-3">Classic engineering reference</td>
			</tr>
			<tr className="table-row">
				<td className="border-r p-3">unread</td>
				<td className="border-r p-3">Clean Code</td>
				<td className="border-r p-3">Robert C. Martin</td>
				<td className="p-3">On the reading list</td>
			</tr>
		</tbody>
	</>
);

export const Default: Story = {
	args: { children: sampleRows },
};

export const HeightFull: Story = {
	args: { height: "full", children: sampleRows },
};

export const HeightAuto: Story = {
	args: { height: "auto", children: sampleRows },
};

export const Loading: Story = {
	args: { isLoading: true },
};

export const LoadingCustomText: Story = {
	args: {
		isLoading: true,
		loadingText: "Fetching your library...",
	},
};
