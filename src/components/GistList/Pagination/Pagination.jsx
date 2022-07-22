import DirectionBtn from 'components/GistList/Pagination/DirectionBtn'
import NumBtn from 'components/GistList/Pagination/NumBtn'

function Pagination({ lastPage, currentPage, setCurrentPage }) {
    return (
        <div className="pagination">
            <div className="pagination-numbers">
                <NumBtn num={1} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                <NumBtn num={2} currentPage={currentPage} setCurrentPage={setCurrentPage} />

                <span className="pagination-dots">...</span>
                { 
                    currentPage > 2 && currentPage < lastPage -1 ? 
                    <>
                        <NumBtn num={currentPage} currentPage={currentPage}/> 
                        <span className="pagination-dots">...</span>
                    </>
                    : null
                }

                <NumBtn num={lastPage - 1} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                <NumBtn num={lastPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            </div>
            <div className="pagination-btns">
                <DirectionBtn direction={'prev'} isDisabled={currentPage === 1} setCurrentPage={setCurrentPage} />
                <DirectionBtn direction={'next'} isDisabled={currentPage === lastPage} setCurrentPage={setCurrentPage} />
            </div>
        </div>
    )
}

export default Pagination