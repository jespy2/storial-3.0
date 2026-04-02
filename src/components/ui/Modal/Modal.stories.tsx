import type { Meta, StoryObj } from "@storybook/react";
import { Modal, variants } from "./index";

const meta: Meta<typeof Modal> = {
	title: "UI/Modal",
	component: Modal,
	tags: ["autodocs"],
	// Render inside a positioned container so the absolute backdrop is visible
	decorators: [
		(Story) => (
			<div style={{ position: "relative", height: "400px", width: "100%" }}>
				<Story />
			</div>
		),
	],
	args: {
		isOpen: true,
		children: <p style={{ padding: "1rem" }}>Modal content goes here.</p>,
	},
	argTypes: {
		size: {
			control: { type: "select" },
			options: variants.size,
			description: "Width of the modal container",
		},
		isOpen: {
			control: { type: "boolean" },
			description: "Controls visibility — the modal returns null when false",
		},
	},
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {};

export const Small: Story = {
	args: { size: "sm" },
};

export const Large: Story = {
	args: { size: "lg" },
};

export const Closed: Story = {
	args: { isOpen: false },
};
