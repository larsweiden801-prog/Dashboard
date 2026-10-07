// crypto.randomUUID bestaat alleen in beveiligde contexten (HTTPS/localhost).
export const createId = (): string =>
  Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
