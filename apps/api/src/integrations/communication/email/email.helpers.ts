import fs from 'fs/promises'
import path from 'path'

export const loadEmailTemplate = async (templateName: string, variables: Record<string, any>) => {
  // Use process.cwd() to get monorepo root, then navigate to templates
  const templatesPath = path.join(process.cwd(), '/src/integrations/communication/email/templates')
  const filePath = path.join(templatesPath, `${templateName}.html`)

  let template = await fs.readFile(filePath, 'utf-8')

  // Replace {{variable}} placeholders with actual values
  Object.keys(variables).forEach((key) => {
    const regex = new RegExp(`{{${key}}}`, 'g')
    template = template.replace(regex, variables[key])
  })

  return template
}
