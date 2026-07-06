export async function onRequest(context) {
  const { request, next } = context;
  const accept = request.headers.get('accept') || '';
  const url = new URL(request.url);
  const origin = `${url.protocol}//${url.host}`;

  const wantsMarkdown = /text\/markdown|text\/x-markdown|application\/markdown/i.test(accept);

  if (wantsMarkdown && (url.pathname === '/' || url.pathname === '/index.html')) {
    const markdown = `# 歪瞳 Minecraft 工具站\n\n欢迎访问 ${origin}。\n\n- 主页: ${origin}/\n- 工具入口: ${origin}/et/\n- 文档: ${origin}/docs/api/\n`;
    return new Response(markdown, {
      status: 200,
      headers: {
        'content-type': 'text/markdown; charset=utf-8',
        'x-markdown-tokens': 'true',
        'cache-control': 'public, max-age=300'
      }
    });
  }

  if (url.pathname === '/.well-known/api-catalog') {
    return new Response(JSON.stringify({
      linkset: [{
        anchor: `${origin}/`,
        item: [
          { href: `${origin}/et/`, rel: 'service-desc', type: 'text/html' },
          { href: `${origin}/docs/api/`, rel: 'service-doc', type: 'text/html' },
          { href: `${origin}/robots.txt`, rel: 'status', type: 'text/plain' }
        ]
      }]
    }, null, 2), {
      status: 200,
      headers: {
        'content-type': 'application/linkset+json; charset=utf-8',
        'cache-control': 'public, max-age=300'
      }
    });
  }

  if (url.pathname === '/.well-known/openid-configuration') {
    return new Response(JSON.stringify({
      issuer: `${origin}/`,
      authorization_endpoint: `${origin}/auth/authorize`,
      token_endpoint: `${origin}/auth/token`,
      jwks_uri: `${origin}/.well-known/jwks.json`,
      response_types_supported: ['code'],
      subject_types_supported: ['public'],
      id_token_signing_alg_values_supported: ['RS256'],
      scopes_supported: ['openid', 'profile', 'email'],
      grant_types_supported: ['authorization_code', 'refresh_token']
    }, null, 2), {
      status: 200,
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'cache-control': 'public, max-age=300'
      }
    });
  }

  if (url.pathname === '/.well-known/oauth-protected-resource') {
    return new Response(JSON.stringify({
      resource: `${origin}/`,
      authorization_servers: [`${origin}/`],
      scopes_supported: ['openid', 'profile', 'email']
    }, null, 2), {
      status: 200,
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'cache-control': 'public, max-age=300'
      }
    });
  }

  if (url.pathname === '/.well-known/oauth-authorization-server') {
    return new Response(JSON.stringify({
      issuer: `${origin}/`,
      authorization_endpoint: `${origin}/auth/authorize`,
      token_endpoint: `${origin}/auth/token`,
      jwks_uri: `${origin}/.well-known/jwks.json`,
      grant_types_supported: ['authorization_code', 'refresh_token'],
      response_types_supported: ['code'],
      scopes_supported: ['openid', 'profile', 'email'],
      agent_auth: {
        register_uri: `${origin}/auth/register`,
        supported_identity_types: ['oauth2'],
        credential_types: ['client_secret_basic'],
        revocation_endpoint: `${origin}/auth/revoke`,
        authorization_url: `${origin}/auth/authorize`
      }
    }, null, 2), {
      status: 200,
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'cache-control': 'public, max-age=300'
      }
    });
  }

  if (url.pathname === '/.well-known/mcp/server-card.json') {
    return new Response(JSON.stringify({
      serverInfo: { name: 'tools.mcms.qzz.io', version: '1.0.0' },
      transport: { type: 'http', endpoint: `${origin}/` },
      capabilities: ['tool-discovery']
    }, null, 2), {
      status: 200,
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'cache-control': 'public, max-age=300'
      }
    });
  }

  if (url.pathname === '/.well-known/agent-skills/index.json') {
    return new Response(JSON.stringify({
      $schema: 'https://agentskills.io/schemas/skill-index-v0.2.0.json',
      skills: [{
        name: 'site-overview',
        type: 'text',
        description: 'Overview of the tools.mcms.qzz.io site and available resources.',
        url: `${origin}/`,
        sha256: ''
      }]
    }, null, 2), {
      status: 200,
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'cache-control': 'public, max-age=300'
      }
    });
  }

  return next();
}
