import { fill, padStart, unzip } from "lodash-es";
import { inv } from "mathjs";

interface IMatrix {
  countRows: () => number;
  countColumns: () => number;
  addable: (y: Matrix) => boolean;
  add: (y: Matrix) => Matrix;
  multipliable: (y: Matrix) => boolean;
  multiply: (y: Matrix) => Matrix;
  transpose: () => Matrix;
  invert: () => Matrix;
  map: (x: any) => Matrix;
}

interface Matrix1D extends IMatrix {
  __value: number[];
  valueOf: () => number[];
}

interface Matrix2D extends IMatrix {
  __value: number[][];
  valueOf: () => number[][];
}

type Matrix = Matrix1D | Matrix2D;

function isMatrix1D(matrix: Matrix): matrix is Matrix1D {
  return matrix.countRows() === 1;
}

/**
 * Creates a Matrix
 * @constructor
 * @alias module:matrix
 * @param {number[] | number[][]} x - Values to store in matrix
 * @throws {TypeError} Argument x must be a number or number array
 * @return {Matrix} Single or multi dimensional matrix
 */
function Matrix(x: number[] | number[][]): Matrix {
  // extra nesting
  if (Array.isArray(x[0]) && x.length === 1) {
    throw new TypeError("Matrix must be a number or array of numbers");
  }

  // uneven rows
  const firstRowLength = Array.isArray(x[0]) ? x[0].length : 0;
  if (
    firstRowLength > 0 &&
    x.some((row) => Array.isArray(row) && row.length !== firstRowLength)
  ) {
    throw new TypeError("Matrix must be a number or array of numbers");
  }

  /* Single or multi dimensional matrix */
  const matrix = Object.create(Matrix.prototype);
  matrix.__value = x;
  return matrix;
}

/**
 * Determines whether two matrices can be summed
 * @alias module:matrix.addable
 * @param  {Matrix} x - Matrix to check
 * @param  {Matrix} y - Matrix to check
 * @return {boolean} Whether two matrices can be summed (using matrix addition)
 */
Matrix.addable = function (x: Matrix, y: Matrix): boolean {
  return (
    x.countRows() === y.countRows() && x.countColumns() === y.countColumns()
  );
};

/**
 * Adds two matrices using matrix addition
 * @alias module:matrix.add
 * @param {Matrix} x - Matrix to add
 * @param {Matrix} y - Matrix to add
 * @throws {TypeError} Matrices are not addable
 * @return {Matrix} New matrix with the summation
 */
Matrix.add = function (x: Matrix, y: Matrix): Matrix {
  if (!Matrix.addable(x, y)) throw new TypeError("Matrices are not addable");
  return x.map((row: number[], i: number): number[] =>
    row.map((column: number, j: number): number => {
      return column + (Array.isArray(y.__value[i]) ? y.__value[i][j] : 0);
    })
  );
};

/**
 * Determines whether two matrices can be multiplied
 * @alias module:matrix.multipliable
 * @param  {Matrix} x - Matrix to check
 * @param  {Matrix} y - Matrix to check
 * @return {boolean} Whether two matrices can be multiplied (using matrix multiplication)
 */
Matrix.multipliable = function (x: Matrix, y: Matrix): boolean {
  return x.countColumns() === y.countRows();
};

/**
 * Calculates the inner product of two matrices
 * @param  {Matrix} x - Matrix to multiply
 * @param  {Matrix} y - Matrix to multiply
 * @param  {number} i - Column in matrix y to multiply
 * @return {number} Inner product of matrices
 */
function innerproduct(x: Matrix1D, y: Matrix, i: number): number {
  const _x = x.__value;
  let _y;
  if (isMatrix1D(y)) {
    _y = unzip([y.__value])[i];
  } else {
    _y = unzip(y.__value)[i];
  }
  return [..._x].reduce(
    (z: number, _z: number, j: number): number => z + _z * _y[j],
    0
  );
}

/**
 * Calculates the dot product of two matrices
 * @alias module:matrix.multiply
 * @param  {Matrix} x - Matrix to multiply
 * @param  {Matrix} y - Matrix to multiply
 * @return {Matrix} New matrix with the dot product
 */
Matrix.multiply = function (x: Matrix, y: Matrix): Matrix {
  if (!Matrix.multipliable(x, y)) {
    throw new TypeError("Matrices are not multipliable");
  }

  /* New matrix with the dot product */
  if (isMatrix1D(x)) {
    return Matrix([0]).map((_z: number, i: number): number =>
      innerproduct(x, y, i)
    );
  } else {
    return Matrix(
      fill(Array(x.countRows()), fill(Array(y.countColumns()), 0))
    ).map((_z: number[], i: number) => {
      const _x = Matrix(x.__value[i]);
      if (isMatrix1D(_x)) {
        return _z.map((_, j): number => innerproduct(_x, y, j));
      }
    });
  }
};

/**
 * Inverts a matrix
 * @alias module:matrix.invert
 * @param  {x} Matrix to invert
 * @return {Matrix} Matrix inverse
 */
Matrix.invert = function (x: Matrix): Matrix {
  return Matrix(inv<any>(x instanceof Matrix ? x.__value : x));
};

/**
 * Counts rows in this matrix
 * @alias module:matrix#countRows
 * @return {number} Number of rows
 */
Matrix.prototype.countRows = function (this: Matrix): number {
  if (typeof this.__value[0] === "number") return 1;
  return this.__value.length;
};

/**
 * Counts columns in this matrix
 * @alias module:matrix#countColumns
 * @return {number} Number of columns
 */
Matrix.prototype.countColumns = function (this: Matrix): number {
  if (typeof this.__value[0] === "number") return this.__value.length;
  return this.__value[0].length;
};

/**
 * Determines whether this matrix can be summed
 * @alias module:matrix#addable
 * @param  {Matrix} y - Matrix to check
 * @return {boolean} Whether this matrix can be summed (using matrix addition)
 */
Matrix.prototype.addable = function (this: Matrix, y: Matrix): boolean {
  return Matrix.addable(this, y);
};

/**
 * Adds this matrix using matrix addition
 * @alias module:matrix#add
 * @param {Matrix} y - Matrix to add
 * @return {Matrix} New matrix with the summation
 */
Matrix.prototype.add = function (this: Matrix, y: Matrix): Matrix {
  return Matrix.add(this, y);
};

/**
 * Determines whether this matrix can be multiplied
 * @alias module:matrix#multipliable
 * @param  {Matrix} y - Matrix to check
 * @return {boolean} Whether two matrices can be summed (using matrix multiplication)
 */
Matrix.prototype.multipliable = function (this: Matrix, y: Matrix): boolean {
  return Matrix.multipliable(this, y);
};

/**
 * Calculates the dot product of this matrix
 * @alias module:matrix#multiply
 * @param  {Matrix} y - Matrix to multiply
 * @return {Matrix} New matrix with the dot product
 */
Matrix.prototype.multiply = function (this: Matrix, y: Matrix): Matrix {
  return Matrix.multiply(this, y);
};

/**
 * Calculates the transpose of this matrix
 * @alias module:matrix#transpose
 * @return {Matrix} New matrix with the transpose
 */
Matrix.prototype.transpose = function (this: Matrix): Matrix {
  if (isMatrix1D(this)) {
    return Matrix(unzip([this.__value]));
  } else {
    return Matrix(unzip(this.__value));
  }
};

/**
 * Inverts this matrix
 * @alias module:matrix#invert
 * @return {Matrix} Matrix inverse
 */
Matrix.prototype.invert = function (this: Matrix): Matrix {
  return Matrix.invert(this);
};

/**
 * Maps over this matrix
 * @alias module:matrix#map
 * @return {Matrix} Matrix inverse
 */
Matrix.prototype.map = function (
  this: Matrix,
  x: <T extends number | number[]>(value: T, index: number, array: T[]) => T
): Matrix {
  if (isMatrix1D(this)) {
    return Matrix(this.__value.map(x<number>));
  } else {
    return Matrix(this.__value.map(x<number[]>));
  }
};

/**
 * Returns the number or number array value
 * @alias module:matrix#valueOf
 * @return {number[]|number[][]} Number of number array value
 */
Matrix.prototype.valueOf = function (this: Matrix): number[] | number[][] {
  return this.__value;
};

/**
 * Formats and prints the matrix value
 * @alias module:matrix#inspect
 * @return {string} Formatted matrix value
 */
Matrix.prototype[Symbol.for("nodejs.util.inspect.custom")] = function (
  this: Matrix
): string {
  if (isMatrix1D(this)) {
    return `[ ${this.__value.join(" ")} ]`;
  } else {
    /* Output array filled with zeroes */
    const padding: number[] = unzip(this.__value).map((column: number[]) =>
      column.reduce((length, x) => Math.max(`${x}`.length, length), 0)
    );
    return this.__value
      .reduce(
        (output, row) =>
          `${output}[ ${row
            .map((x, i) => padStart(`${x}`, padding[i]))
            .join(" ")} ]`,
        ""
      )
      .replace(/]\[/g, "]\n[");
  }
};

export default Matrix;
