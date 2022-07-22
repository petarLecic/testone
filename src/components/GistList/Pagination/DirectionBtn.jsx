import rectangle from 'assets/svgs/rectangle.svg'
import arrow from 'assets/svgs/arrow.svg'

function DirectionBtn({ direction, isDisabled, setCurrentPage }) {
    return (
        <button
            className={isDisabled ? 'pagination-btn-disabled' : 'pagination-btn'}
            disabled={isDisabled}
            onClick={() => direction === 'next' ? setCurrentPage(prev => prev + 1) : setCurrentPage(prev => prev - 1)}
        >
            <img src={rectangle} alt="rectangle"/>
            <img className={direction === 'next' ? 'arrow-btn-right' : 'arrow-btn-left'} src={arrow} alt="arrow"/>
        </button>
    )
}

export default DirectionBtn