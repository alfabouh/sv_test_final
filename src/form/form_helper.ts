export type writeValue<T> = (localStorage: Storage, key: string, value: T) => void;
export type readValue<T> = (localStorage: Storage, key: string) => T;
export const WriteIn: writeValue<string> = (localStorage, key, value) => {
    localStorage.setItem(key, value);
    console.log("Saved: " + key + " - " + value);
};
export const ReadFrom: readValue<string> = (localStorage, key) => {
    let value: string = localStorage.getItem(key) as string;
    console.log("Read: " + key + " - " + value);
    return value;
};