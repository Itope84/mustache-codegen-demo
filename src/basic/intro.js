/** In this file, we introduce Mustache.js and show how it works in the most basic form. Examples here are obtained from mustache.js documentation */
const Mustache = require('mustache')

const generateOutput = (template, data) => Mustache.render(template, data)

const template1 = `* {{name}}
{{!-- Missing fields will have no output }}
* {{age}}
{{!-- tags are escaped by default}}
* {{company}}
{{!-- unless you use 3 braces }}
* {{{company}}}
{{!-- or unescape them with an &}}
* {{&company}}
{{!-- If you want to show the braces like below, then you'll want to change the delimiters from braces to anything else. Here we use <% %>.}}
{{=<% %>=}}
* {{company}}
<%!-- And remember to change them back}}%>
<%={{ }}=%>`

const data1 = {
  "name": "Chris",
  "company": "<b>GitHub</b>"
}

console.log(generateOutput(template1, data1))


// Sections
// - maybe do the rest on the call. We want to do lists, objects in lists, functions, if-elses, function contexts