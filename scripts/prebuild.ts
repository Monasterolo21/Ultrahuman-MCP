import { createTools } from "@/tools";
import { validateSchemaDescriptions } from "@/utils/validateSchemaDescriptions";
import type { JSONSchema7 } from "json-schema";

const tools = createTools();
const errors: { tool: string, message: string }[] = [];

for (const tool of tools) {
    const errs = validateSchemaDescriptions(tool.inputSchema as JSONSchema7);
    if (errs.length > 0) {
        errors.push(...errs.map(err => ({ tool: tool.name, message: err })));
    }
}

if (errors.length > 0) {
    console.warn("WARNING: Tool input schema field without description detected. LLMs use tool descriptions to provide better tool suggestions and more consistent tool behavior. It is recommended to add descriptions to all tool input fields.");
    console.warn("This warning comes from the prebuild script. To disable it, remove the prebuild script from package.json.");
}
for (const error of errors) {
    console.warn(error);
}