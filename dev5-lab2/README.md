# Lab 2

## Bingo Game
[Link naar codesandbox](https://codesandbox.io/s/wispy-glitter-v9gdl0)

## ES2018 feature
### JavaScript Object Spread
Met de JavaScript Spread Operator `...ArrayName` kunnen we snel een bestaande array of object geheel of gedeeltelijk kopiëren naar een andere array of object.

Voorbeeld
```
let tesla = [ 'Model X', 'Model Y', 'Model S', 'Model 3' ];
let package = [ 'Long Range', 'Performance' ];
let merge = [ ...tesla, ...package ];
console.log(merge);
```

Output
```
[ 'Model X', 'Model Y', 'Model S', 'Model 3', 'Long Range', 'Performance' ]
```
