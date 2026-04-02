import type { Meta, StoryObj } from "@storybook/react";
import { Button, variants } from "./index";

const meta: Meta<typeof Button> = {
	title: "UI/Button",
	component: Button,
	tags: ["autodocs"],
	args: {
		children: "Button",
	},
	argTypes: {
		variant: {
			control: { type: "select" },
			options: variants.variant,
			description: "Visual style variant",
		},
		size: {
			control: { type: "select" },
			options: variants.size,
			description: "Size of the button",
		},
		disabled: {
			control: { type: "boolean" },
		},
		children: {
			control: { type: "text" },
		},
	},
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {};

export const Primary: Story = {
	args: { variant: "primary" },
};

export const Secondary: Story = {
	args: { variant: "secondary" },
};

export const Ghost: Story = {
	args: { variant: "ghost" },
};

export const Danger: Story = {
	args: { variant: "danger" },
};

export const Small: Story = {
	args: { size: "sm" },
};

export const Large: Story = {
	args: { size: "lg" },
};

export const Disabled: Story = {
	args: { disabled: true },
};
