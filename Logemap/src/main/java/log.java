 import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

        public class log {
            public static void main(String[] args) {
                LocalDateTime agora = LocalDateTime.now();
                DateTimeFormatter formatador = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");
                String dataFormatada = agora.format(formatador);

                try {
                    System.out.println(dataFormatada + " Iniciando o sistema");
                    Thread.sleep(2000);

                    System.out.println(dataFormatada + " Identificando oportunidades");
                    Thread.sleep(2000);

                    System.out.println(dataFormatada + " Realizando consulta no banco de dados");
                    Thread.sleep(2000); 


                    System.out.println(dataFormatada + " Cadastrando um novo eletroposto");
                    Thread.sleep(2000);

                    System.out.println(dataFormatada + " Atualizando o sistema");
                    Thread.sleep(2000);
                } catch (InterruptedException e) {
                    System.out.println("A execução foi interrompida.");
                }
            }
        }
