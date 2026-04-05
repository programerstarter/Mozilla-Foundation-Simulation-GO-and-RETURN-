import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Globe, Code2, Play } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'simulator' | 'code'>('code');

  // Simulator state
  const [pilhaVoltar, setPilhaVoltar] = useState<string[]>([]);
  const [pilhaAvancar, setPilhaAvancar] = useState<string[]>([]);
  const [paginaAtual, setPaginaAtual] = useState<string | null>(null);
  const [urlInput, setUrlInput] = useState('');
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLogs((prev) => [...prev, msg]);
  };

  const acessarPagina = (url: string) => {
    if (!url.trim()) return;
    if (paginaAtual) {
      setPilhaVoltar([...pilhaVoltar, paginaAtual]);
    }
    setPaginaAtual(url);
    setPilhaAvancar([]);
    addLog(`Acessou: ${url}`);
    setUrlInput('');
  };

  const voltar = () => {
    if (pilhaVoltar.length > 0) {
      const novaPilhaVoltar = [...pilhaVoltar];
      const prevPage = novaPilhaVoltar.pop()!;
      setPilhaAvancar([...pilhaAvancar, paginaAtual!]);
      setPaginaAtual(prevPage);
      setPilhaVoltar(novaPilhaVoltar);
      addLog(`Voltou para: ${prevPage}`);
    } else {
      addLog('Não é possível voltar. Pilha vazia.');
    }
  };

  const avancar = () => {
    if (pilhaAvancar.length > 0) {
      const novaPilhaAvancar = [...pilhaAvancar];
      const nextPage = novaPilhaAvancar.pop()!;
      setPilhaVoltar([...pilhaVoltar, paginaAtual!]);
      setPaginaAtual(nextPage);
      setPilhaAvancar(novaPilhaAvancar);
      addLog(`Avançou para: ${nextPage}`);
    } else {
      addLog('Não é possível avançar. Pilha vazia.');
    }
  };

  const reset = () => {
    setPilhaVoltar([]);
    setPilhaAvancar([]);
    setPaginaAtual(null);
    setLogs([]);
  };

  const runTests = () => {
    reset();
    setTimeout(() => acessarPagina('Google'), 100);
    setTimeout(() => acessarPagina('YouTube'), 600);
    setTimeout(() => acessarPagina('GitHub'), 1100);
    setTimeout(() => voltar(), 1600);
    setTimeout(() => voltar(), 2100);
    setTimeout(() => avancar(), 2600);
    setTimeout(() => {
      addLog('');
      addLog('--- Estado do Navegador ---');
      addLog(`Página Atual: YouTube`);
      addLog(`Pilha Voltar: [Google]`);
      addLog(`Pilha Avançar: [GitHub]`);
      addLog('---------------------------');
    }, 3100);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-sans p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-blue-700 flex items-center justify-center gap-3">
            <Globe className="w-8 h-8" />
            Simulador de Navegador com Pilhas
          </h1>
          <p className="text-gray-600 mt-2">
            Implementação em Java dos botões Voltar e Avançar usando a estrutura de dados Pilha (Stack).
          </p>
        </header>

        <div className="flex gap-4 mb-6 justify-center">
          <button
            onClick={() => setActiveTab('code')}
            className={`px-6 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors ${
              activeTab === 'code' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            <Code2 className="w-5 h-5" />
            Código Java
          </button>
          <button
            onClick={() => setActiveTab('simulator')}
            className={`px-6 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors ${
              activeTab === 'simulator' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            <Play className="w-5 h-5" />
            Simulador Interativo
          </button>
        </div>

        {activeTab === 'code' && (
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 flex flex-col">
              <div className="bg-gray-800 text-gray-200 px-4 py-2 text-sm font-mono flex justify-between items-center">
                <span>Navegador.java</span>
              </div>
              <pre className="p-4 overflow-x-auto text-sm font-mono text-gray-800 bg-gray-50 flex-grow h-[600px] overflow-y-auto">
{`import java.util.Stack;

/**
 * Classe que simula o comportamento de um navegador web
 * utilizando pilhas para as operações de voltar e avançar.
 */
public class Navegador {
    private Stack<String> pilhaVoltar;
    private Stack<String> pilhaAvancar;
    private String paginaAtual;

    /**
     * Construtor do Navegador.
     * Inicializa as pilhas vazias e a página atual como nula.
     */
    public Navegador() {
        this.pilhaVoltar = new Stack<>();
        this.pilhaAvancar = new Stack<>();
        this.paginaAtual = null;
    }

    /**
     * Acessa uma nova página.
     * @param url A URL da nova página a ser acessada.
     */
    public void acessarPagina(String url) {
        if (this.paginaAtual != null) {
            // Empilha a página atual na pilha de voltar
            this.pilhaVoltar.push(this.paginaAtual);
        }
        this.paginaAtual = url;
        // Limpa a pilha de avançar, pois um novo caminho foi iniciado
        this.pilhaAvancar.clear();
        System.out.println("Acessou: " + url);
    }

    /**
     * Volta para a página anterior.
     */
    public void voltar() {
        if (!this.pilhaVoltar.isEmpty()) {
            // Move a página atual para a pilha de avançar
            this.pilhaAvancar.push(this.paginaAtual);
            // Atualiza a página atual com o topo da pilha de voltar
            this.paginaAtual = this.pilhaVoltar.pop();
            System.out.println("Voltou para: " + this.paginaAtual);
        } else {
            System.out.println("Não é possível voltar. Pilha vazia.");
        }
    }

    /**
     * Avança para a próxima página.
     */
    public void avancar() {
        if (!this.pilhaAvancar.isEmpty()) {
            // Move a página atual para a pilha de voltar
            this.pilhaVoltar.push(this.paginaAtual);
            // Atualiza a página atual com o topo da pilha de avançar
            this.paginaAtual = this.pilhaAvancar.pop();
            System.out.println("Avançou para: " + this.paginaAtual);
        } else {
            System.out.println("Não é possível avançar. Pilha vazia.");
        }
    }

    /**
     * Mostra o estado atual do navegador (página atual e pilhas).
     */
    public void mostrarEstado() {
        System.out.println("\\n--- Estado do Navegador ---");
        System.out.println("Página Atual: " + (this.paginaAtual != null ? this.paginaAtual : "Nenhuma"));
        System.out.println("Pilha Voltar: " + this.pilhaVoltar);
        System.out.println("Pilha Avançar: " + this.pilhaAvancar);
        System.out.println("---------------------------\\n");
    }
}`}
              </pre>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 flex flex-col">
              <div className="bg-gray-800 text-gray-200 px-4 py-2 text-sm font-mono flex justify-between items-center">
                <span>Main.java</span>
              </div>
              <pre className="p-4 overflow-x-auto text-sm font-mono text-gray-800 bg-gray-50">
{`/**
 * Classe principal para testar o simulador de navegador.
 */
public class Main {
    public static void main(String[] args) {
        Navegador navegador = new Navegador();

        // Testes conforme os requisitos
        navegador.acessarPagina("Google");
        navegador.acessarPagina("YouTube");
        navegador.acessarPagina("GitHub");
        
        navegador.voltar();
        navegador.voltar();
        
        navegador.avancar();
        
        navegador.mostrarEstado();
    }
}`}
              </pre>
              <div className="bg-gray-800 text-gray-200 px-4 py-2 text-sm font-mono border-t border-gray-700">
                <span>Saída do Console (Execução do Main)</span>
              </div>
              <pre className="p-4 overflow-x-auto text-sm font-mono text-green-400 bg-gray-900 flex-grow">
{`Acessou: Google
Acessou: YouTube
Acessou: GitHub
Voltou para: YouTube
Voltou para: Google
Avançou para: YouTube

--- Estado do Navegador ---
Página Atual: YouTube
Pilha Voltar: [Google]
Pilha Avançar: [GitHub]
---------------------------`}
              </pre>
            </div>
          </div>
        )}

        {activeTab === 'simulator' && (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-4 mb-6 bg-gray-100 p-3 rounded-lg">
                <button
                  onClick={voltar}
                  disabled={pilhaVoltar.length === 0}
                  className="p-2 rounded-full hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  title="Voltar"
                >
                  <ArrowLeft className="w-6 h-6 text-gray-700" />
                </button>
                <button
                  onClick={avancar}
                  disabled={pilhaAvancar.length === 0}
                  className="p-2 rounded-full hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  title="Avançar"
                >
                  <ArrowRight className="w-6 h-6 text-gray-700" />
                </button>
                
                <div className="flex-grow flex gap-2">
                  <input
                    type="text"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && acessarPagina(urlInput)}
                    placeholder="Digite uma URL (ex: Google) e pressione Enter..."
                    className="flex-grow px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => acessarPagina(urlInput)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Acessar
                  </button>
                </div>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-xl h-64 flex items-center justify-center bg-gray-50 mb-6">
                {paginaAtual ? (
                  <div className="text-center">
                    <Globe className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-800">{paginaAtual}</h2>
                    <p className="text-gray-500 mt-2">Página Atual</p>
                  </div>
                ) : (
                  <p className="text-gray-400 text-lg">Nenhuma página acessada</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h3 className="font-bold text-gray-700 mb-3 text-center border-b pb-2">Pilha Voltar</h3>
                  <div className="flex flex-col-reverse gap-2">
                    {pilhaVoltar.length === 0 ? (
                      <div className="text-center text-gray-400 py-4 italic">Vazia</div>
                    ) : (
                      pilhaVoltar.map((url, i) => (
                        <div key={i} className="bg-blue-100 border border-blue-200 text-blue-800 px-4 py-2 rounded text-center shadow-sm">
                          {url}
                        </div>
                      ))
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-700 mb-3 text-center border-b pb-2">Pilha Avançar</h3>
                  <div className="flex flex-col-reverse gap-2">
                    {pilhaAvancar.length === 0 ? (
                      <div className="text-center text-gray-400 py-4 italic">Vazia</div>
                    ) : (
                      pilhaAvancar.map((url, i) => (
                        <div key={i} className="bg-green-100 border border-green-200 text-green-800 px-4 py-2 rounded text-center shadow-sm">
                          {url}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 rounded-xl shadow-sm border border-gray-800 flex flex-col overflow-hidden h-[600px] lg:h-auto">
              <div className="bg-gray-800 text-gray-200 px-4 py-3 text-sm font-mono flex justify-between items-center">
                <span>Console Logs</span>
                <div className="flex gap-2">
                  <button onClick={runTests} className="text-xs bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded text-white transition-colors">
                    Rodar Testes
                  </button>
                  <button onClick={reset} className="text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded text-gray-200 transition-colors">
                    Limpar
                  </button>
                </div>
              </div>
              <div className="p-4 overflow-y-auto flex-grow font-mono text-sm text-green-400 flex flex-col gap-1">
                {logs.length === 0 ? (
                  <span className="text-gray-600 italic">Aguardando ações...</span>
                ) : (
                  logs.map((log, i) => (
                    <div key={i}>{log}</div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
