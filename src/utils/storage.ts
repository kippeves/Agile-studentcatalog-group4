/**
 * Factory function that creates a type-safe storage interface for a given key.
 * @param key The storage key to create an interface for
 * @returns Object with save(), load(), checkExists() and clear() methods for the specified key
 */
export const storage = <T>(index: string) => {
  const clear = (key: string) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch {
      return false;
    }
  };

  const checkExists = () => {
    const data = localStorage.getItem(index);
    if (!data) return false;
    return true;
  };

  const load = () => {
    const data = localStorage.getItem(index);
    return data ? (JSON.parse(data) as T) : ([] as T);
  };

  const save = ({ data }: { data: T }) => {
    try {
      localStorage[index] = JSON.stringify(data);
      return true;
    } catch {
      return false;
    }
  };

  return { load, save, checkExists, clear };
};
