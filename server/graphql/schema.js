const {gql} = require('apollo-server');

const typeDefs = gql`
  scalar Date
  
  type Query {
    tasks(userId: ID, classification: Category, isDelete: Boolean): [Task]
    task(taskId: ID!): Task
    productivity: [DayProductivity]
    user(userId: ID): User   
  }
    
  type Task{
    _id: ID!
    title: String!
    owner: User!
    classification: Category!
    description: String  
    status: Status!
    isDelete: Boolean!
    creationDate:  Date!
    realizationDate:  Date!
    progress:  Int!
    duration: Int!
    doneIn: Int!
  }
  
  type DayProductivity{
    doneTask: Int!
    day: Date!
  } 
  
  enum Category{
    short
    medium
    long
    customized
  }
  enum Status{
    pending
    done
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
    createTask(title: String!, owner: ID!, description: String, classification: Category!, duration: Int): Task!
    
    modifyTask(title: String, taskId: ID!, description: String, classification: Category, duration: Int, isDelete: Boolean): Task!

    randomDoneTask(owner: ID!):[Task!]
        
    modifyUser(userId: ID!, lastName: String, name: String): User  
  } 
`;
module.exports = typeDefs;
