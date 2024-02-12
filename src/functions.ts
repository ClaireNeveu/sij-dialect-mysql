import * as ast from 'sij-core/dist/ast';
import { Functions } from 'sij-core/dist/builder';
import { BuilderExtension, ColumnOfType, TypedAst } from 'sij-core/dist/builder/util';

// Modify the sij-core type definitions so the functions are accessible on the builder.
// TODO is there some way to "clone" a module so we're not modifying the global one.
declare module 'sij-core' {
    export interface Functions<Schema, Table, Ext extends BuilderExtension> {
        charLength<String extends Ext['builder']['types']['string']>(
            value: ColumnOfType<String, Table> | TypedAst<Schema, String, ast.Expr<Ext>>
        ): TypedAst<Schema, number, ast.FunctionApp<Ext>>;
    }
}

class MySQLFunctions<Schema, Table, Ext extends BuilderExtension> extends Functions<Schema, Table, Ext> {
    charLength<String extends Ext['builder']['types']['string']>(
        value: ColumnOfType<String, Table> | TypedAst<Schema, String, ast.Expr<Ext>>
    ): TypedAst<Schema, number, ast.FunctionApp<Ext>> {
        return this._function<String, number>('CHAR_LENGTH', [value]);
    }
}

export {
    MySQLFunctions as Functions
}
