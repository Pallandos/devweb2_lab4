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
    },

    Mutation : {
        addPerson: (_, args) => {
            const newPerson = {
                id: String(db.people.length + 1),
                name: args.name,
                age: args.age
            };
            db.people.push(newPerson);
            return newPerson;
        },
        updatePerson: (_, args) => {
            // 1. Trouver l'index de la personne
            const index = db.people.findIndex(p => p.id === args.id);

            // 2. Si la personne n'existe pas, on peut retourner null (ou gérer une erreur)
            if (index === -1) return null;

            // 3. Mettre à jour l'objet dans le tableau existant
            // On fusionne les anciennes données avec les nouvelles
            db.people[index] = {
                ...db.people[index],
                ...args.modfiedPerson
            };

            // 4. Retourner l'objet mis à jour
            return db.people[index];
        }
    }
};