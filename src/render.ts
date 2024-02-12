import {
    Renderer,
    ast,
} from 'sij-core';

class MySQLRenderer extends Renderer<any> {
    constructor(opts: { paramsMode?: boolean, placeHolderStyle?: '$' | '?' } = {}) {
        super(opts);
        this._placeHolderStyle = opts.placeHolderStyle ?? '?';
    }
    
    renderIdent(ident: ast.Ident): string {
        return '`' + ident.name + '`';
    }
}

export {
    MySQLRenderer as Renderer
}
