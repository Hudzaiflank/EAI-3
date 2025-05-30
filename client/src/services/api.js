const API_URL = "http://localhost:4000/graphql";

async function executeQuery(query) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });

    const result = await response.json();

    if (result.errors) {
      console.error("GraphQL error:", result.errors);
      return null;
    }

    if (result.data) {
      const values = Object.values(result.data);
      return values[0];
    }

    return null;
  } catch (error) {
    console.error("API request failed:", error);
    return null;
  }
}

export function fetchComplaints() {
  const query = `
    {
      complaints {
        id
        title
        status
        user {
          name
        }
      }
    }
  `;
  return executeQuery(query);
}

export function fetchComplaintDetail(id) {
  const query = `
    {
      complaint(id: ${id}) {
        id
        title
        description
        status
        user {
          name
          email
        }
      }
    }
  `;
  return executeQuery(query);
}

export function fetchOpenComplaints() {
  const query = `
    {
      complaintsByStatus(status: "open") {
        id
        title
        status
        user {
          name
        }
      }
    }
  `;
  return executeQuery(query);
}

export function fetchUserDetail(id) {
  const query = `
    {
      user(id: ${id}) {
        name
        email
        complaints {
          title
          status
        }
      }
    }
  `;
  return executeQuery(query);
}

export function fetchUsers() {
  const query = `
    {
      users {
        id
        name
      }
    }
  `;
  return executeQuery(query).then((data) => {
    return data;
  });
}
