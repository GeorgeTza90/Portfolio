const useFormatTime = (time, ref) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const full = ref.current.duration
    const fullTime = `${Math.floor(full / 60)}:${Math.floor(full % 60) < 10 ? "0" : ""}${Math.floor(full % 60)}  `

    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds} / ${fullTime}`
}

export default useFormatTime;