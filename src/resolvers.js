import db from './db.js';

export const resolvers = {
    Query : {
        people: () => db.people,
        posts: () => db.posts,
    },
};