export const typeDefs = `#graphql

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
        person(id: ID!): Person
        posts: [Post]
        post(id: ID!): Post
    }
`
