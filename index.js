import { optimizeSvg } from "./optimizer.js"
import { readdirSync, existsSync, readFileSync, writeFile } from "node:fs"
import { join } from "node:path"

const nodeArgs = process.argv
if (nodeArgs.length < 3) throw new Error("Folder path not provided!")
if (nodeArgs.length < 4) throw new Error("Export file name not provided!")

const folderPath = nodeArgs[2]
const exportPath = nodeArgs[3]

if (!existsSync(folderPath)) throw new Error("Folder does not exist!")

const folderContents = readdirSync(folderPath)

const svgFiles = folderContents.filter(file => file.endsWith(".svg"))

const svgs = {}
svgFiles.forEach(fileName => {
  const name = fileName.substring(0, fileName.length - 4)
  const fileContent = readFileSync(join(folderPath, fileName), "utf8")

  const optimized = optimizeSvg(fileContent)
  const cleaned = optimized
    .replace(/fill="#(\w|\d){3,6}"/gi, `fill="currentColor"`)
    .replace(/stroke="#(\w|\d){3,6}"/gi, `fill="none" stroke="currentColor"`)

  svgs[name] = cleaned
})

writeFile(exportPath, JSON.stringify(svgs), () => {})
