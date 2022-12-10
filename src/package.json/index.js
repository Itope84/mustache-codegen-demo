import prompt from 'prompt';
import { generateOutput, generateOutputFromCsv } from '../utils/generate-output.js';

const getPackageJson = async () => {
    prompt.start()

    const { name, version, description, main, test, repository, keywords, author, license } = await prompt.get({
        properties: {
            name: {
                pattern: new RegExp("^(?:@[a-z0-9-*~][a-z0-9-*._~]*/)?[a-z0-9-~][a-z0-9-._~]*$"),
                description: "Package Name",
                message: "Name must only have letters, numbers, - and/or _",
                required: true
            },
            version: {
                description: `Version: (1.0.0)`,
                default: undefined
            },
            description: {
                description: "Description"
            },
            main: {
                description: "Entry file (index.js)",
                default: undefined
            },
            keywords: {
                description: "Keywords - comma separated",
            }
        }
    })


    const data = {
        name,
        version,
        description,
        main,
        keywords: keywords.split(',').map(k => k.trim())
    }

    await generateOutputFromCsv(data, 'src/package.json/package.mustache', 'package.json')
}



getPackageJson()