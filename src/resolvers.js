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
        },
        deletePerson: (_, args) => {
            // Filtrer les personnes et des postes pour exclure celle avec l'ID donné
            db.people = db.people.filter(person => person.id !== args.id);
            db.posts = db.posts.filter(post => post.author_id !== args.id);
            // Retourner la liste mise à jour des personnes
            return db.people;
        },
        addPost: (_, args) => {
            const authorExists = db.people.some(person => person.id === args.author_id);
            if (!authorExists) {
                throw new Error("Author not found");
            }
            const lastId = db.posts.length > 0 ? parseInt(db.posts[db.posts.length - 1].id) : 0;
            const newPost = {
                id: String(lastId + 1),
                title: args.title,
                author_id: args.author_id
            };
            db.posts.push(newPost);
            return newPost;
        },
        updatePost: (_, args) => {
            const index = db.posts.findIndex(p => p.id === args.id);
            if (index === -1) return null;

            const updatedPost = { ...db.posts[index] };
            
            db.posts[index] = {
                ...updatedPost,
                ...args.modfiedPost
            };

            return updatedPost;
        },
        deletePost: (_, args) => {
            db.posts = db.posts.filter(post => post.id !== args.id);
            return db.posts;
        }
    }
};