import { defineMarkdocConfig, component, nodes } from '@astrojs/markdoc/config';

export default defineMarkdocConfig({
  nodes: {
    fence: {
      render: component('./src/components/CodeBlock.astro'),
      attributes: {
        ...nodes.fence.attributes,
        content: {
          type: String,
          render: 'content',
          required: true,
        },
        language: {
          type: String,
          render: 'language',
        },
        title: {
          type: String,
          render: 'title',
        },
      },
    },
  },
  tags: {
    callout: {
      render: component('./src/components/markdoc/Callout.astro'),
      attributes: {
        type: {
          type: String,
          default: 'note',
          matches: ['note', 'tip', 'warning', 'danger'],
        },
        title: {
          type: String,
        },
      },
    },
  },
});
