import type { JSONSchema7 } from "json-schema";

/**
 * Recursively checks whether every schema (and subschema) has a `description`.
 * 
 * @param schema A JSONSchema7-compliant object
 * @param path   The current path used for error reporting (for internal recursion)
 * @returns      An array of error messages indicating which fields are missing a description
 */
export function validateSchemaDescriptions(
  schema: JSONSchema7,
  path = "root"
): string[] {
  const errors: string[] = [];

  // Check if the current schema has a description (skip root)
  if (path !== "root" && !schema.description) {
    errors.push(`Missing description at: ${path}`);
  }

  // 1. Check properties for object types
  if (schema.type === "object" && schema.properties) {
    for (const [propertyName, propertySchema] of Object.entries(schema.properties)) {
      const propertyPath = `${path}.properties.${propertyName}`;
      errors.push(
        ...validateSchemaDescriptions(propertySchema as JSONSchema7, propertyPath)
      );
    }
  }

  // 2. Check items for array types
  if (schema.type === "array" && schema.items) {
    // items could be a single schema or an array of schemas
    if (Array.isArray(schema.items)) {
      schema.items.forEach((itemSchema, index) => {
        const itemPath = `${path}.items[${index}]`;
        errors.push(
          ...validateSchemaDescriptions(itemSchema as JSONSchema7, itemPath)
        );
      });
    } else {
      const itemPath = `${path}.items`;
      errors.push(
        ...validateSchemaDescriptions(schema.items as JSONSchema7, itemPath)
      );
    }
  }

  // 3. Check allOf, anyOf, oneOf
  if (schema.allOf) {
    schema.allOf.forEach((subSchema, index) => {
      const subPath = `${path}.allOf[${index}]`;
      errors.push(
        ...validateSchemaDescriptions(subSchema as JSONSchema7, subPath)
      );
    });
  }

  if (schema.anyOf) {
    schema.anyOf.forEach((subSchema, index) => {
      const subPath = `${path}.anyOf[${index}]`;
      errors.push(
        ...validateSchemaDescriptions(subSchema as JSONSchema7, subPath)
      );
    });
  }

  if (schema.oneOf) {
    schema.oneOf.forEach((subSchema, index) => {
      const subPath = `${path}.oneOf[${index}]`;
      errors.push(
        ...validateSchemaDescriptions(subSchema as JSONSchema7, subPath)
      );
    });
  }

  // 4. Check definitions/$defs (older vs. newer keyword usage)
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  if ((schema as any).definitions) {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    for (const [defName, defSchema] of Object.entries((schema as any).definitions)) {
      const defPath = `${path}.definitions.${defName}`;
      errors.push(
        ...validateSchemaDescriptions(defSchema as JSONSchema7, defPath)
      );
    }
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  if ((schema as any).$defs) {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    for (const [defName, defSchema] of Object.entries((schema as any).$defs)) {
      const defPath = `${path}.$defs.${defName}`;
      errors.push(
        ...validateSchemaDescriptions(defSchema as JSONSchema7, defPath)
      );
    }
  }

  // 5. Check if/then/else
  if (schema.if) {
    errors.push(
      ...validateSchemaDescriptions(schema.if as JSONSchema7, `${path}.if`)
    );
  }

  if (schema.then) {
    errors.push(
      ...validateSchemaDescriptions(schema.then as JSONSchema7, `${path}.then`)
    );
  }

  if (schema.else) {
    errors.push(
      ...validateSchemaDescriptions(schema.else as JSONSchema7, `${path}.else`)
    );
  }

  // 6. Return the collected error messages
  return errors;
}


// [
//   'Missing description at: root.properties.name',
//   'Missing description at: root.properties.address.properties.zip'
// ]
