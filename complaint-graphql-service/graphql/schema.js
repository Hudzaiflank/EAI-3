const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull,
} = require("graphql");
const db = require("../config/db");

let UserType, ComplaintType;

ComplaintType = new GraphQLObjectType({
  name: "Complaint",
  fields: () => ({
    id: { type: GraphQLInt },
    user_id: { type: GraphQLInt },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    created_at: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent) {
        return new Promise((resolve, reject) => {
          db.query(
            "SELECT * FROM users WHERE id = ?",
            [parent.user_id],
            (err, results) => {
              if (err) reject(err);
              resolve(results[0]);
            }
          );
        });
      },
    },
  }),
});

UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    complaints: {
      type: new GraphQLList(ComplaintType),
      resolve(parent) {
        return new Promise((resolve, reject) => {
          db.query(
            "SELECT * FROM complaints WHERE user_id = ?",
            [parent.id],
            (err, results) => {
              if (err) reject(err);
              resolve(results);
            }
          );
        });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    complaints: {
      type: new GraphQLList(ComplaintType),
      resolve() {
        return new Promise((resolve, reject) => {
          db.query("SELECT * FROM complaints", (err, results) => {
            if (err) reject(err);
            resolve(results);
          });
        });
      },
    },
    complaint: {
      type: ComplaintType,
      args: { id: { type: GraphQLInt } },
      resolve(_, args) {
        return new Promise((resolve, reject) => {
          db.query(
            "SELECT * FROM complaints WHERE id = ?",
            [args.id],
            (err, results) => {
              if (err) reject(err);
              resolve(results[0]);
            }
          );
        });
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return new Promise((resolve, reject) => {
          db.query("SELECT * FROM users", (err, results) => {
            if (err) reject(err);
            resolve(results);
          });
        });
      },
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLInt } },
      resolve(_, args) {
        return new Promise((resolve, reject) => {
          db.query(
            "SELECT * FROM users WHERE id = ?",
            [args.id],
            (err, results) => {
              if (err) reject(err);
              resolve(results[0]);
            }
          );
        });
      },
    },
    complaintsByStatus: {
      type: new GraphQLList(ComplaintType),
      args: { status: { type: GraphQLString } },
      resolve(_, args) {
        return new Promise((resolve, reject) => {
          db.query(
            "SELECT * FROM complaints WHERE status = ?",
            [args.status],
            (err, results) => {
              if (err) reject(err);
              resolve(results);
            }
          );
        });
      },
    },
    paginatedComplaints: {
      type: new GraphQLList(ComplaintType),
      args: {
        limit: { type: GraphQLInt },
        offset: { type: GraphQLInt },
      },
      resolve(_, args) {
        return new Promise((resolve, reject) => {
          db.query(
            "SELECT * FROM complaints LIMIT ? OFFSET ?",
            [args.limit, args.offset],
            (err, results) => {
              if (err) reject(err);
              resolve(results);
            }
          );
        });
      },
    },
    totalComplaints: {
      type: GraphQLInt,
      resolve() {
        return new Promise((resolve, reject) => {
          db.query(
            "SELECT COUNT(*) AS count FROM complaints",
            (err, results) => {
              if (err) reject(err);
              resolve(results[0].count);
            }
          );
        });
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addComplaint: {
      type: ComplaintType,
      args: {
        user_id: { type: new GraphQLNonNull(GraphQLInt) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        status: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(_, args) {
        return new Promise((resolve, reject) => {
          db.query(
            "INSERT INTO complaints (user_id, title, description, status) VALUES (?, ?, ?, ?)",
            [args.user_id, args.title, args.description, args.status],
            (err, result) => {
              if (err) reject(err);
              resolve({
                id: result.insertId,
                ...args,
                created_at: new Date().toISOString(),
              });
            }
          );
        });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
