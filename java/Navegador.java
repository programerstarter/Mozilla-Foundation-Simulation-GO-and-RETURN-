import java.util.Stack;

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
        System.out.println("\n--- Estado do Navegador ---");
        System.out.println("Página Atual: " + (this.paginaAtual != null ? this.paginaAtual : "Nenhuma"));
        System.out.println("Pilha Voltar: " + this.pilhaVoltar);
        System.out.println("Pilha Avançar: " + this.pilhaAvancar);
        System.out.println("---------------------------\n");
    }
}
