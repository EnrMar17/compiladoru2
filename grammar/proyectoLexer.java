// $ANTLR 3.5.2 proyecto.g 2026-04-16 00:47:11

import org.antlr.runtime.*;
import java.util.Stack;
import java.util.List;
import java.util.ArrayList;

@SuppressWarnings("all")
public class proyectoLexer extends Lexer {
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
	// delegators
	public Lexer[] getDelegates() {
		return new Lexer[] {};
	}

	public proyectoLexer() {} 
	public proyectoLexer(CharStream input) {
		this(input, new RecognizerSharedState());
	}
	public proyectoLexer(CharStream input, RecognizerSharedState state) {
		super(input,state);
	}
	@Override public String getGrammarFileName() { return "proyecto.g"; }

	// $ANTLR start "CERRAR"
	public final void mCERRAR() throws RecognitionException {
		try {
			int _type = CERRAR;
			int _channel = DEFAULT_TOKEN_CHANNEL;
			// proyecto.g:290:7: ( 'fin' )
			// proyecto.g:290:9: 'fin'
			{
			match("fin"); 

			}

			state.type = _type;
			state.channel = _channel;
		}
		finally {
			// do for sure before leaving
		}
	}
	// $ANTLR end "CERRAR"

	// $ANTLR start "NUMERO"
	public final void mNUMERO() throws RecognitionException {
		try {
			int _type = NUMERO;
			int _channel = DEFAULT_TOKEN_CHANNEL;
			// proyecto.g:291:7: ( 'cantidad' )
			// proyecto.g:291:9: 'cantidad'
			{
			match("cantidad"); 

			}

			state.type = _type;
			state.channel = _channel;
		}
		finally {
			// do for sure before leaving
		}
	}
	// $ANTLR end "NUMERO"

	// $ANTLR start "TEXTO"
	public final void mTEXTO() throws RecognitionException {
		try {
			int _type = TEXTO;
			int _channel = DEFAULT_TOKEN_CHANNEL;
			// proyecto.g:292:6: ( 'palabras' )
			// proyecto.g:292:8: 'palabras'
			{
			match("palabras"); 

			}

			state.type = _type;
			state.channel = _channel;
		}
		finally {
			// do for sure before leaving
		}
	}
	// $ANTLR end "TEXTO"

	// $ANTLR start "FECHA"
	public final void mFECHA() throws RecognitionException {
		try {
			int _type = FECHA;
			int _channel = DEFAULT_TOKEN_CHANNEL;
			// proyecto.g:293:6: ( 'fecha' )
			// proyecto.g:293:8: 'fecha'
			{
			match("fecha"); 

			}

			state.type = _type;
			state.channel = _channel;
		}
		finally {
			// do for sure before leaving
		}
	}
	// $ANTLR end "FECHA"

	// $ANTLR start "IDENTIFICADOR"
	public final void mIDENTIFICADOR() throws RecognitionException {
		try {
			int _type = IDENTIFICADOR;
			int _channel = DEFAULT_TOKEN_CHANNEL;
			// proyecto.g:294:14: ( 'id' )
			// proyecto.g:294:16: 'id'
			{
			match("id"); 

			}

			state.type = _type;
			state.channel = _channel;
		}
		finally {
			// do for sure before leaving
		}
	}
	// $ANTLR end "IDENTIFICADOR"

	// $ANTLR start "REFERENCIA"
	public final void mREFERENCIA() throws RecognitionException {
		try {
			int _type = REFERENCIA;
			int _channel = DEFAULT_TOKEN_CHANNEL;
			// proyecto.g:295:11: ( 'conecta' )
			// proyecto.g:295:13: 'conecta'
			{
			match("conecta"); 

			}

			state.type = _type;
			state.channel = _channel;
		}
		finally {
			// do for sure before leaving
		}
	}
	// $ANTLR end "REFERENCIA"

	// $ANTLR start "TABLA"
	public final void mTABLA() throws RecognitionException {
		try {
			int _type = TABLA;
			int _channel = DEFAULT_TOKEN_CHANNEL;
			// proyecto.g:296:6: ( 'lista' )
			// proyecto.g:296:8: 'lista'
			{
			match("lista"); 

			}

			state.type = _type;
			state.channel = _channel;
		}
		finally {
			// do for sure before leaving
		}
	}
	// $ANTLR end "TABLA"

	// $ANTLR start "INICIO"
	public final void mINICIO() throws RecognitionException {
		try {
			int _type = INICIO;
			int _channel = DEFAULT_TOKEN_CHANNEL;
			// proyecto.g:297:7: ( 'empieza' )
			// proyecto.g:297:9: 'empieza'
			{
			match("empieza"); 

			}

			state.type = _type;
			state.channel = _channel;
		}
		finally {
			// do for sure before leaving
		}
	}
	// $ANTLR end "INICIO"

	// $ANTLR start "FIN"
	public final void mFIN() throws RecognitionException {
		try {
			int _type = FIN;
			int _channel = DEFAULT_TOKEN_CHANNEL;
			// proyecto.g:298:4: ( 'termina' )
			// proyecto.g:298:6: 'termina'
			{
			match("termina"); 

			}

			state.type = _type;
			state.channel = _channel;
		}
		finally {
			// do for sure before leaving
		}
	}
	// $ANTLR end "FIN"

	// $ANTLR start "USAR"
	public final void mUSAR() throws RecognitionException {
		try {
			int _type = USAR;
			int _channel = DEFAULT_TOKEN_CHANNEL;
			// proyecto.g:299:5: ( 'usar' )
			// proyecto.g:299:7: 'usar'
			{
			match("usar"); 

			}

			state.type = _type;
			state.channel = _channel;
		}
		finally {
			// do for sure before leaving
		}
	}
	// $ANTLR end "USAR"

	// $ANTLR start "CREAR"
	public final void mCREAR() throws RecognitionException {
		try {
			int _type = CREAR;
			int _channel = DEFAULT_TOKEN_CHANNEL;
			// proyecto.g:300:6: ( 'crear' )
			// proyecto.g:300:8: 'crear'
			{
			match("crear"); 

			}

			state.type = _type;
			state.channel = _channel;
		}
		finally {
			// do for sure before leaving
		}
	}
	// $ANTLR end "CREAR"

	// $ANTLR start "ID"
	public final void mID() throws RecognitionException {
		try {
			int _type = ID;
			int _channel = DEFAULT_TOKEN_CHANNEL;
			// proyecto.g:302:3: ( ( 'a' .. 'z' | 'A' .. 'Z' | '_' ) ( 'a' .. 'z' | 'A' .. 'Z' | '0' .. '9' | '_' )* )
			// proyecto.g:302:5: ( 'a' .. 'z' | 'A' .. 'Z' | '_' ) ( 'a' .. 'z' | 'A' .. 'Z' | '0' .. '9' | '_' )*
			{
			if ( (input.LA(1) >= 'A' && input.LA(1) <= 'Z')||input.LA(1)=='_'||(input.LA(1) >= 'a' && input.LA(1) <= 'z') ) {
				input.consume();
			}
			else {
				MismatchedSetException mse = new MismatchedSetException(null,input);
				recover(mse);
				throw mse;
			}
			// proyecto.g:302:35: ( 'a' .. 'z' | 'A' .. 'Z' | '0' .. '9' | '_' )*
			loop1:
			while (true) {
				int alt1=2;
				int LA1_0 = input.LA(1);
				if ( ((LA1_0 >= '0' && LA1_0 <= '9')||(LA1_0 >= 'A' && LA1_0 <= 'Z')||LA1_0=='_'||(LA1_0 >= 'a' && LA1_0 <= 'z')) ) {
					alt1=1;
				}

				switch (alt1) {
				case 1 :
					// proyecto.g:
					{
					if ( (input.LA(1) >= '0' && input.LA(1) <= '9')||(input.LA(1) >= 'A' && input.LA(1) <= 'Z')||input.LA(1)=='_'||(input.LA(1) >= 'a' && input.LA(1) <= 'z') ) {
						input.consume();
					}
					else {
						MismatchedSetException mse = new MismatchedSetException(null,input);
						recover(mse);
						throw mse;
					}
					}
					break;

				default :
					break loop1;
				}
			}

			}

			state.type = _type;
			state.channel = _channel;
		}
		finally {
			// do for sure before leaving
		}
	}
	// $ANTLR end "ID"

	// $ANTLR start "WS"
	public final void mWS() throws RecognitionException {
		try {
			int _type = WS;
			int _channel = DEFAULT_TOKEN_CHANNEL;
			// proyecto.g:309:3: ( ( ' ' | '\\n' | '\\t' | '\\r' )+ )
			// proyecto.g:309:5: ( ' ' | '\\n' | '\\t' | '\\r' )+
			{
			// proyecto.g:309:5: ( ' ' | '\\n' | '\\t' | '\\r' )+
			int cnt2=0;
			loop2:
			while (true) {
				int alt2=2;
				int LA2_0 = input.LA(1);
				if ( ((LA2_0 >= '\t' && LA2_0 <= '\n')||LA2_0=='\r'||LA2_0==' ') ) {
					alt2=1;
				}

				switch (alt2) {
				case 1 :
					// proyecto.g:
					{
					if ( (input.LA(1) >= '\t' && input.LA(1) <= '\n')||input.LA(1)=='\r'||input.LA(1)==' ' ) {
						input.consume();
					}
					else {
						MismatchedSetException mse = new MismatchedSetException(null,input);
						recover(mse);
						throw mse;
					}
					}
					break;

				default :
					if ( cnt2 >= 1 ) break loop2;
					EarlyExitException eee = new EarlyExitException(2, input);
					throw eee;
				}
				cnt2++;
			}

			_channel=HIDDEN; 
			}

			state.type = _type;
			state.channel = _channel;
		}
		finally {
			// do for sure before leaving
		}
	}
	// $ANTLR end "WS"

	@Override
	public void mTokens() throws RecognitionException {
		// proyecto.g:1:8: ( CERRAR | NUMERO | TEXTO | FECHA | IDENTIFICADOR | REFERENCIA | TABLA | INICIO | FIN | USAR | CREAR | ID | WS )
		int alt3=13;
		alt3 = dfa3.predict(input);
		switch (alt3) {
			case 1 :
				// proyecto.g:1:10: CERRAR
				{
				mCERRAR(); 

				}
				break;
			case 2 :
				// proyecto.g:1:17: NUMERO
				{
				mNUMERO(); 

				}
				break;
			case 3 :
				// proyecto.g:1:24: TEXTO
				{
				mTEXTO(); 

				}
				break;
			case 4 :
				// proyecto.g:1:30: FECHA
				{
				mFECHA(); 

				}
				break;
			case 5 :
				// proyecto.g:1:36: IDENTIFICADOR
				{
				mIDENTIFICADOR(); 

				}
				break;
			case 6 :
				// proyecto.g:1:50: REFERENCIA
				{
				mREFERENCIA(); 

				}
				break;
			case 7 :
				// proyecto.g:1:61: TABLA
				{
				mTABLA(); 

				}
				break;
			case 8 :
				// proyecto.g:1:67: INICIO
				{
				mINICIO(); 

				}
				break;
			case 9 :
				// proyecto.g:1:74: FIN
				{
				mFIN(); 

				}
				break;
			case 10 :
				// proyecto.g:1:78: USAR
				{
				mUSAR(); 

				}
				break;
			case 11 :
				// proyecto.g:1:83: CREAR
				{
				mCREAR(); 

				}
				break;
			case 12 :
				// proyecto.g:1:89: ID
				{
				mID(); 

				}
				break;
			case 13 :
				// proyecto.g:1:92: WS
				{
				mWS(); 

				}
				break;

		}
	}


	protected DFA3 dfa3 = new DFA3(this);
	static final String DFA3_eotS =
		"\1\uffff\10\11\2\uffff\6\11\1\34\4\11\1\41\5\11\1\uffff\4\11\1\uffff\10"+
		"\11\1\63\1\64\2\11\1\67\1\11\1\71\2\11\2\uffff\2\11\1\uffff\1\11\1\uffff"+
		"\3\11\1\102\1\11\1\104\1\105\1\106\1\uffff\1\107\4\uffff";
	static final String DFA3_eofS =
		"\110\uffff";
	static final String DFA3_minS =
		"\1\11\1\145\2\141\1\144\1\151\1\155\1\145\1\163\2\uffff\1\156\1\143\2"+
		"\156\1\145\1\154\1\60\1\163\1\160\1\162\1\141\1\60\1\150\1\164\1\145\2"+
		"\141\1\uffff\1\164\1\151\1\155\1\162\1\uffff\1\141\1\151\1\143\1\162\1"+
		"\142\1\141\1\145\1\151\2\60\1\144\1\164\1\60\1\162\1\60\1\172\1\156\2"+
		"\uffff\2\141\1\uffff\1\141\1\uffff\2\141\1\144\1\60\1\163\3\60\1\uffff"+
		"\1\60\4\uffff";
	static final String DFA3_maxS =
		"\1\172\1\151\1\162\1\141\1\144\1\151\1\155\1\145\1\163\2\uffff\1\156\1"+
		"\143\2\156\1\145\1\154\1\172\1\163\1\160\1\162\1\141\1\172\1\150\1\164"+
		"\1\145\2\141\1\uffff\1\164\1\151\1\155\1\162\1\uffff\1\141\1\151\1\143"+
		"\1\162\1\142\1\141\1\145\1\151\2\172\1\144\1\164\1\172\1\162\2\172\1\156"+
		"\2\uffff\2\141\1\uffff\1\141\1\uffff\2\141\1\144\1\172\1\163\3\172\1\uffff"+
		"\1\172\4\uffff";
	static final String DFA3_acceptS =
		"\11\uffff\1\14\1\15\21\uffff\1\5\4\uffff\1\1\21\uffff\1\12\1\4\2\uffff"+
		"\1\13\1\uffff\1\7\10\uffff\1\6\1\uffff\1\10\1\11\1\2\1\3";
	static final String DFA3_specialS =
		"\110\uffff}>";
	static final String[] DFA3_transitionS = {
			"\2\12\2\uffff\1\12\22\uffff\1\12\40\uffff\32\11\4\uffff\1\11\1\uffff"+
			"\2\11\1\2\1\11\1\6\1\1\2\11\1\4\2\11\1\5\3\11\1\3\3\11\1\7\1\10\5\11",
			"\1\14\3\uffff\1\13",
			"\1\15\15\uffff\1\16\2\uffff\1\17",
			"\1\20",
			"\1\21",
			"\1\22",
			"\1\23",
			"\1\24",
			"\1\25",
			"",
			"",
			"\1\26",
			"\1\27",
			"\1\30",
			"\1\31",
			"\1\32",
			"\1\33",
			"\12\11\7\uffff\32\11\4\uffff\1\11\1\uffff\32\11",
			"\1\35",
			"\1\36",
			"\1\37",
			"\1\40",
			"\12\11\7\uffff\32\11\4\uffff\1\11\1\uffff\32\11",
			"\1\42",
			"\1\43",
			"\1\44",
			"\1\45",
			"\1\46",
			"",
			"\1\47",
			"\1\50",
			"\1\51",
			"\1\52",
			"",
			"\1\53",
			"\1\54",
			"\1\55",
			"\1\56",
			"\1\57",
			"\1\60",
			"\1\61",
			"\1\62",
			"\12\11\7\uffff\32\11\4\uffff\1\11\1\uffff\32\11",
			"\12\11\7\uffff\32\11\4\uffff\1\11\1\uffff\32\11",
			"\1\65",
			"\1\66",
			"\12\11\7\uffff\32\11\4\uffff\1\11\1\uffff\32\11",
			"\1\70",
			"\12\11\7\uffff\32\11\4\uffff\1\11\1\uffff\32\11",
			"\1\72",
			"\1\73",
			"",
			"",
			"\1\74",
			"\1\75",
			"",
			"\1\76",
			"",
			"\1\77",
			"\1\100",
			"\1\101",
			"\12\11\7\uffff\32\11\4\uffff\1\11\1\uffff\32\11",
			"\1\103",
			"\12\11\7\uffff\32\11\4\uffff\1\11\1\uffff\32\11",
			"\12\11\7\uffff\32\11\4\uffff\1\11\1\uffff\32\11",
			"\12\11\7\uffff\32\11\4\uffff\1\11\1\uffff\32\11",
			"",
			"\12\11\7\uffff\32\11\4\uffff\1\11\1\uffff\32\11",
			"",
			"",
			"",
			""
	};

	static final short[] DFA3_eot = DFA.unpackEncodedString(DFA3_eotS);
	static final short[] DFA3_eof = DFA.unpackEncodedString(DFA3_eofS);
	static final char[] DFA3_min = DFA.unpackEncodedStringToUnsignedChars(DFA3_minS);
	static final char[] DFA3_max = DFA.unpackEncodedStringToUnsignedChars(DFA3_maxS);
	static final short[] DFA3_accept = DFA.unpackEncodedString(DFA3_acceptS);
	static final short[] DFA3_special = DFA.unpackEncodedString(DFA3_specialS);
	static final short[][] DFA3_transition;

	static {
		int numStates = DFA3_transitionS.length;
		DFA3_transition = new short[numStates][];
		for (int i=0; i<numStates; i++) {
			DFA3_transition[i] = DFA.unpackEncodedString(DFA3_transitionS[i]);
		}
	}

	protected class DFA3 extends DFA {

		public DFA3(BaseRecognizer recognizer) {
			this.recognizer = recognizer;
			this.decisionNumber = 3;
			this.eot = DFA3_eot;
			this.eof = DFA3_eof;
			this.min = DFA3_min;
			this.max = DFA3_max;
			this.accept = DFA3_accept;
			this.special = DFA3_special;
			this.transition = DFA3_transition;
		}
		@Override
		public String getDescription() {
			return "1:1: Tokens : ( CERRAR | NUMERO | TEXTO | FECHA | IDENTIFICADOR | REFERENCIA | TABLA | INICIO | FIN | USAR | CREAR | ID | WS );";
		}
	}

}
