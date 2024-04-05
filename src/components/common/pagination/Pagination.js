// Reusable componet to show pagination
// props
// total - totalNumberOfRecords
// recordsPerPage - max number of records per page
// currentPage
// onPageChange - handling page change event
const Pagination = ({
  total,
  recodsPerPage = 10,
  currentPage,
  onPageChange,
}) => {
  const numberOfPages = parseInt(total / recodsPerPage);
  const pages = [];
  for (let i = 1; i <= numberOfPages; i++) {
    pages.push(i);
  }
  return (
    <>
      {numberOfPages > 1 && (
        <nav className="d-flex justify-content-center">
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <a
                className="page-link"
                aria-label="Previous"
                onClick={() => onPageChange(currentPage - 1)}
              >
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            {pages.map((pageNum) => {
              return (
                <li
                  key={pageNum}
                  className={`page-item ${
                    pageNum === currentPage ? "active" : ""
                  }`}
                >
                  <a
                    className="page-link"
                    onClick={() => onPageChange(pageNum)}
                  >
                    {pageNum}
                  </a>
                </li>
              );
            })}

            <li
              className={`page-item ${
                currentPage === numberOfPages ? "disabled" : ""
              }`}
            >
              <a
                className="page-link"
                aria-label="Next"
                onClick={() => onPageChange(currentPage + 1)}
              >
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};

export default Pagination;
