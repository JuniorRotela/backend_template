declare module 'rtf-parser' {
    // Define las funciones o clases que exporta rtf-parser
    export function parse(data: string, callback: (error: Error | null, document: any) => void): void;
}
