[![npm](https://img.shields.io/npm/v/@smockle/matrix.svg)](https://www.npmjs.com/package/@smockle/matrix)
[![codecov](https://codecov.io/gh/smockle/matrix/branch/master/graph/badge.svg)](https://codecov.io/gh/smockle/matrix)

# matrix

Single or multi dimensional matrices and matrix functions.

## Installation

Run `npm install --save @smockle/matrix` to add `matrix` to your project.

## Usage

```JavaScript
import Matrix from '@smockle/matrix'

// 1x1 Matrix
const m11 = Matrix(3)

// 1x3 Matrix
const m13 = Matrix([1, 2, 3])

// 3x1 Matrix
const m31 = Matrix([[1], [2], [3]])
```

## API Reference

- [matrix](#module_matrix)
  - [Matrix](#exp_module_matrix--Matrix) ⏏
    - [new Matrix(x)](#new_module_matrix--Matrix_new)
    - _instance_
      - [.countRows()](#module_matrix--Matrix+countRows) ⇒ <code>number</code>
      - [.countColumns()](#module_matrix--Matrix+countColumns) ⇒ <code>number</code>
      - [.addable(y)](#module_matrix--Matrix+addable) ⇒ <code>boolean</code>
      - [.add(y)](#module_matrix--Matrix+add) ⇒ <code>Matrix</code>
      - [.multipliable(y)](#module_matrix--Matrix+multipliable) ⇒ <code>boolean</code>
      - [.multiply(y)](#module_matrix--Matrix+multiply) ⇒ <code>Matrix</code>
      - [.transpose()](#module_matrix--Matrix+transpose) ⇒ <code>Matrix</code>
      - [.invert()](#module_matrix--Matrix+invert) ⇒ <code>Matrix</code>
      - [.map()](#module_matrix--Matrix+map) ⇒ <code>Matrix</code>
      - [.valueOf()](#module_matrix--Matrix+valueOf) ⇒ <code>number</code> \| <code>Array.&lt;number&gt;</code>
      - [.inspect()](#module_matrix--Matrix+inspect) ⇒ <code>string</code>
        - [~padding](#module_matrix--Matrix+inspect..padding) : <code>string</code>
    - _static_
      - [.addable(x, y)](#module_matrix--Matrix.addable) ⇒ <code>boolean</code>
      - [.add(x, y)](#module_matrix--Matrix.add) ⇒ <code>Matrix</code>
      - [.multipliable(x, y)](#module_matrix--Matrix.multipliable) ⇒ <code>boolean</code>
      - [.multiply(x, y)](#module_matrix--Matrix.multiply) ⇒ <code>Matrix</code>
        - [~z](#module_matrix--Matrix.multiply..z) : <code>Matrix</code>
      - [.invert(Matrix)](#module_matrix--Matrix.invert) ⇒ <code>Matrix</code>
    - _inner_
      - [~matrix](#module_matrix--Matrix..matrix) : <code>Matrix</code>
      - [~innerproduct(x, y, i)](#module_matrix--Matrix..innerproduct) ⇒ <code>number</code>

<a name="exp_module_matrix--Matrix"></a>

### Matrix ⏏

**Kind**: Exported class  
<a name="new_module_matrix--Matrix_new"></a>

#### new Matrix(x)

Creates a Matrix

**Returns**: <code>Matrix</code> - Single or multi dimensional matrix  
**Throws**:

- <code>TypeError</code> Argument x must be a number or number array

| Param | Type                                                     | Description               |
| ----- | -------------------------------------------------------- | ------------------------- |
| x     | <code>number</code> \| <code>Array.&lt;number&gt;</code> | Values to store in matrix |

<a name="module_matrix--Matrix+countRows"></a>

#### matrix.countRows() ⇒ <code>number</code>

Counts rows in this matrix

**Kind**: instance method of [<code>Matrix</code>](#exp_module_matrix--Matrix)  
**Returns**: <code>number</code> - Number of rows  
<a name="module_matrix--Matrix+countColumns"></a>

#### matrix.countColumns() ⇒ <code>number</code>

Counts columns in this matrix

**Kind**: instance method of [<code>Matrix</code>](#exp_module_matrix--Matrix)  
**Returns**: <code>number</code> - Number of columns  
<a name="module_matrix--Matrix+addable"></a>

#### matrix.addable(y) ⇒ <code>boolean</code>

Determines whether this matrix can be summed

**Kind**: instance method of [<code>Matrix</code>](#exp_module_matrix--Matrix)  
**Returns**: <code>boolean</code> - Whether this matrix can be summed (using matrix addition)

| Param | Type                | Description     |
| ----- | ------------------- | --------------- |
| y     | <code>Matrix</code> | Matrix to check |

<a name="module_matrix--Matrix+add"></a>

#### matrix.add(y) ⇒ <code>Matrix</code>

Adds this matrix using matrix addition

**Kind**: instance method of [<code>Matrix</code>](#exp_module_matrix--Matrix)  
**Returns**: <code>Matrix</code> - New matrix with the summation

| Param | Type                | Description   |
| ----- | ------------------- | ------------- |
| y     | <code>Matrix</code> | Matrix to add |

<a name="module_matrix--Matrix+multipliable"></a>

#### matrix.multipliable(y) ⇒ <code>boolean</code>

Determines whether this matrix can be multiplied

**Kind**: instance method of [<code>Matrix</code>](#exp_module_matrix--Matrix)  
**Returns**: <code>boolean</code> - Whether two matrices can be summed (using matrix multiplication)

| Param | Type                | Description     |
| ----- | ------------------- | --------------- |
| y     | <code>Matrix</code> | Matrix to check |

<a name="module_matrix--Matrix+multiply"></a>

#### matrix.multiply(y) ⇒ <code>Matrix</code>

Calculates the dot product of this matrix

**Kind**: instance method of [<code>Matrix</code>](#exp_module_matrix--Matrix)  
**Returns**: <code>Matrix</code> - New matrix with the dot product

| Param | Type                | Description        |
| ----- | ------------------- | ------------------ |
| y     | <code>Matrix</code> | Matrix to multiply |

<a name="module_matrix--Matrix+transpose"></a>

#### matrix.transpose() ⇒ <code>Matrix</code>

Calculates the transpose of this matrix

**Kind**: instance method of [<code>Matrix</code>](#exp_module_matrix--Matrix)  
**Returns**: <code>Matrix</code> - New matrix with the transpose  
<a name="module_matrix--Matrix+invert"></a>

#### matrix.invert() ⇒ <code>Matrix</code>

Inverts this matrix

**Kind**: instance method of [<code>Matrix</code>](#exp_module_matrix--Matrix)  
**Returns**: <code>Matrix</code> - Matrix inverse  
<a name="module_matrix--Matrix+map"></a>

#### matrix.map() ⇒ <code>Matrix</code>

Maps over this matrix

**Kind**: instance method of [<code>Matrix</code>](#exp_module_matrix--Matrix)  
**Returns**: <code>Matrix</code> - Matrix inverse  
<a name="module_matrix--Matrix+valueOf"></a>

#### matrix.valueOf() ⇒ <code>number</code> \| <code>Array.&lt;number&gt;</code>

Returns the number or number array value

**Kind**: instance method of [<code>Matrix</code>](#exp_module_matrix--Matrix)  
**Returns**: <code>number</code> \| <code>Array.&lt;number&gt;</code> - Number of number array value  
<a name="module_matrix--Matrix+inspect"></a>

#### matrix.inspect() ⇒ <code>string</code>

Formats and prints the matrix value

**Kind**: instance method of [<code>Matrix</code>](#exp_module_matrix--Matrix)  
**Returns**: <code>string</code> - Formatted matrix value  
<a name="module_matrix--Matrix+inspect..padding"></a>

##### inspect~padding : <code>string</code>

Output array filled with zeroes

**Kind**: inner constant of [<code>inspect</code>](#module_matrix--Matrix+inspect)  
<a name="module_matrix--Matrix.addable"></a>

#### Matrix.addable(x, y) ⇒ <code>boolean</code>

Determines whether two matrices can be summed

**Kind**: static method of [<code>Matrix</code>](#exp_module_matrix--Matrix)  
**Returns**: <code>boolean</code> - Whether two matrices can be summed (using matrix addition)

| Param | Type                | Description     |
| ----- | ------------------- | --------------- |
| x     | <code>Matrix</code> | Matrix to check |
| y     | <code>Matrix</code> | Matrix to check |

<a name="module_matrix--Matrix.add"></a>

#### Matrix.add(x, y) ⇒ <code>Matrix</code>

Adds two matrices using matrix addition

**Kind**: static method of [<code>Matrix</code>](#exp_module_matrix--Matrix)  
**Returns**: <code>Matrix</code> - New matrix with the summation  
**Throws**:

- <code>TypeError</code> Matrices are not addable

| Param | Type                | Description   |
| ----- | ------------------- | ------------- |
| x     | <code>Matrix</code> | Matrix to add |
| y     | <code>Matrix</code> | Matrix to add |

<a name="module_matrix--Matrix.multipliable"></a>

#### Matrix.multipliable(x, y) ⇒ <code>boolean</code>

Determines whether two matrices can be multiplied

**Kind**: static method of [<code>Matrix</code>](#exp_module_matrix--Matrix)  
**Returns**: <code>boolean</code> - Whether two matrices can be summed (using matrix multiplication)

| Param | Type                | Description     |
| ----- | ------------------- | --------------- |
| x     | <code>Matrix</code> | Matrix to check |
| y     | <code>Matrix</code> | Matrix to check |

<a name="module_matrix--Matrix.multiply"></a>

#### Matrix.multiply(x, y) ⇒ <code>Matrix</code>

Calculates the dot product of two matrices

**Kind**: static method of [<code>Matrix</code>](#exp_module_matrix--Matrix)  
**Returns**: <code>Matrix</code> - New matrix with the dot product

| Param | Type                | Description        |
| ----- | ------------------- | ------------------ |
| x     | <code>Matrix</code> | Matrix to multiply |
| y     | <code>Matrix</code> | Matrix to multiply |

<a name="module_matrix--Matrix.multiply..z"></a>

##### multiply~z : <code>Matrix</code>

New matrix with the dot product

**Kind**: inner constant of [<code>multiply</code>](#module_matrix--Matrix.multiply)  
<a name="module_matrix--Matrix.invert"></a>

#### Matrix.invert(Matrix) ⇒ <code>Matrix</code>

Inverts a matrix

**Kind**: static method of [<code>Matrix</code>](#exp_module_matrix--Matrix)  
**Returns**: <code>Matrix</code> - Matrix inverse

| Param  | Type           | Description |
| ------ | -------------- | ----------- |
| Matrix | <code>x</code> | to invert   |

<a name="module_matrix--Matrix..matrix"></a>

#### Matrix~matrix : <code>Matrix</code>

Single or multi dimensional matrix

**Kind**: inner constant of [<code>Matrix</code>](#exp_module_matrix--Matrix)  
<a name="module_matrix--Matrix..innerproduct"></a>

#### Matrix~innerproduct(x, y, i) ⇒ <code>number</code>

Calculates the inner product of two matrices

**Kind**: inner method of [<code>Matrix</code>](#exp_module_matrix--Matrix)  
**Returns**: <code>number</code> - Inner product of matrices

| Param | Type                | Description                    |
| ----- | ------------------- | ------------------------------ |
| x     | <code>Matrix</code> | Matrix to multiply             |
| y     | <code>Matrix</code> | Matrix to multiply             |
| i     | <code>number</code> | Column in matrix y to multiply |

## Testing

`matrix` includes several unit tests. After cloning the `matrix` repo locally, run `npm install` in the project folder to install dependencies. Run `npm test` to execute the tests.
