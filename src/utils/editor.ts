/**
 * Editor utility functions
 */
import { dump } from 'js-yaml';
import { stringify } from 'smol-toml';

export const getLineCount = (text: string): number => {
    return text.split('\n').length;
};

export const formatJSON = (json: string, indentType: 'spaces2' | 'spaces3' | 'spaces4' | 'tabs'): { formatted: string; error?: string; line?: number } => {
    if (!json.trim()) {
        return { formatted: '' };
    }
    try {
        const parsed = JSON.parse(json);
        const indent = indentType === 'tabs' ? '\t' : indentType === 'spaces2' ? '  ' : indentType === 'spaces3' ? '   ' : '    ';
        return { formatted: JSON.stringify(parsed, null, indent) };
    } catch {
        const validation = validateJSON(json);
        return { formatted: '', error: validation.error, line: validation.line };
    }
};

export const getIndentConfig = (indentType: 'spaces2' | 'spaces3' | 'spaces4' | 'tabs'): { tabSize: number; insertSpaces: boolean } => {
    if (indentType === 'tabs') {
        return { tabSize: 1, insertSpaces: false };
    }
    if (indentType === 'spaces2') {
        return { tabSize: 2, insertSpaces: true };
    }
    if (indentType === 'spaces3') {
        return { tabSize: 3, insertSpaces: true };
    }
    return { tabSize: 4, insertSpaces: true };
};

export const validateJSON = (content: string): { valid: boolean; error?: string; line?: number } => {
    if (!content.trim()) return { valid: true };
    try {
        JSON.parse(content);
        return { valid: true };
    } catch (err) {
        let line: number | undefined;
        let errorMessage = 'Invalid JSON';

        if (err instanceof Error) {
            errorMessage = err.message;
            // Extract line number from message (e.g., "Unexpected token 'a', ... at line 1 column 5")
            const match = errorMessage.match(/at line (\d+)/i) || errorMessage.match(/position (\d+)/i);
            if (match) {
                if (errorMessage.includes('position')) {
                    // Convert position to line number
                    const pos = parseInt(match[1], 10);
                    line = content.substring(0, pos).split('\n').length;
                } else {
                    line = parseInt(match[1], 10);
                }
            }
        }
        return { valid: false, error: errorMessage, line };
    }
};

export const jsonToCsv = (json: string): string => {
    try {
        const parsed = JSON.parse(json);
        const array = Array.isArray(parsed) ? parsed : [parsed];
        if (array.length === 0) return '';

        const headers = Object.keys(array[0]);
        const csvRows = [
            headers.join(','),
            ...array.map(row =>
                headers.map(fieldName => {
                    const value = row[fieldName] ?? '';
                    const escaped = ('' + value).replace(/"/g, '""');
                    return `"${escaped}"`;
                }).join(',')
            )
        ];
        return csvRows.join('\n');
    } catch {
        return '';
    }
};

export const jsonToXml = (json: string): string => {
    try {
        const parsed = JSON.parse(json);
        const toXml = (obj: any, rootName = 'root'): string => {
            let xml = '';
            if (Array.isArray(obj)) {
                obj.forEach(item => {
                    xml += `<item>${toXml(item, '')}</item>`;
                });
            } else if (typeof obj === 'object' && obj !== null) {
                for (const key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) {
                        xml += `<${key}>${toXml(obj[key], '')}</${key}>`;
                    }
                }
            } else {
                xml += obj?.toString() || '';
            }
            return rootName ? `<?xml version="1.0" encoding="UTF-8"?>\n<${rootName}>\n${xml}\n</${rootName}>` : xml;
        };
        return toXml(parsed);
    } catch {
        return '';
    }
};

export const jsonToSchema = (json: string): string => {
    try {
        const parsed = JSON.parse(json);

        const getType = (value: any): string => {
            if (value === null) return 'null';
            if (Array.isArray(value)) return 'array';
            return typeof value;
        };

        const generateSchema = (data: any): any => {
            const type = getType(data);
            const schema: any = { type };

            if (type === 'object' && data !== null) {
                schema.properties = {};
                const keys = Object.keys(data);
                if (keys.length > 0) {
                    schema.required = keys;
                }
                keys.forEach(key => {
                    schema.properties[key] = generateSchema(data[key]);
                });
            } else if (type === 'array') {
                if (data.length > 0) {
                    // Simple inference: Use the schema of the first item
                    schema.items = generateSchema(data[0]);
                } else {
                    schema.items = {}; // Unknown items for empty array
                }
            }

            return schema;
        };

        const schema = {
            $schema: "http://json-schema.org/draft-07/schema#",
            ...generateSchema(parsed)
        };

        return JSON.stringify(schema, null, 2);
    } catch {
        return '';
    }
};

export const jsonToYaml = (json: string): string => {
    try {
        const parsed = JSON.parse(json);
        return dump(parsed, { indent: 2 });
    } catch {
        return '';
    }
};

export const jsonToToml = (json: string): string => {
    try {
        const parsed = JSON.parse(json);
        return stringify(parsed);
    } catch {
        return '';
    }
};

export const jsonToTypeScript = (json: string, interfaceName: string = 'Root'): string => {
    try {
        const parsed = JSON.parse(json);

        const generateInterface = (obj: any, name: string, depth: number = 0): string => {
            const indent = '    '.repeat(depth);
            const nextIndent = '    '.repeat(depth + 1);
            let result = `${indent}interface ${name} {\n`;

            const keys = Object.keys(obj);
            keys.forEach((key) => {
                const value = obj[key];

                if (value === null || value === undefined) {
                    result += `${nextIndent}${key}?: any;\n`;
                } else if (typeof value === 'string') {
                    result += `${nextIndent}${key}: string;\n`;
                } else if (typeof value === 'number') {
                    result += `${nextIndent}${key}: number;\n`;
                } else if (typeof value === 'boolean') {
                    result += `${nextIndent}${key}: boolean;\n`;
                } else if (Array.isArray(value)) {
                    if (value.length === 0) {
                        result += `${nextIndent}${key}: any[];\n`;
                    } else {
                        const firstItem = value[0];
                        if (typeof firstItem === 'object' && firstItem !== null && !Array.isArray(firstItem)) {
                            const itemName = key.charAt(0).toUpperCase() + key.slice(1) + 'Item';
                            result += `${nextIndent}${key}: ${itemName}[];\n`;
                            result += generateInterface(firstItem, itemName, depth + 1);
                        } else {
                            const itemType = typeof firstItem === 'string' ? 'string' : typeof firstItem === 'number' ? 'number' : typeof firstItem === 'boolean' ? 'boolean' : 'any';
                            result += `${nextIndent}${key}: ${itemType}[];\n`;
                        }
                    }
                } else if (typeof value === 'object') {
                    const nestedName = key.charAt(0).toUpperCase() + key.slice(1);
                    result += `${nextIndent}${key}: ${nestedName};\n`;
                    result += generateInterface(value, nestedName, depth + 1);
                } else {
                    result += `${nextIndent}${key}: any;\n`;
                }
            });

            result += `${indent}}\n`;
            return result;
        };

        return generateInterface(parsed, interfaceName, 0);
    } catch {
        return '';
    }
};
