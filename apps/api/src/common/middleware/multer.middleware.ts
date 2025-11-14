import { Request } from 'express'
import fs from 'fs'
import multer, { FileFilterCallback } from 'multer'
import path from 'path'
import { AppError } from '../errors'
import { generateFileName } from '../utils'

// ---------------------------
// Constants
// ---------------------------
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10 MB
const UPLOAD_TEMP_DIR = path.join(process.cwd(), 'public', 'temp')

// Ensure temp folder exists
if (!fs.existsSync(UPLOAD_TEMP_DIR)) {
  fs.mkdirSync(UPLOAD_TEMP_DIR, { recursive: true })
}

// ---------------------------
// File filter
// ---------------------------
export const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf']
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new AppError('Invalid file type. Only images and PDFs are allowed.'))
  }
  cb(null, true)
}

// ---------------------------
// Storage configuration
// ---------------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_TEMP_DIR)
  },
  filename: (req, file, cb) => {
    const uniqueName = generateFileName(file.originalname)
    cb(null, uniqueName)
  },
})

// ---------------------------
// Multer instance
// ---------------------------
export const upload = multer({
  storage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter,
})
