const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./graphql/schema");
const cors = require("cors");
require("dotenv").config();

// Inisialisasi aplikasi Express
const app = express();

// Izinkan akses dari client-side (React, Postman, dll)
app.use(cors());

// Endpoint GraphQL
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true, // Aktifkan GraphiQL UI (untuk testing manual di browser)
  })
);

// Jalankan server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/graphql`);
});
