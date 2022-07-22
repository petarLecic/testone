import GistCard from 'components/GistList/GistCard'
import FadeAwayAvatar from 'components/GistList/FadeAwayAvatar'
import Pagination from 'components/GistList/Pagination/Pagination'
import { useEffect, useRef, useState } from 'react'
import { PUBLIC_GISTS } from 'service'
import { getLastPageFromHeaders } from 'functions'

function GistList() {
    const scrollToTop = useRef(null)
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [lastPage, setLastPage] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [gists, setGists] = useState([])
    const [selectedGist, setSelectedGist] = useState(null)
    const [fadeAwayAvatar, setFadeAwayAvatar] = useState(null)
    const perPage = 30

    // fetch gists
    useEffect(() => {
        let isMounted = true
        if (isMounted) setIsLoading(true)
        fetch(`${PUBLIC_GISTS}?since=1970-01-01T00:00:00-00:00&page=${currentPage}&per_page=${perPage}`)
            .then(res => {
                if (!lastPage) {
                    const lastPageNum = getLastPageFromHeaders([...res.headers])
                    if (isNaN(lastPageNum)) throw new Error('Last page number is NaN')
                    else if (isMounted) setLastPage(lastPageNum)
                }
                return res.json()
            })
            .then(res => {
                if (res.length < 1 && isMounted) setMessage('No gists found')
                else {
                    const newGists = res.map(gist => {
                        return {
                            id: gist.id,
                            img: gist.owner.avatar_url,
                            fileName: Object.keys(gist.files)[0]
                        }
                    })
                    if (isMounted) setGists(newGists)
                }
            })
            .catch((err) => {
                console.error('Gist fetch: ' + err.message)
                setMessage('An error occurred, please try again');
                setGists([]);
            })
            .finally(() => {
                setIsLoading(false)
            })
        
        return () => { isMounted = false}
    }, [lastPage, currentPage])

    // scroll to top
    useEffect(() => {
        if (scrollToTop) scrollToTop.current.scrollTo(0, 0)
    }, [gists])

    // clear fade-away avatar
    useEffect(() => {
        if (fadeAwayAvatar) {
            const timeout = setTimeout(() => {
                setFadeAwayAvatar(null)
            }, 1000)

            return () => clearTimeout(timeout)
        }
    }, [fadeAwayAvatar])

    return (
        <>
            <div ref={scrollToTop} className="gist-list">
                {
                    isLoading || message ? 
                        <div className="message-wrapper">
                            <h1 className="message">{isLoading ? 'Loading...' : message ? message : null}</h1>
                        </div>
                    :
                    gists.length > 0 ?
                        gists.map(gist => <GistCard key={gist.id} gist={gist} setSelectedGist={setSelectedGist} isSelected={selectedGist === gist.id} setFadeAwayAvatar={setFadeAwayAvatar}/>)
                    :
                    null
                }
                { fadeAwayAvatar ? <FadeAwayAvatar key={selectedGist} avatar={fadeAwayAvatar} /> : null }
            </div>
            { lastPage ? <Pagination lastPage={lastPage} currentPage={currentPage} setCurrentPage={setCurrentPage} /> : null }
        </>
    )
}

export default GistList