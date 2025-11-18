// interactiveList.ts
export interface ListMessageVariables {
    body: string;
    buttonText: string;
    sections: { title: string; rows: { id: string; title: string }[] }[];
}

export const interactiveList = (variables: ListMessageVariables) => {
    return {
        body: variables.body,
        buttonText: variables.buttonText,
        sections: variables.sections
    };
};
