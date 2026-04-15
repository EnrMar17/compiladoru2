// $ANTLR 3.5.2 proyecto.g 2026-04-15 10:14:06

import java.util.ArrayList;
import java.util.List;


import org.antlr.runtime.*;
import java.util.Stack;
import java.util.List;
import java.util.ArrayList;

@SuppressWarnings("all")
public class proyectoParser extends Parser {
	public static final String[] tokenNames = new String[] {
		"<invalid>", "<EOR>", "<DOWN>", "<UP>", "CERRAR", "CREAR", "FECHA", "FIN", 
		"ID", "IDENTIFICADOR", "INICIO", "NUMERO", "REFERENCIA", "TABLA", "TEXTO", 
		"USAR", "WS"
	};
	public static final int EOF=-1;
	public static final int CERRAR=4;
	public static final int CREAR=5;
	public static final int FECHA=6;
	public static final int FIN=7;
	public static final int ID=8;
	public static final int IDENTIFICADOR=9;
	public static final int INICIO=10;
	public static final int NUMERO=11;
	public static final int REFERENCIA=12;
	public static final int TABLA=13;
	public static final int TEXTO=14;
	public static final int USAR=15;
	public static final int WS=16;

	// delegates
	public Parser[] getDelegates() {
		return new Parser[] {};
	}

	// delegators


	public proyectoParser(TokenStream input) {
		this(input, new RecognizerSharedState());
	}
	public proyectoParser(TokenStream input, RecognizerSharedState state) {
		super(input, state);
	}

	@Override public String[] getTokenNames() { return proyectoParser.tokenNames; }
	@Override public String getGrammarFileName() { return "proyecto.g"; }

	   
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



	// $ANTLR start "inicio"
	// proyecto.g:80:1: inicio : creacion usar ( tabla )+ cerrar ;
	public final void inicio() throws RecognitionException {
		try {
			// proyecto.g:80:7: ( creacion usar ( tabla )+ cerrar )
			// proyecto.g:80:9: creacion usar ( tabla )+ cerrar
			{
			pushFollow(FOLLOW_creacion_in_inicio21);
			creacion();
			state._fsp--;

			pushFollow(FOLLOW_usar_in_inicio23);
			usar();
			state._fsp--;

			// proyecto.g:80:23: ( tabla )+
			int cnt1=0;
			loop1:
			while (true) {
				int alt1=2;
				int LA1_0 = input.LA(1);
				if ( (LA1_0==TABLA) ) {
					alt1=1;
				}

				switch (alt1) {
				case 1 :
					// proyecto.g:80:23: tabla
					{
					pushFollow(FOLLOW_tabla_in_inicio25);
					tabla();
					state._fsp--;

					}
					break;

				default :
					if ( cnt1 >= 1 ) break loop1;
					EarlyExitException eee = new EarlyExitException(1, input);
					throw eee;
				}
				cnt1++;
			}

			pushFollow(FOLLOW_cerrar_in_inicio28);
			cerrar();
			state._fsp--;

			}

		}
		catch (RecognitionException re) {
			reportError(re);
			recover(input,re);
		}
		finally {
			// do for sure before leaving
		}
	}
	// $ANTLR end "inicio"



	// $ANTLR start "creacion"
	// proyecto.g:82:1: creacion : CREAR ID ;
	public final void creacion() throws RecognitionException {
		Token ID1=null;

		try {
			// proyecto.g:82:9: ( CREAR ID )
			// proyecto.g:83:2: CREAR ID
			{
			match(input,CREAR,FOLLOW_CREAR_in_creacion36); 
			ID1=(Token)match(input,ID,FOLLOW_ID_in_creacion38); 

			        nombreBD = (ID1!=null?ID1.getText():null);
			        sql.append("CREATE DATABASE ").append((ID1!=null?ID1.getText():null)).append(";\n");
			      
			}

		}
		catch (RecognitionException re) {
			reportError(re);
			recover(input,re);
		}
		finally {
			// do for sure before leaving
		}
	}
	// $ANTLR end "creacion"



	// $ANTLR start "usar"
	// proyecto.g:88:1: usar : USAR ID ;
	public final void usar() throws RecognitionException {
		Token ID2=null;

		try {
			// proyecto.g:88:5: ( USAR ID )
			// proyecto.g:89:2: USAR ID
			{
			match(input,USAR,FOLLOW_USAR_in_usar48); 
			ID2=(Token)match(input,ID,FOLLOW_ID_in_usar50); 

			        sql.append("USE ").append((ID2!=null?ID2.getText():null)).append(";\n");
			      
			}

		}
		catch (RecognitionException re) {
			reportError(re);
			recover(input,re);
		}
		finally {
			// do for sure before leaving
		}
	}
	// $ANTLR end "usar"



	// $ANTLR start "tabla"
	// proyecto.g:93:1: tabla : TABLA ID INICIO ( campo )+ FIN ;
	public final void tabla() throws RecognitionException {
		Token ID3=null;

		try {
			// proyecto.g:93:6: ( TABLA ID INICIO ( campo )+ FIN )
			// proyecto.g:94:2: TABLA ID INICIO ( campo )+ FIN
			{
			match(input,TABLA,FOLLOW_TABLA_in_tabla60); 
			ID3=(Token)match(input,ID,FOLLOW_ID_in_tabla62); 
			match(input,INICIO,FOLLOW_INICIO_in_tabla64); 
			 
			        if (tablaExiste((ID3!=null?ID3.getText():null))) {
			            errores.append("Línea ")
			                   .append(ID3.getLine())
			                   .append(": la tabla '")
			                   .append((ID3!=null?ID3.getText():null))
			                   .append("' ya existe\n");
			        } else {
			            Tabla t = new Tabla();
			            t.nombre = (ID3!=null?ID3.getText():null);
			            tablas.add(t);
			            tablaActual = t;

			            camposSQL.clear();
			            foreignKeysSQL.clear();
			        }
			      
			// proyecto.g:110:9: ( campo )+
			int cnt2=0;
			loop2:
			while (true) {
				int alt2=2;
				int LA2_0 = input.LA(1);
				if ( (LA2_0==FECHA||(LA2_0 >= ID && LA2_0 <= IDENTIFICADOR)||LA2_0==NUMERO||LA2_0==TEXTO) ) {
					alt2=1;
				}

				switch (alt2) {
				case 1 :
					// proyecto.g:110:9: campo
					{
					pushFollow(FOLLOW_campo_in_tabla68);
					campo();
					state._fsp--;

					}
					break;

				default :
					if ( cnt2 >= 1 ) break loop2;
					EarlyExitException eee = new EarlyExitException(2, input);
					throw eee;
				}
				cnt2++;
			}

			match(input,FIN,FOLLOW_FIN_in_tabla71); 

			        sql.append("CREATE TABLE ").append((ID3!=null?ID3.getText():null)).append("\n");
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
			      
			}

		}
		catch (RecognitionException re) {
			reportError(re);
			recover(input,re);
		}
		finally {
			// do for sure before leaving
		}
	}
	// $ANTLR end "tabla"



	// $ANTLR start "campo"
	// proyecto.g:142:1: campo : (id1= ( ID | FECHA | NUMERO | TEXTO | IDENTIFICADOR ) t= ( NUMERO | TEXTO | FECHA | IDENTIFICADOR ) |id1= ID REFERENCIA id2= ID );
	public final void campo() throws RecognitionException {
		Token id1=null;
		Token t=null;
		Token id2=null;

		try {
			// proyecto.g:142:6: (id1= ( ID | FECHA | NUMERO | TEXTO | IDENTIFICADOR ) t= ( NUMERO | TEXTO | FECHA | IDENTIFICADOR ) |id1= ID REFERENCIA id2= ID )
			int alt3=2;
			int LA3_0 = input.LA(1);
			if ( (LA3_0==ID) ) {
				int LA3_1 = input.LA(2);
				if ( (LA3_1==FECHA||LA3_1==IDENTIFICADOR||LA3_1==NUMERO||LA3_1==TEXTO) ) {
					alt3=1;
				}
				else if ( (LA3_1==REFERENCIA) ) {
					alt3=2;
				}

				else {
					int nvaeMark = input.mark();
					try {
						input.consume();
						NoViableAltException nvae =
							new NoViableAltException("", 3, 1, input);
						throw nvae;
					} finally {
						input.rewind(nvaeMark);
					}
				}

			}
			else if ( (LA3_0==FECHA||LA3_0==IDENTIFICADOR||LA3_0==NUMERO||LA3_0==TEXTO) ) {
				alt3=1;
			}

			else {
				NoViableAltException nvae =
					new NoViableAltException("", 3, 0, input);
				throw nvae;
			}

			switch (alt3) {
				case 1 :
					// proyecto.g:143:2: id1= ( ID | FECHA | NUMERO | TEXTO | IDENTIFICADOR ) t= ( NUMERO | TEXTO | FECHA | IDENTIFICADOR )
					{
					id1=input.LT(1);
					if ( input.LA(1)==FECHA||(input.LA(1) >= ID && input.LA(1) <= IDENTIFICADOR)||input.LA(1)==NUMERO||input.LA(1)==TEXTO ) {
						input.consume();
						state.errorRecovery=false;
					}
					else {
						MismatchedSetException mse = new MismatchedSetException(null,input);
						throw mse;
					}
					t=input.LT(1);
					if ( input.LA(1)==FECHA||input.LA(1)==IDENTIFICADOR||input.LA(1)==NUMERO||input.LA(1)==TEXTO ) {
						input.consume();
						state.errorRecovery=false;
					}
					else {
						MismatchedSetException mse = new MismatchedSetException(null,input);
						throw mse;
					}

					        if (campoExiste((id1!=null?id1.getText():null))) {
					            errores.append("Línea ")
					                   .append(id1.getLine())
					                   .append(": el campo '")
					                   .append((id1!=null?id1.getText():null))
					                   .append("' ya existe en la tabla\n");
					        } else {
					            if(((t!=null?t.getText():null)).compareTo("palabras")==0) 
					                camposSQL.add("   " + (id1!=null?id1.getText():null) + " VARCHAR(300)");
					            else if(((t!=null?t.getText():null)).compareTo("fecha")==0)
					                camposSQL.add("   " + (id1!=null?id1.getText():null) + " DATE"); 
					            else if(((t!=null?t.getText():null)).compareTo("cantidad")==0)
					                camposSQL.add("   " + (id1!=null?id1.getText():null) + " INTEGER");
					            else if(((t!=null?t.getText():null)).compareTo("id")==0)
					                camposSQL.add("   " + (id1!=null?id1.getText():null) + " INTEGER PRIMARY KEY AUTOINCREMENT");

					            Atributo a = new Atributo();
					            a.nombreAtributo = (id1!=null?id1.getText():null);
					            a.tipoAtributo = (t!=null?t.getText():null);
					            a.tablaReferencia = "";
					            tablaActual.atributos.add(a);
					        }
					      
					}
					break;
				case 2 :
					// proyecto.g:172:4: id1= ID REFERENCIA id2= ID
					{
					id1=(Token)match(input,ID,FOLLOW_ID_in_campo145); 
					match(input,REFERENCIA,FOLLOW_REFERENCIA_in_campo147); 
					id2=(Token)match(input,ID,FOLLOW_ID_in_campo153); 

					        if (!existeTabla((id2!=null?id2.getText():null))) {
					            errores.append("Línea ")
					                   .append(id2.getLine())
					                   .append(": la tabla '")
					                   .append((id2!=null?id2.getText():null))
					                   .append("' no existe\n");
					        } else {
					            camposSQL.add("   " + (id1!=null?id1.getText():null) + " INTEGER");

					            foreignKeysSQL.add("   FOREIGN KEY (" + (id1!=null?id1.getText():null) + ") REFERENCES " + (id2!=null?id2.getText():null) + "(" + obtenerPK((id2!=null?id2.getText():null)) + ")");

					            Atributo a = new Atributo();
					            a.nombreAtributo = (id1!=null?id1.getText():null);
					            a.tipoAtributo = "conecta";
					            a.tablaReferencia = (id2!=null?id2.getText():null);
					            tablaActual.atributos.add(a);
					        }
					      
					}
					break;

			}
		}
		catch (RecognitionException re) {
			reportError(re);
			recover(input,re);
		}
		finally {
			// do for sure before leaving
		}
	}
	// $ANTLR end "campo"



	// $ANTLR start "cerrar"
	// proyecto.g:192:1: cerrar : CERRAR ;
	public final void cerrar() throws RecognitionException {
		try {
			// proyecto.g:192:7: ( CERRAR )
			// proyecto.g:193:2: CERRAR
			{
			match(input,CERRAR,FOLLOW_CERRAR_in_cerrar163); 

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
			      
			}

		}
		catch (RecognitionException re) {
			reportError(re);
			recover(input,re);
		}
		finally {
			// do for sure before leaving
		}
	}
	// $ANTLR end "cerrar"

	// Delegated rules



	public static final BitSet FOLLOW_creacion_in_inicio21 = new BitSet(new long[]{0x0000000000008000L});
	public static final BitSet FOLLOW_usar_in_inicio23 = new BitSet(new long[]{0x0000000000002000L});
	public static final BitSet FOLLOW_tabla_in_inicio25 = new BitSet(new long[]{0x0000000000002010L});
	public static final BitSet FOLLOW_cerrar_in_inicio28 = new BitSet(new long[]{0x0000000000000002L});
	public static final BitSet FOLLOW_CREAR_in_creacion36 = new BitSet(new long[]{0x0000000000000100L});
	public static final BitSet FOLLOW_ID_in_creacion38 = new BitSet(new long[]{0x0000000000000002L});
	public static final BitSet FOLLOW_USAR_in_usar48 = new BitSet(new long[]{0x0000000000000100L});
	public static final BitSet FOLLOW_ID_in_usar50 = new BitSet(new long[]{0x0000000000000002L});
	public static final BitSet FOLLOW_TABLA_in_tabla60 = new BitSet(new long[]{0x0000000000000100L});
	public static final BitSet FOLLOW_ID_in_tabla62 = new BitSet(new long[]{0x0000000000000400L});
	public static final BitSet FOLLOW_INICIO_in_tabla64 = new BitSet(new long[]{0x0000000000004B40L});
	public static final BitSet FOLLOW_campo_in_tabla68 = new BitSet(new long[]{0x0000000000004BC0L});
	public static final BitSet FOLLOW_FIN_in_tabla71 = new BitSet(new long[]{0x0000000000000002L});
	public static final BitSet FOLLOW_set_in_campo85 = new BitSet(new long[]{0x0000000000004A40L});
	public static final BitSet FOLLOW_set_in_campo109 = new BitSet(new long[]{0x0000000000000002L});
	public static final BitSet FOLLOW_ID_in_campo145 = new BitSet(new long[]{0x0000000000001000L});
	public static final BitSet FOLLOW_REFERENCIA_in_campo147 = new BitSet(new long[]{0x0000000000000100L});
	public static final BitSet FOLLOW_ID_in_campo153 = new BitSet(new long[]{0x0000000000000002L});
	public static final BitSet FOLLOW_CERRAR_in_cerrar163 = new BitSet(new long[]{0x0000000000000002L});
}
