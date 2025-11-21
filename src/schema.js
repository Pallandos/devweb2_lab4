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

    type Mutation {
        addPerson(name: String!, age: Int!): Person!
        addPost(title: String!, author_id: ID!): Post!
        
        updatePerson(id: ID!, modfiedPerson: PersonInput!): Person!
        updatePost(id: ID!, modfiedPost: PostInput!): Post!

        deletePerson(id: ID!): [Person]
        deletePost(id: ID!): [Post]
    }

    input PersonInput {
        name: String
        age: Int
    }
    input PostInput {
        title: String
        author_id: ID
    }

    type Subscription {
        personAdded: Person!
    }
`
