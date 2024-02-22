import {
  defineConfig,
  presetIcons,
  presetUno,
  presetAttributify,
  presetTypography,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons(),
    presetAttributify(),
    presetTypography(),
    presetWebFonts({
      fonts: {
        provider: 'fontshare',
        sans: ['Satoshi', 'sans-serif'],
        mono: ['Azeret Mono', 'monospace'],
      },
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  theme: {
    container: {
      center: 'true',
      padding: '1rem',
    },
  },
});
