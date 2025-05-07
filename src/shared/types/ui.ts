export type SelectItem<T, V> = {
  name: T;
  value: V;
};

export interface ModalState {
  title: string;
  isOpen: boolean;
}
