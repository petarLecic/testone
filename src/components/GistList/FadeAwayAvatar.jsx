function FadeAwayAvatar({ avatar }) {
    return (
        avatar ? <img className="fade-away-avatar" src={avatar} alt="fade-away-avatar" /> : null
    )
}

export default FadeAwayAvatar