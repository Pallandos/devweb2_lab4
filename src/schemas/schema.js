export const typeDefs = `#graphql
    # Comments in GraphQL are defined with the hash (#) symbol.

    type Person {
        id: ID!
        name: String!
        age: Int!
        posts: [Post!]!
    }
    
    type Post {
        id: ID!
        title: String!
        author: Person!
    }
    
    type Query {
        people: [Person]
        posts: [Post]
        post(id: ID!): Post
    }
    
    type Mutation {
        addPerson(name: String!, age: Int!): Person
        updatePerson(id: ID!, name: String, age: Int): ID!
        deletePerson(id: ID!): Person
    }
    
    type Subscription {
        personAdded: Person
    }
`