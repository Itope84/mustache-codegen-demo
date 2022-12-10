import { promises as fs } from 'fs'
import {resolve} from 'path';
import Mustache from 'mustache'

export const generateOutput = (template, data) => Mustache.render(template, data)

export const generateOutputFromCsv = async (data, templatePath, outputFileName) => {
    const template = await fs.readFile(resolve(templatePath), "utf8")
    const output = generateOutput(template, data)
    const fileName = `outputs/${outputFileName}`
    await fs.writeFile(fileName, output)
    console.log(output)
}