export interface TenantContext {
  organizationId: string;
  requestId: string;
  tenantId: string;
}

export interface TenantScoped {
  tenantId: string;
}
