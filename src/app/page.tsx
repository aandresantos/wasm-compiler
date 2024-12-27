'use client';

import { useEffect, useState } from 'react';

export default function Home() {
return (<PythonCompiler />)
}

 function PythonCompiler() {
  const [output, setOutput] = useState('');
  const [code, setCode] = useState('print("Hello, Python from WebAssembly!")');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Aguarde até o script do Pyodide estar disponível
    const loadPyodideScript = async () => {
      while (!window.loadPyodide) {
        await new Promise((resolve) => setTimeout(resolve, 100)); // Aguarde 100ms
      }
      const pyodide = await window.loadPyodide();
      window.pyodide = pyodide; // Tornar acessível globalmente
      setIsLoading(false);
    };
    loadPyodideScript();
  }, []);

  const executePython = async () => {
    if (!window.pyodide) {
      setOutput('Pyodide ainda está carregando...');
      return;
    }
    try {
      const result = window.pyodide.runPython(code);
      setOutput(result);
    } catch (e) {
      setOutput(`Erro: ${(e as Error).message}`);
    }
  };

  return (
    <div>
      <h1>Python WebAssembly Runner</h1>
      {isLoading ? (
        <p>Carregando Pyodide...</p>
      ) : (
        <>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows={10}
            cols={50}
          />
          <br />
          <button onClick={executePython}>Executar Python</button>
          <pre>Saída: {output}</pre>
        </>
      )}
    </div>
  );
}
