// normalMessage.ts
export interface NormalMessageVariables {
    body: string;
}

export const normalMessage = (variables: NormalMessageVariables) => {
    return { body: variables.body };
};
