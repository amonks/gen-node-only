const { ask, replacer, tag: getOrigin } = require('gen-util')
const $ = require('shelljs')

const main = async () => {
  // cwd
  await $.cd(`${__dirname}/..`)

  // config
  const origin = await getOrigin()
  const name = await ask('project npm name?')
  const repo = await ask('project repo? (arg to `git create`)')
  const author = await ask('your name?', {default: 'Andrew J. Monks <a@monks.co>'})
  const currentYear = new Date().getFullYear()
  const config = {name, repo, author, origin, currentYear}

  // write log
  $.ShellString(JSON.stringify(config, undefined, 2))
    .to(`__gen__.json`)

  // remove git
  await $.rm('-rf .git')

  // do replacements
  const files = $.find(__dirname)
  const replace = replacer(files)
  await replace(/__CURRENT_YEAR/, currentYear)
  await replace(/__PROJECT_NAME/, name)
  await replace(/__AUTHOR_NAME/, author)

  // make new git
  await $.exec('git init')
  await $.exec(`git create ${repo}`)
  await $.exec('git add .')
  await $.exec("rit commit -am 'Initial commit'")

  // all done
  console.log('💥')
}

main()

