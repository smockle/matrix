import { inspect } from "node:util";
import { describe, test, expect } from "@jest/globals";
import Matrix, { Matrix1D, Matrix2D } from "../index.js";

describe("Matrix", () => {
  const error = new TypeError("Matrix must be a number or array of numbers");

  test("instanceof Matrix", () => {
    expect(Matrix([])).toBeInstanceOf(Matrix);
  });

  test("throws unnecessary nesting", () => {
    expect(Matrix.bind(Matrix, [[1, 2]])).toThrowError(error);
  });

  test("throws uneven rows", () => {
    expect(Matrix.bind(Matrix, [[1, 2], [3], [4, 5]])).toThrowError(error);
  });

  test("does not throw number array", () => {
    expect(
      Matrix.bind<typeof Matrix, [x: number[]], [], Matrix1D>(Matrix, [1])
    ).not.toThrowError(error);
  });

  test("does not throw 2D number array", () => {
    expect(
      Matrix.bind<typeof Matrix, [x: number[][]], [], Matrix2D>(Matrix, [
        [1],
        [2],
      ])
    ).not.toThrowError(error);
  });
});

describe("Matrix.addable", () => {
  test("addable mismatched columns", () => {
    expect(
      Matrix.addable(
        Matrix([
          [1, 2],
          [3, 4],
        ]),
        Matrix([
          [1, 2, 3],
          [4, 5, 6],
        ])
      )
    ).toBeFalsy();
  });

  test("addable mismatched rows", () => {
    expect(
      Matrix.addable(
        Matrix([
          [1, 2],
          [3, 4],
        ]),
        Matrix([
          [1, 2],
          [4, 5],
          [7, 8],
        ])
      )
    ).toBeFalsy();
  });

  test("addable", () => {
    expect(
      Matrix.addable(
        Matrix([
          [1, 2],
          [3, 4],
        ]),
        Matrix([
          [5, 6],
          [7, 8],
        ])
      )
    ).toBeTruthy();
  });
});

describe("Matrix#addable", () => {
  test("addable mismatched columns", () => {
    expect(
      Matrix([
        [1, 2],
        [3, 4],
      ]).addable(
        Matrix([
          [1, 2, 3],
          [4, 5, 6],
        ])
      )
    ).toBeFalsy();
  });

  test("addable mismatched rows", () => {
    expect(
      Matrix([
        [1, 2],
        [3, 4],
      ]).addable(
        Matrix([
          [1, 2],
          [4, 5],
          [7, 8],
        ])
      )
    ).toBeFalsy();
  });

  test("addable", () => {
    expect(
      Matrix([
        [1, 2],
        [3, 4],
      ]).addable(
        Matrix([
          [5, 6],
          [7, 8],
        ])
      )
    ).toBeTruthy();
  });
});

describe("Matrix.add", () => {
  test("add throws typerror", () => {
    expect(
      Matrix.add.bind(
        Matrix,
        Matrix([
          [1, 2],
          [3, 4],
        ]),
        Matrix([
          [1, 2, 3],
          [4, 5, 6],
        ])
      )
    ).toThrowError(new TypeError("Matrices are not addable"));
  });

  test("add", () => {
    expect(
      Matrix.add(
        Matrix([
          [1, 2],
          [3, 4],
        ]),
        Matrix([
          [5, 6],
          [7, 8],
        ])
      )
    ).toStrictEqual(
      Matrix([
        [6, 8],
        [10, 12],
      ])
    );
  });
});

describe("Matrix#add", () => {
  const addmatrix = Matrix([
    [1, 2],
    [3, 4],
  ]);

  test("add throws typerror", () => {
    expect(
      addmatrix.add.bind(
        addmatrix,
        Matrix([
          [1, 2, 3],
          [4, 5, 6],
        ])
      )
    ).toThrowError(new TypeError("Matrices are not addable"));
  });

  test("add", () => {
    expect(
      Matrix([
        [1, 2],
        [3, 4],
      ]).add(
        Matrix([
          [5, 6],
          [7, 8],
        ])
      )
    ).toStrictEqual(
      Matrix([
        [6, 8],
        [10, 12],
      ])
    );
  });
});

describe("Matrix.multipliable", () => {
  test("multipliable mismatched columns and rows", () => {
    expect(
      Matrix.multipliable(
        Matrix([
          [1, 2, 3],
          [4, 5, 6],
        ]),
        Matrix([
          [1, 2],
          [4, 5],
        ])
      )
    ).toBeFalsy();
  });

  test("multipliable", () => {
    expect(
      Matrix.multipliable(
        Matrix([
          [1, 2],
          [3, 4],
        ]),
        Matrix([
          [5, 6],
          [7, 8],
        ])
      )
    ).toBeTruthy();
  });
});

describe("Matrix#multipliable", () => {
  test("multipliable mismatched columns and rows", () => {
    expect(
      Matrix([
        [1, 2, 3],
        [4, 5, 6],
      ]).multipliable(
        Matrix([
          [1, 2],
          [4, 5],
        ])
      )
    ).toBeFalsy();
  });

  test("multipliable", () => {
    expect(
      Matrix([
        [1, 2],
        [3, 4],
      ]).multipliable(
        Matrix([
          [5, 6],
          [7, 8],
        ])
      )
    ).toBeTruthy();
  });
});

describe("Matrix.multiply", () => {
  const multiplymatrix = Matrix([1, 2, 3]);

  test("multiply throws typerror", () => {
    expect(
      multiplymatrix.multiply.bind(
        multiplymatrix,
        Matrix([
          [1, 2],
          [3, 4],
        ])
      )
    ).toThrowError(new TypeError("Matrices are not multipliable"));
  });

  test("multiply A (1x1) and B (1x1)", () => {
    expect(Matrix([3]).multiply(Matrix([6]))).toStrictEqual(Matrix([18]));
  });

  test("multiply A (1x2) and B (2x1)", () => {
    expect(Matrix([1, 2]).multiply(Matrix([[3], [4]]))).toStrictEqual(
      Matrix([11])
    );
  });

  test("multiply A (2x2) and B (2x2)", () => {
    expect(
      Matrix([
        [1, 2],
        [3, 4],
      ]).multiply(
        Matrix([
          [5, 6],
          [7, 8],
        ])
      )
    ).toStrictEqual(
      Matrix([
        [19, 22],
        [43, 50],
      ])
    );
  });

  test("multiply A (2x3) and B (3x2)", () => {
    expect(
      Matrix([
        [1, 9, 7],
        [8, 1, 2],
      ]).multiply(
        Matrix([
          [3, 2, 1, 5],
          [5, 4, 7, 3],
          [6, 9, 6, 8],
        ])
      )
    ).toStrictEqual(
      Matrix([
        [90, 101, 106, 88],
        [41, 38, 27, 59],
      ])
    );
  });
});

describe("Matrix#multiply", () => {
  test("multiply throws typerror", () => {
    expect(
      Matrix.multiply.bind(
        Matrix,
        Matrix([1, 2, 3]),
        Matrix([
          [1, 2],
          [3, 4],
        ])
      )
    ).toThrowError(new TypeError("Matrices are not multipliable"));
  });

  test("multiply A (1x1) and B (1x1)", () => {
    expect(Matrix.multiply(Matrix([3]), Matrix([6]))).toStrictEqual(
      Matrix([18])
    );
  });

  test("multiply A (1x2) and B (2x1)", () => {
    expect(Matrix.multiply(Matrix([1, 2]), Matrix([[3], [4]]))).toStrictEqual(
      Matrix([11])
    );
  });

  test("multiply A (2x2) and B (2x2)", () => {
    expect(
      Matrix.multiply(
        Matrix([
          [1, 2],
          [3, 4],
        ]),
        Matrix([
          [5, 6],
          [7, 8],
        ])
      )
    ).toStrictEqual(
      Matrix([
        [19, 22],
        [43, 50],
      ])
    );
  });

  test("multiply A (2x3) and B (3x2)", () => {
    expect(
      Matrix.multiply(
        Matrix([
          [1, 9, 7],
          [8, 1, 2],
        ]),
        Matrix([
          [3, 2, 1, 5],
          [5, 4, 7, 3],
          [6, 9, 6, 8],
        ])
      )
    ).toStrictEqual(
      Matrix([
        [90, 101, 106, 88],
        [41, 38, 27, 59],
      ])
    );
  });
});

describe("Matrix#valueOf", () => {
  const array = [3];

  test("valueOf Matrix", () => {
    expect(Matrix(array).valueOf()).toBe(array);
  });
});

describe("Matrix#countRows", () => {
  test("countRows number array", () => {
    expect(Matrix([1]).countRows()).toBe(1);
  });

  test("countRows 2D number array", () => {
    expect(
      Matrix([
        [1, 2],
        [3, 4],
        [5, 6],
      ]).countRows()
    ).toBe(3);
  });
});

describe("Matrix#countColumns", () => {
  test("countColumns number array", () => {
    expect(Matrix([1]).countColumns()).toBe(1);
  });

  test("countColumns 2D number array", () => {
    expect(Matrix([[1], [2]]).countColumns()).toBe(1);
  });

  test("countColumns many 2D number array", () => {
    expect(
      Matrix([
        [1, 2],
        [3, 4],
        [5, 6],
      ]).countColumns()
    ).toBe(2);
  });
});

describe("Matrix#transpose", () => {
  test("transpose number array", () => {
    expect(Matrix([1, 2]).transpose()).toStrictEqual(Matrix([[1], [2]]));
  });

  test("transpose 2D number array", () => {
    expect(
      Matrix([
        [1, 2, 3],
        [4, 5, 6],
      ]).transpose()
    ).toStrictEqual(
      Matrix([
        [1, 4],
        [2, 5],
        [3, 6],
      ])
    );
  });
});

describe("Matrix#invert", () => {
  test("invert 2D number array", () => {
    expect(
      Matrix([
        [1, 2],
        [3, 4],
      ]).invert()
    ).toStrictEqual(
      Matrix([
        [-2, 1],
        [1.5, -0.5],
      ])
    );
  });
});

describe("Matrix#map", () => {
  const matrix = Matrix([1, 2, 3]);

  test("map returns a matrix", () => {
    expect(matrix.map((x: number) => x + 1)).toBeInstanceOf(Matrix);
  });

  test("map identity", () => {
    expect(matrix.map((x: number) => x)).toStrictEqual(matrix);
  });

  test("map increment", () => {
    expect(matrix.map((x: number) => x + 1)).toStrictEqual(Matrix([2, 3, 4]));
  });

  test("map non-mutable", () => {
    expect(matrix).toStrictEqual(Matrix([1, 2, 3]));
  });
});

describe("Matrix#inspect", () => {
  test("inspect number array", () => {
    expect(inspect(Matrix([1, 2, 3]))).toBe("[ 1 2 3 ]");
  });

  test("inspect 2D number array", () => {
    expect(
      inspect(
        Matrix([
          [1, 2, 3],
          [4, 5, 6],
          [7, 8, 9],
        ])
      )
    ).toBe("[ 1 2 3 ]\n[ 4 5 6 ]\n[ 7 8 9 ]");
  });

  test("inspect padded 2D number array", () => {
    expect(
      inspect(
        Matrix([
          [1, 2, 3],
          [-10, 11, -12],
          [100, 0, 0],
        ])
      )
    ).toBe("[   1  2   3 ]\n[ -10 11 -12 ]\n[ 100  0   0 ]");
  });
});
