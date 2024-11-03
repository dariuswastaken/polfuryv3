export interface Manager<T> {
    createInstance: () => T;
}
