function GistCard({ gist, setSelectedGist, isSelected, setFadeAwayAvatar }) {
    return (
        <div className="gist-card" onClick={() => {setSelectedGist(gist.id); setFadeAwayAvatar(gist.img)}}>
            <div className={isSelected ? 'avatar-wrapper-selected' : 'avatar-wrapper'}>
                <img className={isSelected ? 'avatar-selected' : 'avatar'} src={gist.img} alt="owner-utl" />
            </div>
            <h1 className={isSelected ? 'file-name-selected' : 'file-name'}>{gist.fileName}</h1>
        </div>
    )
}

export default GistCard