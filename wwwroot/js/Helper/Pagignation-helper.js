
function ClearPagignation() {
    localStorage.removeItem(Paging.CURRENT_PAGE);
    localStorage.removeItem(Paging.HAS_NEXT);
    localStorage.removeItem(Paging.HAS_PREVIOUS);
    localStorage.removeItem(Paging.TOTAL_PAGES);
}

function InitializePagignation() {
    localStorage.setItem(Paging.CURRENT_PAGE, '1');
    localStorage.setItem(Paging.HAS_NEXT, 'false');
    localStorage.setItem(Paging.HAS_PREVIOUS, ' false');
}

function SetPagignation(data) {
    localStorage.setItem(Paging.CURRENT_PAGE, data.currentPage);
    localStorage.setItem(Paging.HAS_NEXT, data.hasNext);
    localStorage.setItem(Paging.HAS_PREVIOUS, data.hasPrevious);
    localStorage.setItem(Paging.TOTAL_PAGES, data.totalPages);
}

function GetPagignation() {
    var paging = {
        currentPage: parseInt(localStorage.getItem(Paging.CURRENT_PAGE)),
        hasNext: (localStorage.getItem(Paging.HAS_NEXT)),
        hasPrevious: (localStorage.getItem(Paging.HAS_PREVIOUS)),
        totalPages: parseInt(localStorage.getItem(Paging.TOTAL_PAGES))
    }
    return paging;
}

class Paging {
    static PAGE_SIZE = 'page-size';
    static PAGE_NUMBER = 'page-number';
    static TOTAL_PAGES = 'total-pages';
    static CURRENT_PAGE = 'current-page';
    static TOTAL_COUNT = 'total-count';
    static HAS_PREVIOUS = 'has-previous';
    static HAS_NEXT = 'has-next';
}
