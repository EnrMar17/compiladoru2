// $ANTLR 3.5.2 proyecto.g 2026-04-09 19:01:08

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
			// proyecto.g:173:15: ( 'cerrar' )
			// proyecto.g:173:17: 'cerrar'
			{
			match("cerrar"); 

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
			// proyecto.g:174:15: ( 'numero' )
			// proyecto.g:174:17: 'numero'
			{
			match("numero"); 

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
			// proyecto.g:175:15: ( 'texto' )
			// proyecto.g:175:17: 'texto'
			{
			match("texto"); 

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
			// proyecto.g:176:15: ( 'fecha' )
			// proyecto.g:176:17: 'fecha'
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
			// proyecto.g:177:15: ( 'identificador' )
			// proyecto.g:177:17: 'identificador'
			{
			match("identificador"); 

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
			// proyecto.g:178:15: ( 'referencia' )
			// proyecto.g:178:17: 'referencia'
			{
			match("referencia"); 

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
			// proyecto.g:179:15: ( 'tabla' )
			// proyecto.g:179:17: 'tabla'
			{
			match("tabla"); 

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
			// proyecto.g:180:15: ( 'inicio' )
			// proyecto.g:180:17: 'inicio'
			{
			match("inicio"); 

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
			// proyecto.g:181:15: ( 'fin' )
			// proyecto.g:181:17: 'fin'
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
	// $ANTLR end "FIN"

	// $ANTLR start "USAR"
	public final void mUSAR() throws RecognitionException {
		try {
			int _type = USAR;
			int _channel = DEFAULT_TOKEN_CHANNEL;
			// proyecto.g:182:15: ( 'usar' )
			// proyecto.g:182:17: 'usar'
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
			// proyecto.g:183:15: ( 'crear' )
			// proyecto.g:183:17: 'crear'
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
			// proyecto.g:185:4: ( ( 'a' .. 'z' | 'A' .. 'Z' | '_' ) ( 'a' .. 'z' | 'A' .. 'Z' | '0' .. '9' | '_' )* )
			// proyecto.g:185:6: ( 'a' .. 'z' | 'A' .. 'Z' | '_' ) ( 'a' .. 'z' | 'A' .. 'Z' | '0' .. '9' | '_' )*
			{
			if ( (input.LA(1) >= 'A' && input.LA(1) <= 'Z')||input.LA(1)=='_'||(input.LA(1) >= 'a' && input.LA(1) <= 'z') ) {
				input.consume();
			}
			else {
				MismatchedSetException mse = new MismatchedSetException(null,input);
				recover(mse);
				throw mse;
			}
			// proyecto.g:185:30: ( 'a' .. 'z' | 'A' .. 'Z' | '0' .. '9' | '_' )*
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
			// proyecto.g:186:4: ( ( ' ' | '\\n' | '\\t' | '\\r' )+ )
			// proyecto.g:186:6: ( ' ' | '\\n' | '\\t' | '\\r' )+
			{
			// proyecto.g:186:6: ( ' ' | '\\n' | '\\t' | '\\r' )+
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
		"\1\uffff\7\10\2\uffff\21\10\1\46\12\10\1\uffff\3\10\1\64\1\10\1\66\1\10"+
		"\1\70\1\71\1\72\3\10\1\uffff\1\76\1\uffff\1\77\3\uffff\1\10\1\101\1\10"+
		"\2\uffff\1\10\1\uffff\6\10\1\112\1\10\1\uffff\1\10\1\115\1\uffff";
	static final String DFA3_eofS =
		"\116\uffff";
	static final String DFA3_minS =
		"\1\11\1\145\1\165\1\141\1\145\1\144\1\145\1\163\2\uffff\1\162\1\145\1"+
		"\155\1\170\1\142\1\143\1\156\1\145\1\151\1\146\1\141\1\162\1\141\1\145"+
		"\1\164\1\154\1\150\1\60\1\156\1\143\1\145\1\162\1\141\2\162\1\157\2\141"+
		"\1\uffff\1\164\1\151\1\162\1\60\1\162\1\60\1\157\3\60\1\151\1\157\1\145"+
		"\1\uffff\1\60\1\uffff\1\60\3\uffff\1\146\1\60\1\156\2\uffff\1\151\1\uffff"+
		"\2\143\1\151\2\141\1\144\1\60\1\157\1\uffff\1\162\1\60\1\uffff";
	static final String DFA3_maxS =
		"\1\172\1\162\1\165\1\145\1\151\1\156\1\145\1\163\2\uffff\1\162\1\145\1"+
		"\155\1\170\1\142\1\143\1\156\1\145\1\151\1\146\1\141\1\162\1\141\1\145"+
		"\1\164\1\154\1\150\1\172\1\156\1\143\1\145\1\162\1\141\2\162\1\157\2\141"+
		"\1\uffff\1\164\1\151\1\162\1\172\1\162\1\172\1\157\3\172\1\151\1\157\1"+
		"\145\1\uffff\1\172\1\uffff\1\172\3\uffff\1\146\1\172\1\156\2\uffff\1\151"+
		"\1\uffff\2\143\1\151\2\141\1\144\1\172\1\157\1\uffff\1\162\1\172\1\uffff";
	static final String DFA3_acceptS =
		"\10\uffff\1\14\1\15\34\uffff\1\11\15\uffff\1\12\1\uffff\1\13\1\uffff\1"+
		"\3\1\7\1\4\3\uffff\1\1\1\2\1\uffff\1\10\10\uffff\1\6\2\uffff\1\5";
	static final String DFA3_specialS =
		"\116\uffff}>";
	static final String[] DFA3_transitionS = {
			"\2\11\2\uffff\1\11\22\uffff\1\11\40\uffff\32\10\4\uffff\1\10\1\uffff"+
			"\2\10\1\1\2\10\1\4\2\10\1\5\4\10\1\2\3\10\1\6\1\10\1\3\1\7\5\10",
			"\1\12\14\uffff\1\13",
			"\1\14",
			"\1\16\3\uffff\1\15",
			"\1\17\3\uffff\1\20",
			"\1\21\11\uffff\1\22",
			"\1\23",
			"\1\24",
			"",
			"",
			"\1\25",
			"\1\26",
			"\1\27",
			"\1\30",
			"\1\31",
			"\1\32",
			"\1\33",
			"\1\34",
			"\1\35",
			"\1\36",
			"\1\37",
			"\1\40",
			"\1\41",
			"\1\42",
			"\1\43",
			"\1\44",
			"\1\45",
			"\12\10\7\uffff\32\10\4\uffff\1\10\1\uffff\32\10",
			"\1\47",
			"\1\50",
			"\1\51",
			"\1\52",
			"\1\53",
			"\1\54",
			"\1\55",
			"\1\56",
			"\1\57",
			"\1\60",
			"",
			"\1\61",
			"\1\62",
			"\1\63",
			"\12\10\7\uffff\32\10\4\uffff\1\10\1\uffff\32\10",
			"\1\65",
			"\12\10\7\uffff\32\10\4\uffff\1\10\1\uffff\32\10",
			"\1\67",
			"\12\10\7\uffff\32\10\4\uffff\1\10\1\uffff\32\10",
			"\12\10\7\uffff\32\10\4\uffff\1\10\1\uffff\32\10",
			"\12\10\7\uffff\32\10\4\uffff\1\10\1\uffff\32\10",
			"\1\73",
			"\1\74",
			"\1\75",
			"",
			"\12\10\7\uffff\32\10\4\uffff\1\10\1\uffff\32\10",
			"",
			"\12\10\7\uffff\32\10\4\uffff\1\10\1\uffff\32\10",
			"",
			"",
			"",
			"\1\100",
			"\12\10\7\uffff\32\10\4\uffff\1\10\1\uffff\32\10",
			"\1\102",
			"",
			"",
			"\1\103",
			"",
			"\1\104",
			"\1\105",
			"\1\106",
			"\1\107",
			"\1\110",
			"\1\111",
			"\12\10\7\uffff\32\10\4\uffff\1\10\1\uffff\32\10",
			"\1\113",
			"",
			"\1\114",
			"\12\10\7\uffff\32\10\4\uffff\1\10\1\uffff\32\10",
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
