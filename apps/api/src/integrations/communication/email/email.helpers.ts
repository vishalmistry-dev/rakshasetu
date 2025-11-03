import path from "path";
import fs from "fs/promises";

export const loadEmailTemplate = async (templateName: string, variables: Record<string, any>) => {
    const filePath = path.join(__dirname, "templates", `${templateName}.html`);
    let template = await fs.readFile(filePath, "utf-8");

    // Replace {{variable}} placeholders with actual values
    Object.keys(variables).forEach(key => {
        const regex = new RegExp(`{{${key}}}`, "g");
        template = template.replace(regex, variables[key]);
    });

    return template;
};
