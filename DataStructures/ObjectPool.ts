interface Creator<T> {
    (): T;
}

export default class ObjectPool<T> {
    private pool: T[];
    private creator: Creator<T>;

    constructor(creator: Creator<T>) {
        this.pool = [];
        this.creator = creator;
    }

    release(obj: T) {
        this.pool.push(obj);
    }

    acquire(): T {
        let resource: T;

        if (this.pool.length > 0) {
            resource = this.pool.pop();
        } else {
            resource = this.creator();
        }

        return resource;
    }
}