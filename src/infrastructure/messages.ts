export default {
  noDataFound: (data?: any[]) => (data?.length === 0 ? 'No data found' : undefined),
  successfullyCreated: (entityName: string) => `${entityName} successfully created`,
  invalidRequest: 'Request data is invalid',
}
