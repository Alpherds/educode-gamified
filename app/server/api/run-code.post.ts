import { exec } from 'child_process'
import fs from 'fs'
import path from 'path'
import util from 'util'

const execPromise = util.promisify(exec)

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { language, code } = body

  const tempDir = '/tmp/educode'
  if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir)

  const fileMap: Record<string, { file: string; cmd: string }> = {
    python: { file: 'main.py', cmd: 'python3 main.py' },
    cpp: { file: 'main.cpp', cmd: 'g++ main.cpp -o main && ./main' },
    java: { file: 'Main.java', cmd: 'javac Main.java && java Main' },
  }

  const lang = fileMap[language]
  if (!lang) return { output: 'Unsupported language' }

  const filePath = path.join(tempDir, lang.file)
  fs.writeFileSync(filePath, code)

  try {
    const { stdout, stderr } = await execPromise(lang.cmd, { cwd: tempDir, timeout: 5000 })
    return { output: stderr || stdout || '✅ Execution complete' }
  } catch (err: any) {
    return { output: `❌ Error: ${err.stderr || err.message}` }
  }
})
