import db from './db.js';

export const resolvers = {
    Query : {
        people: () => db.people,
        posts: () => db.posts,
        post(_, args) {
            return db.posts.find(post => post.id === args.id);
        }
    },
};