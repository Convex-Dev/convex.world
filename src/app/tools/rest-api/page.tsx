import Code from "@/components/Code";

interface Endpoint {
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  description: string;
  example: {
    request: string;
    response: string;
  };
}

const endpoints: Endpoint[] = [
  {
    method: "GET",
    path: "/api/v1/status",
    description: "Get the current status of the Convex network including version, block height, and network health.",
    example: {
      request: "curl http://peer.convex.live:8080/api/v1/status",
      response: `{
  "status": "healthy",
  "version": "1.0.0",
  "blockHeight": 1234567,
  "timestamp": "2024-01-20T12:00:00Z"
}`
    }
  },
  {
    method: "POST",
    path: "/api/v1/transactions",
    description: "Submit a new transaction to the Convex network.",
    example: {
      request: `curl -X POST http://peer.convex.live:8080/api/v1/transactions \\
-H "Content-Type: application/json" \\
-d '{
  "sender": "0x...",
  "action": "transfer",
  "params": {
    "to": "0x...",
    "amount": 1000
  }
}'`,
      response: `{
  "transactionHash": "0x...",
  "status": "pending",
  "timestamp": "2024-01-20T12:00:00Z"
}`
    }
  },
  {
    method: "GET",
    path: "/api/v1/accounts/{address}",
    description: "Retrieve account information including balance and transaction history.",
    example: {
      request: "curl http://peer.convex.live:8080/api/v1/accounts/0x...",
      response: `{
  "address": "0x...",
  "balance": 5000,
  "nonce": 42,
  "lastActivity": "2024-01-20T12:00:00Z"
}`
    }
  },
  {
    method: "GET",
    path: "/api/v1/blocks/{height}",
    description: "Get detailed information about a specific block by its height.",
    example: {
      request: "curl http://peer.convex.live:8080/api/v1/blocks/1234567",
      response: `{
  "height": 1234567,
  "hash": "0x...",
  "timestamp": "2024-01-20T12:00:00Z",
  "transactions": ["0x...", "0x..."]
}`
    }
  }
];

export default function RestApi() {
  return (
    <main>
      <div className="container">
        <div className="hero-section">
          <h1>REST API</h1>
          <p className="intro-text">
            Interact with the Convex network using our RESTful API endpoints
          </p>
        </div>

        <section>
          <h2>Getting Started</h2>
          <div className="card">
            <p className="description-text">
              The Convex REST API allows you to interact with the network programmatically. 
              All API endpoints are served over HTTPS and return responses in JSON format.
            </p>
            <Code>Base URL: http://peer.convex.live:8080/api/v1</Code>
          </div>
        </section>

        <section>
          <h2>API Endpoints</h2>
          <div className="endpoints-list">
            {endpoints.map((endpoint) => (
              <article key={endpoint.path} className="card">
                <div className="endpoint-header">
                  <div>
                    <div className="endpoint-meta">
                      <span className={`method-badge method-${endpoint.method.toLowerCase()}`}>
                        {endpoint.method}
                      </span>
                      <code className="endpoint-path">
                        {endpoint.path}
                      </code>
                    </div>
                    <p className="description-text">
                      {endpoint.description}
                    </p>
                  </div>
                </div>
                <div className="code-block">
                  <div className="code-section">
                    <h4>Example Request</h4>
                    <Code language="bash">{endpoint.example.request}</Code>
                  </div>
                  <div className="code-section">
                    <h4>Example Response</h4>
                    <Code language="json">{endpoint.example.response}</Code>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
} 