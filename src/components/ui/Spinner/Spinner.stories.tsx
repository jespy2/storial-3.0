import type { Meta, StoryObj } from "@storybook/react";
import { Spinner, variants } from "./index";

const meta: Meta<typeof Spinner> = {
	title: "UI/Spinner",
	component: Spinner,
	tags: ["autodocs"],
	argTypes: {
		size: {
			control: { type: "select" },
			options: variants.size,
			description: "Controls the size of the spinner container",
		},
	},
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {};

export const Small: Story = {
	args: { size: "sm" },
};

export const Medium: Story = {
	args: { size: "md" },
};

export const Large: Story = {
	args: { size: "lg" },
};
