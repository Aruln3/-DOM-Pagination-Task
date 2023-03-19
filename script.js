let data = [];
let currentPage = 1;
const rowsPerPage = 10;

const tableContainer = document.getElementById("table-container");
const paginationContainer = document.getElementById("pagination-container");

const fetchJSONData = async () => {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json"
    );
    const jsonData = await response.json();
    data = jsonData;
    displayTable(currentPage);
    setupPagination();
  } catch (error) {
    console.error(error);
  }
};

const displayTable = (pageNumber) => {
  const start = (pageNumber - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const pageData = data.slice(start, end);

  const tableRows = pageData
    .map((rowData) => {
      return `<tr>
                <td>${rowData.id}</td>
                <td>${rowData.name}</td>
                <td>${rowData.email}</td>
              </tr>`;
    })
    .join("");

  tableContainer.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        ${tableRows}
      </tbody>
    </table>
  `;
};



const setupPagination = () => {
  paginationContainer.innerHTML = "";
  const pageCount = Math.ceil(data.length / rowsPerPage);
  const middlePageNumber = Math.floor(pageCount / 2);

  const previousButton = `<button class="pagination-btn ${
    currentPage ===1 ? "disabled" : ""
  }" onclick="goToPage(${currentPage - 1})">Previous</button>`;
  const nextButton = `<button class="pagination-btn ${
    currentPage === pageCount ? "disabled" : ""
  }" onclick="goToPage(${currentPage + 1})">Next</button>`;

  let middlePages = "";
  if (pageCount > 3) {
    for (let i = middlePageNumber - 1; i <= middlePageNumber + 1; i++) {
      middlePages += `<button class="pagination-btn" onclick="goToPage(${i})">${i}</button>`;
    }
  } else {
    for (let i = 1; i <= pageCount; i++) {
      middlePages += `<button class="pagination-btn" onclick="goToPage(${i})">${i}</button>`;
    }
  }

  paginationContainer.innerHTML = `${previousButton}${middlePages}${nextButton}`;
};

const goToPage = (pageNumber) => {
  currentPage = pageNumber;
  displayTable(currentPage);
  setupPagination();
};

fetchJSONData();

