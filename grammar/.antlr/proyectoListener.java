// Generated from c:/Users/tony2/OneDrive/Desktop/8vo Semestre/PracticasLyA_II/Unidad 2/compiladoru2/grammar/proyecto.g by ANTLR 4.13.1

import java.util.ArrayList;
import java.util.List;

import org.antlr.v4.runtime.tree.ParseTreeListener;

/**
 * This interface defines a complete listener for a parse tree produced by
 * {@link proyectoParser}.
 */
public interface proyectoListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by {@link proyectoParser#inicio}.
	 * @param ctx the parse tree
	 */
	void enterInicio(proyectoParser.InicioContext ctx);
	/**
	 * Exit a parse tree produced by {@link proyectoParser#inicio}.
	 * @param ctx the parse tree
	 */
	void exitInicio(proyectoParser.InicioContext ctx);
	/**
	 * Enter a parse tree produced by {@link proyectoParser#creacion}.
	 * @param ctx the parse tree
	 */
	void enterCreacion(proyectoParser.CreacionContext ctx);
	/**
	 * Exit a parse tree produced by {@link proyectoParser#creacion}.
	 * @param ctx the parse tree
	 */
	void exitCreacion(proyectoParser.CreacionContext ctx);
	/**
	 * Enter a parse tree produced by {@link proyectoParser#usar}.
	 * @param ctx the parse tree
	 */
	void enterUsar(proyectoParser.UsarContext ctx);
	/**
	 * Exit a parse tree produced by {@link proyectoParser#usar}.
	 * @param ctx the parse tree
	 */
	void exitUsar(proyectoParser.UsarContext ctx);
	/**
	 * Enter a parse tree produced by {@link proyectoParser#tabla}.
	 * @param ctx the parse tree
	 */
	void enterTabla(proyectoParser.TablaContext ctx);
	/**
	 * Exit a parse tree produced by {@link proyectoParser#tabla}.
	 * @param ctx the parse tree
	 */
	void exitTabla(proyectoParser.TablaContext ctx);
	/**
	 * Enter a parse tree produced by {@link proyectoParser#campo}.
	 * @param ctx the parse tree
	 */
	void enterCampo(proyectoParser.CampoContext ctx);
	/**
	 * Exit a parse tree produced by {@link proyectoParser#campo}.
	 * @param ctx the parse tree
	 */
	void exitCampo(proyectoParser.CampoContext ctx);
	/**
	 * Enter a parse tree produced by {@link proyectoParser#cerrar}.
	 * @param ctx the parse tree
	 */
	void enterCerrar(proyectoParser.CerrarContext ctx);
	/**
	 * Exit a parse tree produced by {@link proyectoParser#cerrar}.
	 * @param ctx the parse tree
	 */
	void exitCerrar(proyectoParser.CerrarContext ctx);
}