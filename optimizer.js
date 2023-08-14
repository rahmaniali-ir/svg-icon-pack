import { optimize } from "svgo"

export function optimizeSvg(svg) {
  const result = optimize(svg, {
    plugins: [
      {
        name: "preset-default",
        params: {
          overrides: {
            // customize default plugin options
            inlineStyles: {
              onlyMatchedOnce: false,
            },
            removeUnused: true,
            removeEmpty: true,

            // or disable plugins
            removeDoctype: true,
          },
        },
      },
      "removeDimensions",
      "removeViewBox",
      "removeComments",
      "removeTitle",
      "removeUselessDefs",
    ],
  })

  return result.data
}
