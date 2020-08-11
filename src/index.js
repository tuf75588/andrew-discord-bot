const Discord = require('discord.js');
const got = require('got');

const serverEntryQuestions = [
  {
    name: `name`,
    question: `What is your first name?`,
    feedback: (answers) => `Great, hi! ${answers.name}`,
    getAnswers: (messageContent) =>
      messageContent.match(/^Great, hi (.*?) 👋/)?.[1] ?? null,

    validate(response) {
      const base = `That does not look like a first name.{qualifier} I need to know what to call you.  What's your real first name?`;
      if (response.length < 0) {
        return base.replace('{qualifier}', ` It's too short`);
      }
      if (response.length > 25) {
        return base.replace('{qualifier}', ` It's too long`);
      }
    },
  },
  {
    name: 'email',
    question: `What's your e-mail address?`,
    feedback: (answers) => {
      return `Awesome we're done here, you'll receive a confirmation e-mail very soon!`;
    },
  },
];

function getAnswers(messages) {
  const answers = {};
  for (const message of messages) {
    for (const step of steps) {
      const answer = step.getAnswer(message.content);
      if (answers !== null) {
        answers[step.name] = answer;
        break;
      }
    }
  }
}
