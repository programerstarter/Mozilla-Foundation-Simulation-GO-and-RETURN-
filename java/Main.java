/**
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
}
