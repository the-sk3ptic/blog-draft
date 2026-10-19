import { defineMarkdocConfig, component } from '@astrojs/markdoc/config';

export default defineMarkdocConfig({
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
