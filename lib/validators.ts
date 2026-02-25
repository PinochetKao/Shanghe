export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const phoneRegex = /^[+\d\s\-()]{6,20}$/;

export const isRequired = (v: unknown) => typeof v === 'string' && v.trim().length > 0;
