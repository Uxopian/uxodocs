import { visit } from 'unist-util-visit';

/**
 * Remark plugin that replaces {{variable}} placeholders in markdown content.
 *
 * Why two separate visit passes:
 *
 * When the MDX parser encounters {{varname}} in regular text (outside of code
 * blocks), it treats the outer {} as a JSX expression and converts it to an
 * `mdxTextExpression` AST node with value "{varname}" — before any remark
 * plugin can see it as a text node. That's why the first pass targets
 * mdxTextExpression / mdxFlowExpression nodes and replaces them with plain
 * text nodes containing the resolved value.
 *
 * Inside code blocks and link URLs the MDX parser does NOT evaluate
 * expressions, so {{varname}} remains as a literal string. The second pass
 * handles those via node.value / node.meta / node.url.
 *
 * @param {{ variables: Record<string, string> }} options
 */
export default function remarkVariables(options) {
    const variables = options?.variables ?? {};
    const pattern = /\{\{(\w+)\}\}/g;

    function replace(str) {
        return str.replace(pattern, (match, key) => variables[key] ?? match);
    }

    return (tree) => {
        // Pass 1 — MDX expression nodes produced by {{varname}} in plain text/tables
        visit(tree, ['mdxTextExpression', 'mdxFlowExpression'], (node, index, parent) => {
            if (!parent || index === undefined) return;
            const match = node.value.match(/^\{(\w+)\}$/);
            if (match && match[1] in variables) {
                parent.children[index] = { type: 'text', value: variables[match[1]] };
            }
        });

        // Pass 2 — literal strings inside code blocks, inline code, code titles, link/image URLs
        visit(tree, (node) => {
            if (
                typeof node.value === 'string' &&
                node.type !== 'mdxTextExpression' &&
                node.type !== 'mdxFlowExpression'
            ) {
                node.value = replace(node.value);
            }
            if (typeof node.meta === 'string') {
                node.meta = replace(node.meta);
            }
            if (typeof node.url === 'string') {
                node.url = replace(node.url);
            }
        });
    };
}