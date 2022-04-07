module.exports = function (eleventyConfig) {
  // Disable automatic use of your .gitignore
  eleventyConfig.setUseGitIgnore(false)

  // Merge data instead of overriding
  eleventyConfig.setDataDeepMerge(true)

  eleventyConfig.addFilter('linebreaks', (text) => {
    return text.replace(/\\n/g, '<br />')
  })

  eleventyConfig.addFilter('full_name', (actor) => {
    return `${actor.first_name} ${actor.last_name}`
  })

  // Copy Static Files to /_Site
  eleventyConfig.addPassthroughCopy({
    './src/admin/config.yml': './admin/config.yml',
  })

  // Copy static assets to /_site
  eleventyConfig.addPassthroughCopy('./src/static/img')
  eleventyConfig.addPassthroughCopy('./src/static/media')
  eleventyConfig.addPassthroughCopy('./src/static/fonts')
  eleventyConfig.addPassthroughCopy('./src/favicon.ico')

  // Let Eleventy transform HTML files as nunjucks
  // So that we can use .html instead of .njk
  return {
    dir: {
      input: 'src',
    },
    htmlTemplateEngine: 'njk',
    // Using markdown causes some html to be rendered into code blocks
    markdownTemplateEngine: false,
  }
}
