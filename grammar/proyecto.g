grammar proyecto;

@header {
import java.util.ArrayList;
import java.util.List;
}

@members{   
    List<Tabla> tablas = new ArrayList<Tabla>();  
    Tabla tablaActual = null;
    List<String> camposSQL = new ArrayList<String>();

    StringBuilder sql = new StringBuilder();
    StringBuilder estructura = new StringBuilder();
    StringBuilder errores = new StringBuilder();

    String nombreBD = "";

    public String obtenerPK(String nombreTabla){
        for (int i = 0; i < tablas.size(); i++){
            Tabla t = tablas.get(i);
            if(t.nombre.equals(nombreTabla)){
                for (int j = 0; j < t.atributos.size(); j++){
                    Atributo a = t.atributos.get(j);
                    if(a.tipoAtributo.equals("identificador")){
                        return a.nombreAtributo;
                    }
                }
            }
        }
        return nombreTabla + "_id";
    }

    public String getSQL() {
        return sql.toString();
    }

    public String getEstructura() {
        return estructura.toString();
    }

    public String getErrores() {
        return errores.toString();
    }

    @Override
    public void displayRecognitionError(String[] tokenNames, RecognitionException e) {
        String mensaje = getErrorMessage(e, tokenNames);
        errores.append("Línea ")
               .append(e.line)
               .append(": ")
               .append(mensaje)
               .append("\n");
    }
}

inicio 
    : creacion usar tabla+ cerrar
    ;

creacion 
    : CREAR ID
      {
        nombreBD = $ID.text;
        sql.append("CREATE DATABASE ").append($ID.text).append(";\n");
      }
    ; 

usar     
    : USAR ID
      {
        sql.append("USE ").append($ID.text).append(";\n");
      }
    ;

tabla    
    : TABLA ID INICIO 
      { 
        Tabla t = new Tabla();
        t.nombre = $ID.text;
        tablas.add(t);
        tablaActual = t;

        camposSQL.clear();
      }
      campo+ 
      FIN
      {
        sql.append("CREATE TABLE ").append($ID.text).append("\n");
        sql.append("(\n");

        for (int i = 0; i < camposSQL.size(); i++) {
            sql.append(camposSQL.get(i));
            if (i < camposSQL.size() - 1) {
                sql.append(",\n");
            } else {
                sql.append("\n");
            }
        }

        sql.append(");\n\n");
      }
    ;

campo
    : id1=ID t=(NUMERO | TEXTO | FECHA | IDENTIFICADOR)
      {
          if(($t.text).compareTo("texto")==0) 
              camposSQL.add("   " + $id1.text + " VARCHAR(300)");
          else if(($t.text).compareTo("fecha")==0)
              camposSQL.add("   " + $id1.text + " DATE"); 
          else if(($t.text).compareTo("numero")==0)
              camposSQL.add("   " + $id1.text + " INTEGER");
          else if(($t.text).compareTo("identificador")==0)
              camposSQL.add("   " + $id1.text + " INTEGER PRIMARY KEY AUTOINCREMENT");

          Atributo a = new Atributo();
          a.nombreAtributo = $id1.text;
          a.tipoAtributo = $t.text;
          a.tablaReferencia = "";
          tablaActual.atributos.add(a);
      }

    | id1=ID REFERENCIA id2=ID
      {
          camposSQL.add("   " + $id1.text + " INTEGER");
          camposSQL.add("   FOREIGN KEY (" + $id1.text + ") REFERENCES " + $id2.text + "(" + obtenerPK($id2.text) + ")");

          Atributo a = new Atributo();
          a.nombreAtributo = $id1.text;
          a.tipoAtributo = "referencia";
          a.tablaReferencia = $id2.text;
          tablaActual.atributos.add(a);
      }
    ;

cerrar   
    : CERRAR
      {
        estructura.append("BASE DE DATOS: ")
                  .append(nombreBD)
                  .append("\n\n");

        for (int i = 0; i < tablas.size(); i++){ 
            Tabla tabla = tablas.get(i);
            estructura.append("TABLA: ")
                      .append(tabla.nombre)
                      .append("\n");

            List<Atributo> atribs = tabla.atributos;
                 
            for (int j = 0; j < atribs.size(); j++){  
                Atributo a = atribs.get(j);

                estructura.append("- ")
                          .append(a.nombreAtributo)
                          .append(" : ")
                          .append(a.tipoAtributo);

                if(a.tipoAtributo.equals("referencia")){
                    estructura.append(" -> ")
                              .append(a.tablaReferencia);
                }

                estructura.append("\n");
            }

            estructura.append("\n");
        }
      }
    ;

CERRAR        : 'cerrar';
NUMERO        : 'numero';
TEXTO         : 'texto';
FECHA         : 'fecha';
IDENTIFICADOR : 'identificador';
REFERENCIA    : 'referencia';
TABLA         : 'tabla';
INICIO        : 'inicio';
FIN           : 'fin';
USAR          : 'usar';
CREAR         : 'crear';

ID : ('a'..'z'|'A'..'Z'|'_') ('a'..'z'|'A'..'Z'|'0'..'9'|'_')* ;  
WS : (' ' | '\n' | '\t' | '\r')+ {$channel=HIDDEN; } ;