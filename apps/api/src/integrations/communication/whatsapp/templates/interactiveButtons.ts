// interactiveButtons.ts
export interface ButtonsMessageVariables {
    body: string;
    buttons: { type: string; title: string; payload: string }[];
}

export const interactiveButtons = (variables: ButtonsMessageVariables) => {
    return {
        body: variables.body,
        buttons: variables.buttons
    };
};
