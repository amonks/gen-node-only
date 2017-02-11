import { ask, replacer } from 'gen-util'
import cmd from 'shell-cmd'
import $ from 'shelljs'

export default async () => {
  const name = await ask('project npm name?')
  const repo = await ask('project repo? (arg to `git create`)')
  const author = await ask('your name?', {default: 'Andrew J. Monks <a@monks.co>'})

  await $.rm('-r .git')
  await $.rm('setup.js')

  const files = $.find(__dirname)

  const replace = replacer(files)

  await replace(/__CURRENT_YEAR/, new Date().getFullYear())
  await replace(/__PROJECT_NAME/, name)
  await replace(/__AUTHOR_NAME/, author)

  await cmd('git init')
  await cmd(`git create ${repo}`)
  await cmd

  console.log('💥')
}

