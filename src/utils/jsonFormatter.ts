/**
 * Utility functions for JSON formatting and validation
 */

/**
 * Get the appropriate indent string based on type and size
 */
export const getIndentString = (type: 'spaces2' | 'spaces3' | 'spaces4' | 'tabs'): string => {
    switch (type) {
        case 'spaces2':
            return '  ';
        case 'spaces3':
            return '   ';
        case 'spaces4':
            return '    ';
        case 'tabs':
            return '\t';
    }
};

/**
 * Format JSON with proper indentation
 */
export const formatJson = (
    jsonString: string,
    indentType: 'spaces2' | 'spaces3' | 'spaces4' | 'tabs'
): { formatted: string; error: string | null } => {
    try {
        const parsed = JSON.parse(jsonString);
        const indentCount = indentType === 'tabs' ? 1 : indentType === 'spaces2' ? 2 : indentType === 'spaces3' ? 3 : 4;
        const formatted = JSON.stringify(parsed, null, indentCount);
        return { formatted, error: null };
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Invalid JSON';
        // Extract line number from error message if available
        return {
            formatted: jsonString,
            error: `JSON Error: ${errorMessage}`,
        };
    }
};

/**
 * Minify JSON (remove all whitespace)
 */
export const minifyJson = (jsonString: string): { minified: string; error: string | null } => {
    try {
        const parsed = JSON.parse(jsonString);
        const minified = JSON.stringify(parsed);
        return { minified, error: null };
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Invalid JSON';
        return {
            minified: jsonString,
            error: `JSON Error: ${errorMessage}`,
        };
    }
};

/**
 * Validate JSON and return detailed error info
 */
export const validateJson = (jsonString: string): { valid: boolean; error: string | null } => {
    try {
        JSON.parse(jsonString);
        return { valid: true, error: null };
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Invalid JSON';
        return {
            valid: false,
            error: `Validation Error: ${errorMessage}`,
        };
    }
};

/**
 * Convert JSON to a tree structure for visualization
 */
export interface TreeNode {
    key: string;
    value: unknown;
    type: 'string' | 'number' | 'boolean' | 'null' | 'array' | 'object';
    children?: TreeNode[];
    expanded?: boolean;
}

export const jsonToTree = (jsonString: string): { tree: TreeNode | null; error: string | null } => {
    try {
        const parsed = JSON.parse(jsonString);
        const tree = valueToTreeNode('root', parsed);
        return { tree, error: null };
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Invalid JSON';
        return { tree: null, error: `Tree Error: ${errorMessage}` };
    }
};

/**
 * Convert a JSON value to a tree node
 */
const valueToTreeNode = (key: string, value: unknown): TreeNode => {
    if (value === null) {
        return { key, value, type: 'null' };
    }

    if (Array.isArray(value)) {
        return {
            key,
            value,
            type: 'array',
            children: value.map((item, index) => valueToTreeNode(`[${index}]`, item)),
            expanded: false,
        };
    }

    if (typeof value === 'object') {
        return {
            key,
            value,
            type: 'object',
            children: Object.entries(value).map(([k, v]) => valueToTreeNode(k, v)),
            expanded: false,
        };
    }

    const typeMap: Record<string, 'string' | 'number' | 'boolean'> = {
        string: 'string',
        number: 'number',
        boolean: 'boolean',
    };

    return {
        key,
        value,
        type: typeMap[typeof value] || 'string',
    };
};
