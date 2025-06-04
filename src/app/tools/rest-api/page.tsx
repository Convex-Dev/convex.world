import Image from "next/image";

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
    <div className="bg-convex-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <main className="py-20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-5xl font-bold text-convex-dark-blue mb-6">
                REST API
              </h1>
              <p className="text-xl text-convex-medium-blue mb-8">
                Interact with the Convex network using our RESTful API endpoints
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-convex-dark-blue mb-4">
                Getting Started
              </h2>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-convex-sky-blue mb-6">
                <p className="text-convex-medium-blue mb-4">
                  The Convex REST API allows you to interact with the network programmatically. 
                  All API endpoints are served over HTTPS and return responses in JSON format.
                </p>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-sm font-mono text-convex-dark-blue">
                    Base URL: http://peer.convex.live:8080/api/v1
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <h2 className="text-2xl font-semibold text-convex-dark-blue mb-4">
                API Endpoints
              </h2>
              {endpoints.map((endpoint) => (
                <div
                  key={endpoint.path}
                  className="bg-white p-6 rounded-lg shadow-sm border border-convex-sky-blue"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`
                          px-2 py-1 rounded text-sm font-medium
                          ${endpoint.method === 'GET' ? 'bg-green-100 text-green-800' :
                            endpoint.method === 'POST' ? 'bg-blue-100 text-blue-800' :
                            endpoint.method === 'PUT' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'}
                        `}>
                          {endpoint.method}
                        </span>
                        <code className="text-convex-dark-blue font-mono">
                          {endpoint.path}
                        </code>
                      </div>
                      <p className="text-convex-medium-blue">
                        {endpoint.description}
                      </p>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-md space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-convex-dark-blue mb-2">
                        Example Request
                      </h4>
                      <pre className="text-sm font-mono text-convex-medium-blue whitespace-pre-wrap">
                        {endpoint.example.request}
                      </pre>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-convex-dark-blue mb-2">
                        Example Response
                      </h4>
                      <pre className="text-sm font-mono text-convex-medium-blue whitespace-pre-wrap">
                        {endpoint.example.response}
                      </pre>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 