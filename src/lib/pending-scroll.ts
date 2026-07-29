const STORAGE_KEY = "futuremech:pending-scroll";

export function setPendingScroll(id: string) {
  try {
    sessionStorage.setItem(STORAGE_KEY, id);
  } catch {}
}

export function consumePendingScroll(): string | null {
  try {
    const id = sessionStorage.getItem(STORAGE_KEY);
    if (id) sessionStorage.removeItem(STORAGE_KEY);
    return id;
  } catch {
    return null;
  }
}
