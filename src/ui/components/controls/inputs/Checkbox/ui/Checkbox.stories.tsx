import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { decoratorBackground } from '../../../../../../../.storybook/decorators/decoratorBackground/decoratorBackground'

import { Checkbox } from '../index';
import { Text } from 'ui/components/shared/Text';

const meta: Meta<typeof Checkbox> = {
    title: 'components/controls/Checkbox',
    component: Checkbox,
    decorators: [
        (Story) => (
          decoratorBackground(Story)
        )
      ],
    parameters: {
        layout: 'fullscreen',
    },

    tags: ['autodocs'],
    argTypes: {

    },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const CheckboxWithCheck: Story = {
    args: {
        id: 'storybook',
        children: (<Text>Checkbox with the check</Text>),
        checked: true,
        onChange() {
            
        },
    },
};

export const CheckboxWithoutCheck: Story = {
    args: {
        id: 'storybook',
        children: (<Text>Checkbox without the check</Text>),
        checked: false,
        onChange() {
            
        },
    },
};

export const CheckboxWithCheckDisabled: Story = {
    args: {
        id: 'storybook',
        children: (<Text>Checkbox with the check, BUT disabled</Text>),
        checked: true,
        onChange() {
            
        },
        disabled: true
    },
};
