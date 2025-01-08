import { fill, flattenDeep, invert, padStart, unzip } from "lodash";
import { inv } from "mathjs";

type Matrix = {
  __value: number | (number | number[])[];
  countRows: () => number;
  countColumns: () => number;
  addable: (y: Matrix) => boolean;
  add: (y: Matrix) => Matrix;
  multipliable: (y: Matrix) => boolean;
  multiply: (y: Matrix) => Matrix;
  transpose: () => Matrix;
  invert: () => Matrix;
  map: (x: any) => Matrix;
  valueOf: () => number | (number | number[])[];
};

/**
 * Creates a Matrix
 * @constructor
 * @alias module:matrix
 * @param {number|(number | number[])[]} x - Values to store in matrix
 * @throws {TypeError} Argument x must be a number or number array
 * @return {Matrix} Single or multi dimensional matrix
 */
function Matrix(x: number | (number | number[])[]): Matrix {
  // extra nesting
  if (Array.isArray(x) && Array.isArray(x[0]) && x.length === 1) {
    throw new TypeError("Matrix must be a number or array of numbers");
  }

  // uneven rows
  if (
    Array.isArray(x) &&
    Array.isArray(x[0]) &&
    x.some(
      (row) => Array.isArray(row) && row.length !== (x[0] as number[]).length
    )
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
    row.map(
      (column: number, j: number): number =>
        column + (y.__value as number[][])[i][j]
    )
  );
};

/**
 * Determines whether two matrices can be multiplied
 * @alias module:matrix.multipliable
 * @param  {Matrix} x - Matrix to check
 * @param  {Matrix} y - Matrix to check
 * @return {boolean} Whether two matrices can be summed (using matrix multiplication)
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
function innerproduct(x: Matrix, y: Matrix, i: number): number {
  const _x: number[] = x.__value as number[];
  const _y: number[] =
    Array.isArray(unzip<number>(y.__value as number[][])) &&
    unzip<number>(y.__value as number[][]).length === 0
      ? unzip([y.__value as number[]])[i]
      : unzip(y.__value as number[][])[i];
  return ([] as number[])
    .concat(_x)
    .reduce((z: number, _z: number, j: number): number => z + _z * _y[j], 0);
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

  if (x.countColumns() === 0 && y.countRows() === 0) {
    return Matrix((x.__value as number) * (y.__value as number));
  }

  /* New matrix with the dot product */
  const z: Matrix = Matrix(
    fill(
      Array(x.countRows()),
      x.countRows() !== 1 ? fill(Array(y.countColumns()), 0) : 0
    )
  );
  return z.map((_z: number | number[], i: number): number | number[] => {
    if (typeof _z === "number") return innerproduct(x, y, i);
    return _z.map((_, j) =>
      innerproduct(Matrix((x.__value as number[])[i]), y, j)
    );
  });
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
  if (typeof this.__value === "number") return 0;
  if (typeof this.__value[0] === "number") return 1;
  return this.__value.length;
};

/**
 * Counts columns in this matrix
 * @alias module:matrix#countColumns
 * @return {number} Number of columns
 */
Matrix.prototype.countColumns = function (this: Matrix): number {
  if (typeof this.__value === "number") return 0;
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
  switch (this.countRows()) {
    case 0:
      return Matrix(this.__value as number);
    case 1:
      return Matrix(unzip([this.__value as number[]]));
    default:
      return Matrix(unzip(this.__value as number[][]));
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
Matrix.prototype.map = function (this: Matrix, x: any): Matrix {
  if (typeof this.__value === "number") return Matrix(x(this.__value));
  return Matrix(this.__value.map(x));
};

/**
 * Returns the number or number array value
 * @alias module:matrix#valueOf
 * @return {number|number[]} Number of number array value
 */
Matrix.prototype.valueOf = function (
  this: Matrix
): number | (number | number[])[] {
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
  switch (this.countRows()) {
    case 0:
      return `${this.__value}`;
    case 1:
      return `[ ${(this.__value as number[]).join(" ")} ]`;
    default:
      /* Output array filled with zeroes */
      const padding: number[] = unzip(this.__value as number[][]).map(
        (column: number[]) =>
          column.reduce((length, x) => Math.max(`${x}`.length, length), 0)
      );
      return (this.__value as number[][])
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
