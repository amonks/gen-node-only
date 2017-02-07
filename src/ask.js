import inquirer from 'inquirer'

const makeQuestion = (text, opts) => ({
  type: 'input',
  name: 'result',
  message: text,
  validate: opts ? opts.validator : undefined,
  'default': opts ? opts['default'] : undefined
})

const askQuestion = async (question) => {
  const {result} = await inquirer.prompt([question])
  return result
}

export const ask = async (text, opts) => {
  const question = makeQuestion(text, opts)
  const answer = await askQuestion(question)
  return answer
}

