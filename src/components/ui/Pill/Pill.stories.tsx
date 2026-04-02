import type { Meta, StoryObj } from "@storybook/react";
import { Pill, variants } from "./index";

const meta: Meta<typeof Pill> = {
	title: "UI/Pill",
	component: Pill,
	tags: ["autodocs"],
	argTypes: {
		status: {
			control: { type: "select" },
			options: variants.status,
			description: "Read/unread status — drives both visual style and aria-pressed",
		},
		onClick: { action: "clicked" },
	},
};

export default meta;
type Story = StoryObj<typeof Pill>;

export const Default: Story = {};

export const Read: Story = {
	args: { status: "read" },
};

export const Unread: Story = {
	args: { status: "unread" },
};
