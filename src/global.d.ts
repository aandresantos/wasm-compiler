interface Window {
  loadPyodide: () => Promise<PyodideInterface>;
  pyodide: PyodideInterface;
}

// Declare o tipo base do Pyodide
interface PyodideInterface {
  runPython: (code: string) => any;
  loadPackage: (pkg: string | string[]) => Promise<void>;
}
