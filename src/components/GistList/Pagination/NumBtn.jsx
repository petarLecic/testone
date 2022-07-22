function NumBtn({ num, currentPage, setCurrentPage }) {
    return (
        <button
            className={currentPage === num ? 'page-num-current' : 'page-num'}
            disabled={currentPage === num}
            onClick={() => setCurrentPage(num)}
        >{num}
        </button>
    )
}

export default NumBtn