grammar proyecto;

@header {
import java.util.ArrayList;
import java.util.List;
}

@members {   
    List<Tabla> tablas = new ArrayList<Tabla>();  
    Tabla tablaActual = null;
    List<String> camposSQL = new ArrayList<String>();
    List<String> foreignKeysSQL = new ArrayList<String>();

    StringBuilder sql = new StringBuilder();
    StringBuilder estructura = new StringBuilder();
    StringBuilder errores = new StringBuilder();

    String nombreBD = "";

    public boolean tablaExiste(String nombre) {
        for (Tabla t : tablas) {
            if (t.nombre.equals(nombre)) return true;
        }
        return false;
    }

    public boolean campoExiste(String nombre) {
        if (tablaActual == null) return false;
        for (Atributo a : tablaActual.atributos) {
            if (a.nombreAtributo.equals(nombre)) return true;
        }
        return false;
    }

    public boolean existeTabla(String nombre) {
        for (Tabla t : tablas) {
            if (t.nombre.equals(nombre)) return true;
        }
        return false;
    }

    public boolean esReservada(String texto) {
        return texto.equals("crear") || texto.equals("usar") ||
               texto.equals("lista") || texto.equals("empieza") ||
               texto.equals("termina") || texto.equals("fin") ||
               texto.equals("id") || texto.equals("cantidad") ||
               texto.equals("palabras") || texto.equals("fecha") ||
               texto.equals("conecta");
    }

    public boolean tienePK(String nombreTabla) {
        for (Tabla t : tablas) {
            if (t.nombre.equals(nombreTabla)) {
                for (Atributo a : t.atributos) {
                    if (a.tipoAtributo.equals("id")) return true;
                }
            }
        }
        return false;
    }

    public String obtenerPK(String nombreTabla){
        for (int i = 0; i < tablas.size(); i++){
            Tabla t = tablas.get(i);
            if(t.nombre.equals(nombreTabla)){
                for (int j = 0; j < t.atributos.size(); j++){
                    Atributo a = t.atributos.get(j);
                    if(a.tipoAtributo.equals("id")){
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

inicio: creacion usar tabla+ cerrar;

creacion:
	CREAR ID {
        nombreBD = $ID.text;
        sql.append("CREATE DATABASE ").append($ID.text).append(";\n");
      };

usar:
	USAR ID {
        sql.append("USE ").append($ID.text).append(";\n");
      };

tabla:
	TABLA ID INICIO { 
        if (tablaExiste($ID.text)) {
            errores.append("Línea ")
                   .append($ID.getLine())
                   .append(": la tabla '")
                   .append($ID.text)
                   .append("' ya existe\n");
        } else {
            Tabla t = new Tabla();
            t.nombre = $ID.text;
            tablas.add(t);
            tablaActual = t;

            camposSQL.clear();
            foreignKeysSQL.clear();
        }
      } campo+ FIN {

        if (camposSQL.isEmpty()) {
            errores.append("Línea ")
                   .append($ID.getLine())
                   .append(": la tabla '")
                   .append($ID.text)
                   .append("' no tiene campos\n");
        }

        sql.append("CREATE TABLE ").append($ID.text).append("\n");
        sql.append("(\n");

        int total = camposSQL.size() + foreignKeysSQL.size();
        int contador = 0;

        for (int i = 0; i < camposSQL.size(); i++) {
            sql.append(camposSQL.get(i));
            contador++;

            if (contador < total) {
                sql.append(",\n");
            } else {
                sql.append("\n");
            }
        }

        for (int i = 0; i < foreignKeysSQL.size(); i++) {
            sql.append(foreignKeysSQL.get(i));
            contador++;

            if (contador < total) {
                sql.append(",\n");
            } else {
                sql.append("\n");
            }
        }

        sql.append(");\n\n");
      };

campo:
	id1 = (ID | FECHA | NUMERO | TEXTO | IDENTIFICADOR) t = (
		NUMERO
		| TEXTO
		| FECHA
		| IDENTIFICADOR
	) {
        if (tablaActual == null) {
            errores.append("Línea ")
                   .append($id1.getLine())
                   .append(": campo fuera de una tabla\n");
            return;
        }

        if (esReservada($id1.text)) {
            errores.append("Línea ")
                   .append($id1.getLine())
                   .append(": '")
                   .append($id1.text)
                   .append("' es palabra reservada\n");
            return;
        }

        if (campoExiste($id1.text)) {
            errores.append("Línea ")
                   .append($id1.getLine())
                   .append(": el campo '")
                   .append($id1.text)
                   .append("' ya existe en la tabla\n");
        } else {
            if(($t.text).compareTo("palabras")==0) 
                camposSQL.add("   " + $id1.text + " VARCHAR(300)");
            else if(($t.text).compareTo("fecha")==0)
                camposSQL.add("   " + $id1.text + " DATE"); 
            else if(($t.text).compareTo("cantidad")==0)
                camposSQL.add("   " + $id1.text + " INTEGER");
            else if(($t.text).compareTo("id")==0)
                camposSQL.add("   " + $id1.text + " INTEGER PRIMARY KEY AUTOINCREMENT");
            else {
                errores.append("Línea ")
                       .append($t.getLine())
                       .append(": tipo de dato inválido '")
                       .append($t.text)
                       .append("'\n");
            }

            Atributo a = new Atributo();
            a.nombreAtributo = $id1.text;
            a.tipoAtributo = $t.text;
            a.tablaReferencia = "";
            tablaActual.atributos.add(a);
        }
      }
	| id1 = ID REFERENCIA id2 = ID {
        if (!existeTabla($id2.text)) {
            errores.append("Línea ")
                   .append($id2.getLine())
                   .append(": la tabla '")
                   .append($id2.text)
                   .append("' no existe\n");
        } else if (!tienePK($id2.text)) {
            errores.append("Línea ")
                   .append($id2.getLine())
                   .append(": la tabla '")
                   .append($id2.text)
                   .append("' no tiene clave primaria\n");
        } else if (campoExiste($id1.text)) {
            errores.append("Línea ")
                   .append($id1.getLine())
                   .append(": el campo '")
                   .append($id1.text)
                   .append("' ya existe en la tabla\n");
        } else {
            camposSQL.add("   " + $id1.text + " INTEGER");

            foreignKeysSQL.add("   FOREIGN KEY (" + $id1.text + ") REFERENCES " + $id2.text + "(" + obtenerPK($id2.text) + ")");

            Atributo a = new Atributo();
            a.nombreAtributo = $id1.text;
            a.tipoAtributo = "conecta";
            a.tablaReferencia = $id2.text;
            tablaActual.atributos.add(a);
        }
      };

cerrar:
	CERRAR {
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

                if(a.tipoAtributo.equals("conecta")){
                    estructura.append(" -> ")
                              .append(a.tablaReferencia);
                }

                estructura.append("\n");
            }

            estructura.append("\n");
        }
      };

CERRAR: 'fin';
NUMERO: 'cantidad';
TEXTO: 'palabras';
FECHA: 'fecha';
IDENTIFICADOR: 'id';
REFERENCIA: 'conecta';
TABLA: 'lista';
INICIO: 'empieza';
FIN: 'termina';
USAR: 'usar';
CREAR: 'crear';

ID: ('a' ..'z' | 'A' ..'Z' | '_') (
		'a' ..'z'
		| 'A' ..'Z'
		| '0' ..'9'
		| '_'
	)*;

WS: (' ' | '\n' | '\t' | '\r')+ {$channel=HIDDEN; };