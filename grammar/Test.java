import org.antlr.runtime.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.charset.StandardCharsets;

public class Test {
   public static void main(String[] args) throws Exception 
   {
      if (args.length < 1) {
         System.err.println("Uso: java Test <archivo_entrada>");
         return;
      }

      ANTLRFileStream input = new ANTLRFileStream(args[0], "UTF-8");

      proyectoLexer lexer = new proyectoLexer(input);
      CommonTokenStream tokens = new CommonTokenStream(lexer);

      proyectoParser parser = new proyectoParser(tokens);
      parser.inicio();

      if (!parser.getErrores().isEmpty()) {
         System.err.print(parser.getErrores());
         return;
      }

      Files.write(
         Paths.get("sql.txt"),
         parser.getSQL().getBytes(StandardCharsets.UTF_8)
      );

      Files.write(
         Paths.get("estructura.txt"),
         parser.getEstructura().getBytes(StandardCharsets.UTF_8)
      );

      System.out.println("Compilación correcta");
      System.out.println("Archivos generados: sql.txt y estructura.txt");
   }
}