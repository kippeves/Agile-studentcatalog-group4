export const storage = <T>(index: string) => {

    const clear = (key: string) => {
        try {
            localStorage.removeItem(key);
            return true;
        } catch {
            return false;
        }
    }

    const load = () => {
        const data = localStorage.getItem(index);
        if (data === undefined)
            return undefined;

        return data ? JSON.parse(data) as T : undefined;
    }


    const save = ({ data }: { data: T }) => {
        try {
            localStorage[index] = JSON.stringify(data);
            return true;
        } catch {
            return false;
        }
    }

    return { load, save, clear }
}