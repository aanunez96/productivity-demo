const {gql} = require('apollo-server');

const typeDefs = gql`
  
  type Query {
    tasks(userId: ID, classification: Category, isDelete: Boolean): [Task]
    task(adId: ID!): Task
    user(userId: ID): User
  }
    
  type Task{
    _id: ID!
    description: String
    tittle: String!
    owner: User!
    classification: Category!
    isDelete: Boolean!
    date:  String!
    duration: Int!
  }
  
  enum Category{
    short
    medium
    long
    customized
  }
  
  type Profile{
     name: String
     lastName: String
  }
  
  extend type User {
  _id: ID
  profile: Profile
  }
  
  extend input CreateUserInput {
      profile: CreateUserProfileInput
  }
  
  input CreateUserProfileInput {
     name: String
     lastName: String
  }
  
  type Mutation{
    createTask(tittle: String!, owner: ID!, description: String, classification: Category!, duration: Int): Task!
    
    modifyTask(tittle: String, taskId: ID!, description: String, classification: Category, duration: Int, isDelete: Boolean): Task!
    
    modifyUser(userId: ID!, lastName: String, name: String): User  
  } 
`;
module.exports = typeDefs;
