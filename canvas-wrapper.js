(function () {
  var Proto = CanvasRenderingContext2D.prototype,
      matrixMultiply = function (m1, m2) {
        var result = [
          [1, 0, 0],
          [0, 1, 0],
          [0, 0, 1]
        ];

        for (var x = 0; x < 3; ++x) {
          for (var y = 0; y < 3; ++y) {
            var sum = 0;

            for (var z = 0; z < 3; ++z) {
              sum += m1[x][z] * m2[z][y];
            }

            result[x][y] = sum;
          }
        }

        return result;
      };

  Proto.transformationMatrixStack = [];
  Proto.transformationMatrix = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1]
  ];

  Proto.getIdentityMatrix = function () {
    return [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1]
    ];
  };

  Proto.getTransformationMatrix = function () {
    return this.transformationMatrix;
  };

  Proto.setTransformationMatrix = function (a, b, c, d, e, f) {
    this.transformationMatrix = [
      [a, c, e],
      [b, d, f],
      [0, 0, 1]
    ];
    return this.setTransform(a, b, c, d, e, f);
  };

  Proto.resetTransformationMatrix = function () {
    return this.setTransform(1, 0, 0, 1, 0, 0);
  };

  Proto.resetTransform = function () {
    return this.setTransform(1, 0, 0, 1, 0, 0);
  };

  Proto.mScale = function (x, y) {
    this.transformationMatrix = matrixMultiply(this.transformationMatrix, [
      [x, 0, 0],
      [0, y, 0],
      [0, 0, 1]
    ]);

    return this.scale(x, y);
  };

  Proto.mRotate = function (angle) {
    this.transformationMatrix = matrixMultiply(this.transformationMatrix, [
      [Math.cos(angle),  Math.sin(angle), 0],
      [-Math.sin(angle), Math.cos(angle), 0],
      [0,                0,               1]
    ]);

    return this.rotate(angle);
  };

  Proto.mTranslate = function (x, y) {
    this.transformationMatrix = matrixMultiply(this.transformationMatrix, [
      [1, 0, x],
      [0, 1, y],
      [0, 0, 1]
    ]);
    return this.translate(x, y);
  };

  Proto.mSave = function() {
    this.transformationMatrixStack.push(this.transformationMatrix);

    return this.save();
  };

  Proto.mRestore = function() {
    this.transformationMatrix = this.transformationMatrixStack.pop();

    return this.restore();
  };
}());