export type CrudRecord = {
  id: string;
  slug?: string;
};

export type CreateInput<T extends CrudRecord> = Omit<T, "id"> & Partial<Pick<T, "id">>;
export type UpdateInput<T extends CrudRecord> = Partial<Omit<T, "id">>;

export function createMockCrudService<T extends CrudRecord>(
  seed: T[],
  idPrefix: string,
) {
  const records = [...seed];

  return {
    async list() {
      return records;
    },

    async getById(id: string) {
      return records.find((record) => record.id === id) ?? null;
    },

    async getBySlug(slug: string) {
      return records.find((record) => record.slug === slug) ?? null;
    },

    async create(input: CreateInput<T>) {
      const record = {
        ...input,
        id: input.id ?? `${idPrefix}-${Date.now()}`,
      } as T;

      records.unshift(record);
      return record;
    },

    async update(id: string, input: UpdateInput<T>) {
      const index = records.findIndex((record) => record.id === id);

      if (index < 0) {
        return null;
      }

      records[index] = { ...records[index], ...input };
      return records[index];
    },

    async remove(id: string) {
      const index = records.findIndex((record) => record.id === id);

      if (index < 0) {
        return false;
      }

      records.splice(index, 1);
      return true;
    },
  };
}
