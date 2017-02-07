import { ask } from './ask'
import $ from 'shelljs'

export default async () => {
  const name = await ask('project npm name?', {validator: v => v.indexOf(' ') === -1})
  const source = `${__dirname}/../files`
  const target = `${process.cwd()}/${name}`
  await $.cp('-R', `${source}/`, `${target}`)
  await $.mv(`${target}/_package.json`, `${target}/package.json`)

  const files = $.find(`${target}`)

  const replace = (old, _new) =>
    files.forEach(file => {
      if (!$.test('-d', file)) {
        $.sed('-i', old, _new, file)
      }
    })

  replace(/\$PROJECT_NAME/, name)
  replace(/\$CURRENT_YEAR/, new Date().getFullYear())
  replace(/\$USER_NAME/, 'Andrew J. Monks <a@monks.co>')

  console.log('💥')
}

