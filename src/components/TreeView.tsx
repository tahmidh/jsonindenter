import React, { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { useEditorStore } from '../store/editorStore';

export interface TreeNode {
    key: string;
    type: 'string' | 'number' | 'boolean' | 'null' | 'array' | 'object';
    value: unknown;
    children?: TreeNode[];
}

interface TreeNodeProps {
    node: TreeNode;
    level?: number;
}

/**
 * Interactive tree node component with brand colors
 */
const TreeNodeComponent: React.FC<TreeNodeProps> = ({ node, level = 0 }) => {
    const [expanded, setExpanded] = useState(node.type === 'object' || node.type === 'array' ? false : true);

    const hasChildren = node.children && node.children.length > 0;

    const getTypeColor = (type: TreeNode['type']): string => {
        const colors: Record<TreeNode['type'], string> = {
            string: 'text-brand-electric', // brand-electric for string values
            number: 'text-brand-success',
            boolean: 'text-brand-success',
            null: 'text-brand-error',
            array: 'text-brand-violet', // brand-violet for container types
            object: 'text-brand-violet',
        };
        return colors[type];
    };

    const formatValue = (type: TreeNode['type'], value: unknown): string => {
        switch (type) {
            case 'string':
                return `"${value}"`;
            case 'number':
            case 'boolean':
                return String(value);
            case 'null':
                return 'null';
            case 'array':
                return `[${(value as unknown[]).length} items]`;
            case 'object':
                return '{...}';
            default:
                return String(value);
        }
    };

    return (
        <div className="font-mono text-sm">
            <div
                className="py-1 px-2 hover:bg-slate-700 rounded transition-colors cursor-pointer flex items-center gap-1"
                style={{ marginLeft: `${level * 16}px` }}
            >
                {hasChildren && (
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="p-0 hover:bg-slate-700 rounded flex items-center justify-center w-5 h-5"
                    >
                        {expanded ? (
                            <ChevronDown size={16} style={{ color: '#7C3AED' }} />
                        ) : (
                            <ChevronRight size={16} style={{ color: '#7C3AED' }} />
                        )}
                    </button>
                )}
                {!hasChildren && <div className="w-5" />}

                <span style={{ color: '#7C3AED' }} className="font-semibold">{node.key}:</span>
                <span className={`${getTypeColor(node.type)} font-semibold`}>
                    {formatValue(node.type, node.value)}
                </span>
            </div>

            {expanded && hasChildren && (
                <div>
                    {node.children?.map((child, index) => (
                        <TreeNodeComponent key={index} node={child} level={level + 1} />
                    ))}
                </div>
            )}
        </div>
    );
};

/**
 * Tree view component for JSON visualization with brand colors
 */
export const TreeView: React.FC = () => {
    const { inputJson, error } = useEditorStore();
    const [tree, setTree] = React.useState<TreeNode | null>(null);

    // Parse JSON and build tree
    React.useEffect(() => {
        try {
            const parsed = JSON.parse(inputJson);
            const buildTree = (obj: any, key: string = 'root'): TreeNode => {
                if (obj === null) {
                    return { key, type: 'null', value: null };
                }

                const type = Array.isArray(obj) ? 'array' : typeof obj;

                if (type === 'object' || type === 'array') {
                    const children = Object.entries(obj).map(([k, v]: [string, any]) =>
                        buildTree(v, k)
                    );
                    return {
                        key,
                        type: type as 'object' | 'array',
                        value: type === 'array' ? obj : obj,
                        children,
                    };
                }

                return {
                    key,
                    type: type as 'string' | 'number' | 'boolean',
                    value: obj,
                };
            };

            setTree(buildTree(parsed));
        } catch {
            setTree(null);
        }
    }, [inputJson]);

    if (error) {
        return (
            <div className="p-4 rounded-lg text-brand-error overflow-auto h-full" style={{ backgroundColor: 'rgba(239, 68, 68, 0.2)', borderColor: '#EF4444', borderWidth: '1px' }}>
                <p className="font-semibold">Error:</p>
                <p className="text-sm">{error}</p>
            </div>
        );
    }

    if (!tree) {
        return (
            <div className="flex items-center justify-center h-full text-slate-500">
                <p className="font-mono">No valid JSON to display</p>
            </div>
        );
    }

    return (
        <div className="overflow-auto h-full p-4">
            <TreeNodeComponent node={tree} />
        </div>
    );
};
