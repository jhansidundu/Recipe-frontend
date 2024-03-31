const Pagination = ({ total, recodsPerPage, currentPage, onPageChange }) => {
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
            <li
              className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              onClick={() => onPageChange(currentPage - 1)}
            >
              <a className="page-link" aria-label="Previous">
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
                  onClick={() => onPageChange(pageNum)}
                >
                  <a className="page-link">{pageNum}</a>
                </li>
              );
            })}

            <li
              className={`page-item ${
                currentPage === numberOfPages ? "disabled" : ""
              }`}
              onClick={() => onPageChange(currentPage + 1)}
            >
              <a className="page-link" aria-label="Next">
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
