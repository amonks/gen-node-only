const { ask, replacer, tag: getOrigin } = require('gen-util')
const $ = require('shelljs')

const main = async () => {
  console.log('cwd')
  await $.cd(`${__dirname}/..`)

  const withHub = !!$.which('hub')

  console.log('config')
  const origin = await getOrigin()
  const name = await ask('project npm name?')
  const repo = withHub ? await ask('project repo? (arg to `hub create`)') : {}
  const author = await ask('your name?', {default: 'Andrew J. Monks <a@monks.co>'})
  const currentYear = new Date().getFullYear()
  const config = {name, repo, author, origin, currentYear}

  console.log('write log')
  $.ShellString(JSON.stringify(config, undefined, 2))
    .to(`__gen__.json`)

  console.log('remove git')
  await $.rm('-rf', '.git')

  console.log('do repalcements')
  const files = $.find(__dirname)
  const replace = replacer(files)
  await replace(/__CURRENT_YEAR/, currentYear)
  await replace(/__PROJECT_NAME/, name)
  await replace(/__AUTHOR_NAME/, author)

  console.log('make new git')
  await $.exec('git init')
  $.which('hub') && await $.exec(`hub create ${repo}`)
  await $.exec("git commit -am 'Initial commit'")

  console.log('💥')
}

main()

