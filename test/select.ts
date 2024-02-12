import test, { Macro } from 'ava';

import { Builder, builder, ast } from 'sij-core';
import { Functions } from '../src/functions';
import { Renderer } from '../src/render';

type MySchema = {
    employee: {
        id: number,
        name: string,
        salary: number,
        department_id: number
    },
    department: {
        id: number,
        budget: number,
    },
};

type MyExtension = builder.Extend<{
    builder: {
        types: {
            numeric: number | bigint | { _tag: 'Real', val: string },
        }
    }
}>;

const r = new Renderer();
const b = new Builder<MySchema, MyExtension>(new Functions<MySchema, {}, MyExtension>());

const isSql: Macro<[builder.StatementBuilder<any>, string]> = (t, builder, out) => (
    t.is(r.renderStatement(builder._statement), out)
);

const isParamsSql: Macro<[builder.StatementBuilder<any>, string, Array<any>]> = (t, builder, str, par) => {
    const r = new Renderer({ paramsMode: true });
    const q = r.renderStatement(builder._statement);
    const { params } = r;
    t.is(q, str);
    t.deepEqual(params, par);
};


test('CHAR_LENGTH', isSql,
     b.from('employee')(b => b.selectAs('name_length', b.fn.charLength('name'))),
     'SELECT `CHAR_LENGTH`(`name`) AS `name_length` FROM `employee`',
    );
