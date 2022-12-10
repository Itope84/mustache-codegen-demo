/** 2. In this example, we convert an array to a csv file */

/** The goal is to show how to import different a template file as well as create an output file. Mustache is obviously not the best way to convert an array to csv when you can just .join(',') in javascript */

const fs = require('fs').promises;
const {resolve} = require('path');
const Mustache = require('mustache')

const generateOutput = (template, data) => Mustache.render(template, data)

const generateOutputFromCsv = async (data, outputFileName) => {
    const template = await fs.readFile(resolve('src/array-to-csv/csv.mustache'), "utf8")
    const output = generateOutput(template, data)
    const fileName = `outputs/${outputFileName || 'data'}.csv`
    await fs.writeFile(fileName, output)
    console.log(output)
}

const nonNested = {
    flatData: ['Hello', 'World', "Foo"]
}

const nested = {
    flatData: [
        ['Hello', 'World', "Foo"],
        ['Hello', 'World', "Foo"],
    ]
}

const withHeaders = {
    headers: ['Hello Title', 'World Title', 'Foo Title'],
    flatData: [
        ['Hello', 'World', "Foo"],
        ['Hello', 'World', "Foo"],
    ]
}

const withObjects = {
    headers: ['Hello Title', 'World Title', 'Foo Title'],
    objectData: [
        {
            firstName: "Tom",
            lastName: "Adams",
            gender: "Male",
            dob: "1997"
        },
        {
            firstName: "Philomena",
            lastName: "Cunk",
            gender: "Female",
            dob: "1975"
        }
    ],
    name: function () {
        return `${this.firstName} ${this.lastName}`
    },
    getAge: () => function (text, render) {
        const dob = render(text)
        return (new Date(Date.now() - (new Date(dob))).getFullYear() - 1970)
    }
}

generateOutputFromCsv(nonNested, 'nonNested')
generateOutputFromCsv(nested)
generateOutputFromCsv(withHeaders, 'withHeaders')
generateOutputFromCsv(withObjects, 'withObjects')