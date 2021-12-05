const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Breed {
        primary: String
        secondary: String
        mixed: Boolean
        unknown: Boolean
    }
    
    type Photo {
        small: String
        medium: String
        large: String
        full: String
    }

    type Dog {
        _id: ID
        name: String
        breed: Breed
        age: String
        size: String
        photo: [Photo]
        url: String
        location: String
        description: String
        spayed: Boolean
        house_trained: Boolean
        shots: Boolean
        organization: String
    }

    type User {
        _id: ID
        username: String
        email: String
        password: String
        pets: [Dog] 
    }
    
    type Auth {
        token: ID
        user: User
    }

    type Settings {
      _id: ID
      user: User
      age: String
      size: String
      spayed: Boolean
      house_trained: Boolean
  }
    
    type Query {
        user(_id: ID!): User
        me: User
        ageSizeHouseTrained(age: String, size: String, house_trained: Boolean): [Dog]
        ageHouseTrained(age: String, house_trained: Boolean): [Dog]
        ageSize(age: String, size: String): [Dog]
        sizeHouseTrained(size: String, house_trained: Boolean): [Dog]
        size(size: String): [Dog]
        houseTrained(house_trained: Boolean): [Dog]
        age(age: String): [Dog]
        dogs: [Dog]
        settings(user: ID!): Settings
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        addSettings(user: ID!, age: String, size: String, house_trained: Boolean): Settings
        updateUserPets(_id: ID!, dog: ID!): User
        updateSettings(user: ID!, age: String, size: String, house_trained: Boolean): Settings
        login(email: String!, password: String!): Auth
        removeUser(_id: ID!): User
      }
    `;

module.exports = typeDefs;