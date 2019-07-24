const fs = require('fs');
const path = require('path');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const LEVELS_PATH = 'levels.json';
const ENC = 'utf8';
 
const app = express();

const schema = buildSchema(`
  type Layer {
    color: String
    solution: [[Int]]
    board: [[Int]]
  }

  input LayerInput {
    color: String!
    solution: [[Int!]!]!
    board: [[Int!]!]!
  }

  input LevelInput {
    id: ID
    title: String!
    layers: [LayerInput!]!
  }

  type Level {
    title: String
    layers: [Layer]
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
  addLevel: (level) => {
    const levels = [
      ...Object.values(JSON.parse(fs.readFileSync(LEVELS_PATH, ENC))),
      level
    ];
    fs.writeFileSync(LEVELS_PATH, levels, ENC);
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