// Generated from c:/Users/enriq/OneDrive/Desktop/Tec/8vo Semestre/compiladoru2/grammar/proyecto.g by ANTLR 4.13.1

import java.util.ArrayList;
import java.util.List;

import org.antlr.v4.runtime.atn.*;
import org.antlr.v4.runtime.dfa.DFA;
import org.antlr.v4.runtime.*;
import org.antlr.v4.runtime.misc.*;
import org.antlr.v4.runtime.tree.*;
import java.util.List;
import java.util.Iterator;
import java.util.ArrayList;

@SuppressWarnings({"all", "warnings", "unchecked", "unused", "cast", "CheckReturnValue"})
public class proyectoParser extends Parser {
	static { RuntimeMetaData.checkVersion("4.13.1", RuntimeMetaData.VERSION); }

	protected static final DFA[] _decisionToDFA;
	protected static final PredictionContextCache _sharedContextCache =
		new PredictionContextCache();
	public static final int
		CERRAR=1, NUMERO=2, TEXTO=3, FECHA=4, IDENTIFICADOR=5, REFERENCIA=6, TABLA=7, 
		INICIO=8, FIN=9, USAR=10, CREAR=11, ID=12, WS=13;
	public static final int
		RULE_inicio = 0, RULE_creacion = 1, RULE_usar = 2, RULE_tabla = 3, RULE_campo = 4, 
		RULE_cerrar = 5;
	private static String[] makeRuleNames() {
		return new String[] {
			"inicio", "creacion", "usar", "tabla", "campo", "cerrar"
		};
	}
	public static final String[] ruleNames = makeRuleNames();

	private static String[] makeLiteralNames() {
		return new String[] {
			null, "'cerrar'", "'numero'", "'texto'", "'fecha'", "'identificador'", 
			"'referencia'", "'tabla'", "'inicio'", "'fin'", "'usar'", "'crear'"
		};
	}
	private static final String[] _LITERAL_NAMES = makeLiteralNames();
	private static String[] makeSymbolicNames() {
		return new String[] {
			null, "CERRAR", "NUMERO", "TEXTO", "FECHA", "IDENTIFICADOR", "REFERENCIA", 
			"TABLA", "INICIO", "FIN", "USAR", "CREAR", "ID", "WS"
		};
	}
	private static final String[] _SYMBOLIC_NAMES = makeSymbolicNames();
	public static final Vocabulary VOCABULARY = new VocabularyImpl(_LITERAL_NAMES, _SYMBOLIC_NAMES);

	/**
	 * @deprecated Use {@link #VOCABULARY} instead.
	 */
	@Deprecated
	public static final String[] tokenNames;
	static {
		tokenNames = new String[_SYMBOLIC_NAMES.length];
		for (int i = 0; i < tokenNames.length; i++) {
			tokenNames[i] = VOCABULARY.getLiteralName(i);
			if (tokenNames[i] == null) {
				tokenNames[i] = VOCABULARY.getSymbolicName(i);
			}

			if (tokenNames[i] == null) {
				tokenNames[i] = "<INVALID>";
			}
		}
	}

	@Override
	@Deprecated
	public String[] getTokenNames() {
		return tokenNames;
	}

	@Override

	public Vocabulary getVocabulary() {
		return VOCABULARY;
	}

	@Override
	public String getGrammarFileName() { return "proyecto.g"; }

	@Override
	public String[] getRuleNames() { return ruleNames; }

	@Override
	public String getSerializedATN() { return _serializedATN; }

	@Override
	public ATN getATN() { return _ATN; }

	   
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

	public proyectoParser(TokenStream input) {
		super(input);
		_interp = new ParserATNSimulator(this,_ATN,_decisionToDFA,_sharedContextCache);
	}

	@SuppressWarnings("CheckReturnValue")
	public static class InicioContext extends ParserRuleContext {
		public CreacionContext creacion() {
			return getRuleContext(CreacionContext.class,0);
		}
		public UsarContext usar() {
			return getRuleContext(UsarContext.class,0);
		}
		public CerrarContext cerrar() {
			return getRuleContext(CerrarContext.class,0);
		}
		public List<TablaContext> tabla() {
			return getRuleContexts(TablaContext.class);
		}
		public TablaContext tabla(int i) {
			return getRuleContext(TablaContext.class,i);
		}
		public InicioContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_inicio; }
	}

	public final InicioContext inicio() throws RecognitionException {
		InicioContext _localctx = new InicioContext(_ctx, getState());
		enterRule(_localctx, 0, RULE_inicio);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(12);
			creacion();
			setState(13);
			usar();
			setState(15); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				{
				setState(14);
				tabla();
				}
				}
				setState(17); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( _la==TABLA );
			setState(19);
			cerrar();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class CreacionContext extends ParserRuleContext {
		public TerminalNode CREAR() { return getToken(proyectoParser.CREAR, 0); }
		public TerminalNode ID() { return getToken(proyectoParser.ID, 0); }
		public CreacionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_creacion; }
	}

	public final CreacionContext creacion() throws RecognitionException {
		CreacionContext _localctx = new CreacionContext(_ctx, getState());
		enterRule(_localctx, 2, RULE_creacion);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(21);
			match(CREAR);
			setState(22);
			match(ID);

			        nombreBD = (((CreacionContext)_localctx).ID!=null?((CreacionContext)_localctx).ID.getText():null);
			        sql.append("CREATE DATABASE ").append((((CreacionContext)_localctx).ID!=null?((CreacionContext)_localctx).ID.getText():null)).append(";\n");
			      
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class UsarContext extends ParserRuleContext {
		public TerminalNode USAR() { return getToken(proyectoParser.USAR, 0); }
		public TerminalNode ID() { return getToken(proyectoParser.ID, 0); }
		public UsarContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_usar; }
	}

	public final UsarContext usar() throws RecognitionException {
		UsarContext _localctx = new UsarContext(_ctx, getState());
		enterRule(_localctx, 4, RULE_usar);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(25);
			match(USAR);
			setState(26);
			match(ID);

			        sql.append("USE ").append((((UsarContext)_localctx).ID!=null?((UsarContext)_localctx).ID.getText():null)).append(";\n");
			      
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class TablaContext extends ParserRuleContext {
		public TerminalNode TABLA() { return getToken(proyectoParser.TABLA, 0); }
		public TerminalNode ID() { return getToken(proyectoParser.ID, 0); }
		public TerminalNode INICIO() { return getToken(proyectoParser.INICIO, 0); }
		public TerminalNode FIN() { return getToken(proyectoParser.FIN, 0); }
		public List<CampoContext> campo() {
			return getRuleContexts(CampoContext.class);
		}
		public CampoContext campo(int i) {
			return getRuleContext(CampoContext.class,i);
		}
		public TablaContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_tabla; }
	}

	public final TablaContext tabla() throws RecognitionException {
		TablaContext _localctx = new TablaContext(_ctx, getState());
		enterRule(_localctx, 6, RULE_tabla);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(29);
			match(TABLA);
			setState(30);
			match(ID);
			setState(31);
			match(INICIO);
			 
			        Tabla t = new Tabla();
			        t.nombre = (((TablaContext)_localctx).ID!=null?((TablaContext)_localctx).ID.getText():null);
			        tablas.add(t);
			        tablaActual = t;

			        camposSQL.clear();
			      
			setState(34); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				{
				setState(33);
				campo();
				}
				}
				setState(36); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( _la==ID );
			setState(38);
			match(FIN);

			        sql.append("CREATE TABLE ").append((((TablaContext)_localctx).ID!=null?((TablaContext)_localctx).ID.getText():null)).append("\n");
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
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class CampoContext extends ParserRuleContext {
		public Token id1;
		public Token t;
		public Token id2;
		public List<TerminalNode> ID() { return getTokens(proyectoParser.ID); }
		public TerminalNode ID(int i) {
			return getToken(proyectoParser.ID, i);
		}
		public TerminalNode NUMERO() { return getToken(proyectoParser.NUMERO, 0); }
		public TerminalNode TEXTO() { return getToken(proyectoParser.TEXTO, 0); }
		public TerminalNode FECHA() { return getToken(proyectoParser.FECHA, 0); }
		public TerminalNode IDENTIFICADOR() { return getToken(proyectoParser.IDENTIFICADOR, 0); }
		public TerminalNode REFERENCIA() { return getToken(proyectoParser.REFERENCIA, 0); }
		public CampoContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_campo; }
	}

	public final CampoContext campo() throws RecognitionException {
		CampoContext _localctx = new CampoContext(_ctx, getState());
		enterRule(_localctx, 8, RULE_campo);
		int _la;
		try {
			setState(48);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,2,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(41);
				((CampoContext)_localctx).id1 = match(ID);
				setState(42);
				((CampoContext)_localctx).t = _input.LT(1);
				_la = _input.LA(1);
				if ( !((((_la) & ~0x3f) == 0 && ((1L << _la) & 60L) != 0)) ) {
					((CampoContext)_localctx).t = (Token)_errHandler.recoverInline(this);
				}
				else {
					if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
					_errHandler.reportMatch(this);
					consume();
				}

				          if(((((CampoContext)_localctx).t!=null?((CampoContext)_localctx).t.getText():null)).compareTo("texto")==0) 
				              camposSQL.add("   " + (((CampoContext)_localctx).id1!=null?((CampoContext)_localctx).id1.getText():null) + " VARCHAR(300)");
				          else if(((((CampoContext)_localctx).t!=null?((CampoContext)_localctx).t.getText():null)).compareTo("fecha")==0)
				              camposSQL.add("   " + (((CampoContext)_localctx).id1!=null?((CampoContext)_localctx).id1.getText():null) + " DATE"); 
				          else if(((((CampoContext)_localctx).t!=null?((CampoContext)_localctx).t.getText():null)).compareTo("numero")==0)
				              camposSQL.add("   " + (((CampoContext)_localctx).id1!=null?((CampoContext)_localctx).id1.getText():null) + " INTEGER");
				          else if(((((CampoContext)_localctx).t!=null?((CampoContext)_localctx).t.getText():null)).compareTo("identificador")==0)
				              camposSQL.add("   " + (((CampoContext)_localctx).id1!=null?((CampoContext)_localctx).id1.getText():null) + " INTEGER PRIMARY KEY AUTOINCREMENT");

				          Atributo a = new Atributo();
				          a.nombreAtributo = (((CampoContext)_localctx).id1!=null?((CampoContext)_localctx).id1.getText():null);
				          a.tipoAtributo = (((CampoContext)_localctx).t!=null?((CampoContext)_localctx).t.getText():null);
				          a.tablaReferencia = "";
				          tablaActual.atributos.add(a);
				      
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(44);
				((CampoContext)_localctx).id1 = match(ID);
				setState(45);
				match(REFERENCIA);
				setState(46);
				((CampoContext)_localctx).id2 = match(ID);

				          camposSQL.add("   " + (((CampoContext)_localctx).id1!=null?((CampoContext)_localctx).id1.getText():null) + " INTEGER");
				          camposSQL.add("   FOREIGN KEY (" + (((CampoContext)_localctx).id1!=null?((CampoContext)_localctx).id1.getText():null) + ") REFERENCES " + (((CampoContext)_localctx).id2!=null?((CampoContext)_localctx).id2.getText():null) + "(" + obtenerPK((((CampoContext)_localctx).id2!=null?((CampoContext)_localctx).id2.getText():null)) + ")");

				          Atributo a = new Atributo();
				          a.nombreAtributo = (((CampoContext)_localctx).id1!=null?((CampoContext)_localctx).id1.getText():null);
				          a.tipoAtributo = "referencia";
				          a.tablaReferencia = (((CampoContext)_localctx).id2!=null?((CampoContext)_localctx).id2.getText():null);
				          tablaActual.atributos.add(a);
				      
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class CerrarContext extends ParserRuleContext {
		public TerminalNode CERRAR() { return getToken(proyectoParser.CERRAR, 0); }
		public CerrarContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_cerrar; }
	}

	public final CerrarContext cerrar() throws RecognitionException {
		CerrarContext _localctx = new CerrarContext(_ctx, getState());
		enterRule(_localctx, 10, RULE_cerrar);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(50);
			match(CERRAR);

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
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static final String _serializedATN =
		"\u0004\u0001\r6\u0002\u0000\u0007\u0000\u0002\u0001\u0007\u0001\u0002"+
		"\u0002\u0007\u0002\u0002\u0003\u0007\u0003\u0002\u0004\u0007\u0004\u0002"+
		"\u0005\u0007\u0005\u0001\u0000\u0001\u0000\u0001\u0000\u0004\u0000\u0010"+
		"\b\u0000\u000b\u0000\f\u0000\u0011\u0001\u0000\u0001\u0000\u0001\u0001"+
		"\u0001\u0001\u0001\u0001\u0001\u0001\u0001\u0002\u0001\u0002\u0001\u0002"+
		"\u0001\u0002\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003"+
		"\u0004\u0003#\b\u0003\u000b\u0003\f\u0003$\u0001\u0003\u0001\u0003\u0001"+
		"\u0003\u0001\u0004\u0001\u0004\u0001\u0004\u0001\u0004\u0001\u0004\u0001"+
		"\u0004\u0001\u0004\u0003\u00041\b\u0004\u0001\u0005\u0001\u0005\u0001"+
		"\u0005\u0001\u0005\u0000\u0000\u0006\u0000\u0002\u0004\u0006\b\n\u0000"+
		"\u0001\u0001\u0000\u0002\u00052\u0000\f\u0001\u0000\u0000\u0000\u0002"+
		"\u0015\u0001\u0000\u0000\u0000\u0004\u0019\u0001\u0000\u0000\u0000\u0006"+
		"\u001d\u0001\u0000\u0000\u0000\b0\u0001\u0000\u0000\u0000\n2\u0001\u0000"+
		"\u0000\u0000\f\r\u0003\u0002\u0001\u0000\r\u000f\u0003\u0004\u0002\u0000"+
		"\u000e\u0010\u0003\u0006\u0003\u0000\u000f\u000e\u0001\u0000\u0000\u0000"+
		"\u0010\u0011\u0001\u0000\u0000\u0000\u0011\u000f\u0001\u0000\u0000\u0000"+
		"\u0011\u0012\u0001\u0000\u0000\u0000\u0012\u0013\u0001\u0000\u0000\u0000"+
		"\u0013\u0014\u0003\n\u0005\u0000\u0014\u0001\u0001\u0000\u0000\u0000\u0015"+
		"\u0016\u0005\u000b\u0000\u0000\u0016\u0017\u0005\f\u0000\u0000\u0017\u0018"+
		"\u0006\u0001\uffff\uffff\u0000\u0018\u0003\u0001\u0000\u0000\u0000\u0019"+
		"\u001a\u0005\n\u0000\u0000\u001a\u001b\u0005\f\u0000\u0000\u001b\u001c"+
		"\u0006\u0002\uffff\uffff\u0000\u001c\u0005\u0001\u0000\u0000\u0000\u001d"+
		"\u001e\u0005\u0007\u0000\u0000\u001e\u001f\u0005\f\u0000\u0000\u001f "+
		"\u0005\b\u0000\u0000 \"\u0006\u0003\uffff\uffff\u0000!#\u0003\b\u0004"+
		"\u0000\"!\u0001\u0000\u0000\u0000#$\u0001\u0000\u0000\u0000$\"\u0001\u0000"+
		"\u0000\u0000$%\u0001\u0000\u0000\u0000%&\u0001\u0000\u0000\u0000&\'\u0005"+
		"\t\u0000\u0000\'(\u0006\u0003\uffff\uffff\u0000(\u0007\u0001\u0000\u0000"+
		"\u0000)*\u0005\f\u0000\u0000*+\u0007\u0000\u0000\u0000+1\u0006\u0004\uffff"+
		"\uffff\u0000,-\u0005\f\u0000\u0000-.\u0005\u0006\u0000\u0000./\u0005\f"+
		"\u0000\u0000/1\u0006\u0004\uffff\uffff\u00000)\u0001\u0000\u0000\u0000"+
		"0,\u0001\u0000\u0000\u00001\t\u0001\u0000\u0000\u000023\u0005\u0001\u0000"+
		"\u000034\u0006\u0005\uffff\uffff\u00004\u000b\u0001\u0000\u0000\u0000"+
		"\u0003\u0011$0";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}