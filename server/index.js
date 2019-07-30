const fs = require('fs');
const cors = require('cors');
const path = require('path');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const LEVELS_PATH = 'levels.json';
const ENC = 'utf8';
 
const app = express();
app.use(cors());

const schema = buildSchema(`
  input LevelInput {
    id: ID
    title: String!
    colors: [String!]!
    solution: [[Int!]!]!
  }

  type Level {
    title: String
    colors: [String]
    solution: [[Int]]
  }

  type Query {
    levels: [Level]
  }

  type Mutation {
    addLevel(level: LevelInput!): [Level]
    updateLevel(level: LevelInput!): [Level]
  }
`);

const rootValue = {
  levels: () => Object.values(
    JSON.parse(fs.readFileSync('levels.json', ENC))
  ),
  addLevel: (data) => {
    const { level } = data;
    console.log(`Level: ${level}`);
    const levels = Object.values(JSON.parse(fs.readFileSync(LEVELS_PATH, ENC)));
    console.log(`Levels Before: ${levels}`);
    levels.push(level);
    console.log(`Levels After: ${levels}`);
    fs.writeFileSync(LEVELS_PATH, JSON.stringify(levels), ENC);

    return levels;
  },
}
 
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue,
    graphiql: true,
  }),
);
 
app.listen(4040);