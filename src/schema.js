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
        posts: [Post]
    }
`
