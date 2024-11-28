
function generateInputFields() {
    const dataCount = parseInt(document.getElementById("dataCount").value);
    const inputFieldsDiv = document.getElementById("inputFields");
    const calculateBtn = document.getElementById("calculateBtn");

    if (dataCount < 2 || dataCount > 10) {
      alert("Please enter a number between 2 and 10");
      return;
    }

    let inputHtml = '<div class="input-grid">';
    for (let i = 0; i < dataCount; i++) {
      inputHtml += `
                <label>X${i + 1}: <input type="number" id="x${
        i + 1
      }" step="0.1"></label>
                <label>Y${i + 1}: <input type="number" id="y${
        i + 1
      }" step="0.1"></label>
            `;
    }
    inputHtml += "</div>";

    inputFieldsDiv.innerHTML = inputHtml;
    calculateBtn.style.display = "block";
  }

  function isAverage(arr) {
    return arr.reduce((a, b) => a + b, 0) / arr.length;
  }

  function isSigma(arr) {
    return arr.reduce((a, b) => a + b, 0);
  }

  function isX2(x) {
    return x.map((val) => val * val);
  }

  function isX3(x) {
    return x.map((val) => val * val * val);
  }

  function isX4(x) {
    return x.map((val) => val * val * val * val);
  }

  function isXY(x, y) {
    return x.map((val, i) => val * y[i]);
  }

  function isX2Y(x2, y) {
    return x2.map((val, i) => val * y[i]);
  }

  function isYminYbar(y, ybar) {
    return y.map((val) => val - ybar);
  }

  function isYminYbar2(y, ybar) {
    return y.map((val) => Math.pow(val - ybar, 2));
  }

  function determinant(matrix) {
    return (
      matrix[0][0] *
        (matrix[1][1] * matrix[2][2] - matrix[1][2] * matrix[2][1]) -
      matrix[0][1] *
        (matrix[1][0] * matrix[2][2] - matrix[1][2] * matrix[2][0]) +
      matrix[0][2] *
        (matrix[1][0] * matrix[2][1] - matrix[1][1] * matrix[2][0])
    );
  }

  function cofactor(matrix) {
    const cofactors = [
      [
        matrix[1][1] * matrix[2][2] - matrix[1][2] * matrix[2][1],
        -(matrix[1][0] * matrix[2][2] - matrix[1][2] * matrix[2][0]),
        matrix[1][0] * matrix[2][1] - matrix[1][1] * matrix[2][0],
      ],
      [
        -(matrix[0][1] * matrix[2][2] - matrix[0][2] * matrix[2][1]),
        matrix[0][0] * matrix[2][2] - matrix[0][2] * matrix[2][0],
        -(matrix[0][0] * matrix[2][1] - matrix[0][1] * matrix[2][0]),
      ],
      [
        matrix[0][1] * matrix[1][2] - matrix[0][2] * matrix[1][1],
        -(matrix[0][0] * matrix[1][2] - matrix[0][2] * matrix[1][0]),
        matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0],
      ],
    ];
    return cofactors;
  }

  function transpose(matrix) {
    return matrix[0].map((_, colIndex) =>
      matrix.map((row) => row[colIndex])
    );
  }

  function isInverse(matrix) {
    const det = determinant(matrix);
    if (det === 0) {
      throw new Error("Matrix is not invertible");
    }

    const cofactorMatrix = cofactor(matrix);
    const adjoint = transpose(cofactorMatrix);

    return adjoint.map((row) => row.map((val) => val / det));
  }

  function isMultiplyMatrices(matrixA, matrixB) {
    const result = Array.from({ length: matrixA.length }, () =>
      Array.from({ length: matrixB[0].length }, () => 0)
    );

    for (let i = 0; i < matrixA.length; i++) {
      for (let j = 0; j < matrixB[0].length; j++) {
        for (let k = 0; k < matrixA[0].length; k++) {
          result[i][j] += matrixA[i][k] * matrixB[k][j];
        }
      }
    }

    return result;
  }

  function createMatrixDisplay(matrix, title) {
    const matrixHtml = `
            <div class="matrix-section">
                <h2>${title}</h2>
                <table class="matrix">
                    ${matrix
                      .map(
                        (row) => `
                        <tr>
                            ${row
                              .map((val) => `<td>${val.toFixed(2)}</td>`)
                              .join("")}
                        </tr>
                    `
                      )
                      .join("")}
                </table>
            </div>
        `;
    return matrixHtml;
  }

  function calculateRegression() {
    // Get input data
    const dataCount = parseInt(document.getElementById("dataCount").value);
    const x = Array.from({ length: dataCount }, (_, i) =>
      parseFloat(document.getElementById(`x${i + 1}`).value)
    );
    const y = Array.from({ length: dataCount }, (_, i) =>
      parseFloat(document.getElementById(`y${i + 1}`).value)
    );

    // Perform calculations
    const xbar = isAverage(x);
    const ybar = isAverage(y);
    const sigmaX = isSigma(x);
    const sigmaY = isSigma(y);
    const x2 = isX2(x);
    const sigmax2 = isSigma(x2);
    const x3 = isX3(x);
    const sigmax3 = isSigma(x3);
    const x4 = isX4(x);
    const sigmax4 = isSigma(x4);
    const xy = isXY(x, y);
    const sigmaxy = isSigma(xy);
    const x2y = isX2Y(x2, y);
    const sigmax2y = isSigma(x2y);
    const yminybar = isYminYbar(y, ybar);
    const sigmayminybar = isSigma(yminybar);
    const yminybar2 = isYminYbar2(y, ybar);
    const sigmayminybar2 = isSigma(yminybar2);

    // Create matrices
    const matriks = [
      [dataCount, sigmaX, sigmax2],
      [sigmaX, sigmax2, sigmax3],
      [sigmax2, sigmax3, sigmax4],
    ];

    const matPerbandingan = [[sigmaY], [sigmaxy], [sigmax2y]];

    const matInverse = isInverse(matriks);
    const matHasil = isMultiplyMatrices(matInverse, matPerbandingan);

    const a0 = matHasil[0][0];
    const a1 = matHasil[1][0];
    const a2 = matHasil[2][0];

    const yAaXaX = y.map((yVal, i) =>
      Math.pow(yVal - a0 - a1 * x[i] - a2 * x2[i], 2)
    );

    const sigmayAaXaX = isSigma(yAaXaX);

    // Create result table
    const tableHtml = `
            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>X</th>
                        <th>Y</th>
                        <th>X²</th>
                        <th>X³</th>
                        <th>X⁴</th>
                        <th>XY</th>
                        <th>X²Y</th>
                        <th>(Y-Ȳ)</th>
                        <th>(Y-Ȳ)²</th>
                        <th>(Y-a₀-a₁X-a₂X²)²</th>
                    </tr>
                </thead>
                <tbody>
                    ${x
                      .map(
                        (xVal, i) => `
                        <tr>
                            <td>${i + 1}</td>
                            <td>${xVal.toFixed(1)}</td>
                            <td>${y[i].toFixed(1)}</td>
                            <td>${x2[i].toFixed(1)}</td>
                            <td>${x3[i].toFixed(1)}</td>
                            <td>${x4[i].toFixed(1)}</td>
                            <td>${xy[i].toFixed(1)}</td>
                            <td>${x2y[i].toFixed(1)}</td>
                            <td>${yminybar[i].toFixed(5)}</td>
                            <td>${yminybar2[i].toFixed(5)}</td>
                            <td>${yAaXaX[i].toFixed(7)}</td>
                        </tr>
                    `
                      )
                      .join("")}
                    <tr>
                        <td>Σ</td>
                        <td>${sigmaX.toFixed(1)}</td>
                        <td>${sigmaY.toFixed(1)}</td>
                        <td>${sigmax2.toFixed(1)}</td>
                        <td>${sigmax3.toFixed(1)}</td>
                        <td>${sigmax4.toFixed(1)}</td>
                        <td>${sigmaxy.toFixed(1)}</td>
                        <td>${sigmax2y.toFixed(1)}</td>
                        <td>${sigmayminybar.toFixed(5)}</td>
                        <td>${sigmayminybar2.toFixed(5)}</td>
                        <td>${sigmayAaXaX.toFixed(7)}</td>
                    </tr>
                </tbody>
            </table>
        `;

    // Create matrix display HTML
    const matrixDisplayHtml = `
            <div class="matrix-container">
                ${createMatrixDisplay(matriks, "Original Matrix")}
                ${createMatrixDisplay(matInverse, "Inverse Matrix")}
                ${createMatrixDisplay(matPerbandingan, "Comparison Matrix")}
                ${createMatrixDisplay(matHasil, "Result Matrix")}
            </div>
        `;

    // Update DOM
    document.getElementById("resultTable").innerHTML = tableHtml;
    document.getElementById("matrixDisplay").innerHTML = matrixDisplayHtml;
    document.getElementById(
      "result"
    ).innerHTML = `Equation: Y = ${a0.toFixed(2)} + ${a1.toFixed(
      2
    )}X + ${a2.toFixed(2)}X²`;
  }