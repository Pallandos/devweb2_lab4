import db from './db.js';

export const resolvers = {
    Query : {
        people: () => db.people,
        person: (_, args) => db.people.find(person => person.id === args.id),
        posts: () => db.posts,
        post(_, args) {
            return db.posts.find(post => post.id === args.id);
        }
    },

    Post : {
        author: (parent) => {
            return db.people.find(person => person.id === parent.author_id);
        }
    },

    Person : {
        posts: (parent) => {
            return db.posts.filter(post => post.author_id === parent.id);
        }
    }
};