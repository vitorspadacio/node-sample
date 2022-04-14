export default {
  noDataFound: (data?: any[]) => (data?.length === 0 ? 'No data found' : undefined),
  successfullyCreated: (entityName: string) => `${entityName} successfully created`,
  successfullyDeleted: (entityName: string) => `${entityName} successfully deleted`,
  successfullyUpdated: (entityName: string) => `${entityName} successfully updated`,
  notFindById: (id: number) => `Entity not found with id ${id}`,
  invalidRequest: 'Request data is invalid',
}
