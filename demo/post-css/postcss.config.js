const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      postcss: {
        postcssOptions: {

          plugins: [
            [
              'postcss-pixel-to-remvw',
              {
                baseSize: {
                  rem: 80, // 10rem = 750px
                },
                unitPrecision: 5,
                selectorBlackList: [],
                propList: ['*'],
                minPixelValue: 0,
                exclude: null,
                // Single rule does not convert
                keepRuleComment: 'no',
                // The entire file is not converted
                commentOfDisableAll: 'disable-convert',
                // The entire file is not converted to rem
                commentOfDisableRem: 'disable-convert-rem',
                // nThe entire file is not converted to vw
                commentOfDisableVW: 'disable-convert-vw',
              },
            ],
          ],
        }
      }
    }
  },
})
