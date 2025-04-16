interface Service {
  path: string;
  port: number;
}

export const services: Service[] = [
  {
    path: '/auth-api',
    port: 8111,
  },
  {
    path: '/v1/graphql',
    port: 8080,
  },
  {
    path: '/v1/metadata',
    port: 8080,
  },
  {
    path: '/v2/query',
    port: 8080,
  },
  // add others services here
] as const;
