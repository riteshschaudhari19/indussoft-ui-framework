type Operator = 'equal' | 'in' | 'notEmpty' | 'notEqual' | 'contains'
export type FieldClause = {
    field: string
    operator: Operator
    value?: boolean | number | string | Array<number | string>
}
export type DependsOnClause = 
| FieldClause
| { any: DependsOnClause[] }
| { all: DependsOnClause[] }

export type DependsOn = {
    any?: DependsOnClause[]
    all?: DependsOnClause[]
    required?: boolean
    valuePath?: string
    forceSetValuePath?: string
}