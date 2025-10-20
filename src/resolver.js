import { parse } from 'graphql';
import db from './db.js';

export const resolvers = {
    Query: {
        people: () => db.people,
        posts: () => db.posts,
        post: (_ , args) => db.posts.find(post => post.id === args.id),
    },
    Post: {
        author: (parent) => {
            return db.people.find(person => person.id === parent.authorId);
        }
    },
    Person: {
        posts: (parent) => {
            return db.posts.filter(post => post.authorId === parent.id);
        }
    },
    Mutation: {
        addPerson: (_, args) => {
            const newPerson = {...args.person, id: (parseInt(db.people[db.people.length - 1].id) + 1).toString()};
            db.people.push(newPerson);
            return newPerson;
        },
        updatePerson: (_, args) => {
            const personIndex = db.people.findIndex(person => person.id === args.id);
            if (personIndex === -1) throw new Error("Person not found");
            db.people[personIndex] = { ...db.people[personIndex], ...args.person };
            return db.people[personIndex];
        },
        deletePerson: (_, args) => {
            const personIndex = db.people.findIndex(person => person.id === args.id);
            if (personIndex === -1) throw new Error("Person not found");
            const deletedPerson = db.people.splice(personIndex, 1)[0];
            return deletedPerson;
        },
    }

};

