import fs from 'fs'
import path from 'path'

export const loadSmsTemplate = async (
  templateName: string,
  variables: Record<string, any>
): Promise<string> => {
  // Fix path to work from monorepo root
  const templatePath = path.join(
    process.cwd(),
    'apps/api/src/integrations/communication/sms/templates',
    `${templateName}.sms.txt`
  )

  let content = fs.readFileSync(templatePath, 'utf-8')

  for (const key in variables) {
    const regex = new RegExp(`{{${key}}}`, 'g') // ✅ Fixed
    content = content.replace(regex, variables[key])
  }

  return content
}
