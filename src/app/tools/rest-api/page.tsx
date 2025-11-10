import Button from "@/components/Button";
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
    description: "Get the current status of the Convex peer including key network and consensus information.",
    example: {
      request: "curl https://peer.convex.live/api/v1/status",
      response: `{
  "consensus-point": 605,
  "proposal-point": 605,
  "genesis": "0xb0e44f2a645abfa539f5b96b7a0eabb0f902866feaff0f7c12d1213e02333f13",
  "peer": "0xf167b15c46ea3e5db7d059230a6b18aa891418261014c4afc93e7b3c572b63a1",
  "belief": "0x3afd30f048506f504f773a7ae804ea10fd5674e474f542011a03941dc737a0e7",
  "state": "0x4a313e33da05964e930b14cdcf9385fb65dca580e9d9167a54f18b6806399cf2",
  "consensus": [605,
                605,
                605,
                605],
  "block-point": 605,
  "states": "0x4a313e33da05964e930b14cdcf9385fb65dca580e9d9167a54f18b6806399cf2"
}`
    }
  }
];

export default function RestApi() {
  return (
      <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div className="hero-section">
          <h1>REST API</h1>
          <p>
            Interact with the Convex peer network using our RESTful API endpoints
          </p>
        </div>

        <section className="card">
            <p className="description-text">
              The Convex <b>REST API</b> allows you to interact with the network programmatically. 
              All API endpoints are served over HTTPS and can return responses in <code>application/json</code> or <code>application/cvx</code> format.
            </p>
            <Code>Base URL: https://peer.convex.live/api/v1</Code>
            <p className="description-text">
              Endpoints are documented using OpenAPI (Swagger) and are available at most Convex peers.
            </p>
            <div>
              <Button href="https://peer.convex.live/swagger" target="_blank" rel="noopener noreferrer">
                Open Swagger UI
              </Button>
            </div>
        </section>

        <section className="card">
          <h2>API Endpoints</h2>
          <div className="endpoints-list">
            {endpoints.map((endpoint) => (
              <article key={endpoint.path}>
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
                  <div className="code-section">
                    <h4>Example Request</h4>
                    <Code language="bash">{endpoint.example.request}</Code>
                  </div>
                  <div className="code-section">
                    <h4>Example Response</h4>
                    <Code language="json">{endpoint.example.response}</Code>
                  </div>
              </article>
            ))}
          </div>
        </section>
      </div>
  );
} 