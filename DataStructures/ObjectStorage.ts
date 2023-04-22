import { Creator, TKey } from "../Common";

export default class ObjectStorage<T> {
    private storage: Record<TKey, T>;
    private creator: Creator<T>;

    constructor(creator: Creator<T>) {
        this.creator = creator;
    }

    getOrCreate(key: TKey): T {
        const { storage, creator } = this;

        if (storage[key]) {
            return storage[key];
        } else {
            let resource = creator();
            storage[key] = resource;
            return resource;
        }
    }

    destroy(key: TKey): ObjectStorage<T> {
        delete this.storage[key];
        return this;
    }

    clear(): ObjectStorage<T> {
        this.storage = {};
        return this;
    }
}