export const typeDefs = `#graphql

    type Person {
        id: ID!
        name: String!
        age: Int!
    }

    type Post {
        id: ID!
        title: String!
    }

    type Query {
        people: [Person]
        person(id: ID!): Person
        posts: [Post]
        post(id: ID!): Post
    }
`
