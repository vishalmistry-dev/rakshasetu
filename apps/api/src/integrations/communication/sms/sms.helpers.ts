import fs from "fs";
import path from "path";

export const loadSmsTemplate = async (templateName: string, variables: Record<string, any>): Promise<string> => {
    const templatePath = path.join(__dirname, "templates", `${templateName}.sms.txt`);
    let content = fs.readFileSync(templatePath, "utf-8");

    for (const key in variables) {
        const regex = new RegExp(`{{${key}}}`, "g");
        content = content.replace(regex, variables[key]);
    }

    return content;
};
