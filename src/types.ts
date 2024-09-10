export interface IStorage<T> {
  create(entity: Partial<T>): Partial<T>;
  delete(id: string): boolean;
  get(id: string): Partial<T> | null;
  getAll(): Partial<T>[] | null;
  update(entity: Partial<T>): boolean;
}

export interface ICommand {
  execute(): void;
}

export interface IResponder {
  output(text: string): void;
}
