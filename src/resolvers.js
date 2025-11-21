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
};