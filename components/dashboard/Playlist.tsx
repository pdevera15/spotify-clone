const Playlist = () => {
  return (
    <>
      <div className="flex justify-between items-baseline">
        <h1 className="text-4xl">My Playlist</h1>
        <h1 className="text-sm text-slate-500">Show all</h1>
      </div>
      <table className="min-w-full border-collapse">
        <thead className="text-xs text-slate-500 text-left">
          <tr>
            <th className="py-3 text-center">#</th>
            <th className="py-3">TITLE</th>
            <th className="py-3">ARTIST</th>
            <th className="py-3">TIME</th>
            <th className="py-3">ALBUM</th>
          </tr>
        </thead>
        <tbody className="text-left text-slate-700">
          <tr>
            <th className="py-3 text-center">01</th>
            <th className="py-3">SAMPLE TITLE</th>
            <th className="py-3">SAMPLE ARTIST</th>
            <th className="py-3">99:99</th>
            <th className="py-3">SAMPLE ALBUM</th>
          </tr>
          <tr className="bg-white rounded-xl">
            <th className="py-3 text-center">01</th>
            <th className="py-3">SAMPLE TITLE</th>
            <th className="py-3">SAMPLE ARTIST</th>
            <th className="py-3">99:99</th>
            <th className="py-3">SAMPLE ALBUM</th>
          </tr>
          <tr>
            <th className="py-3 text-center">01</th>
            <th className="py-3">SAMPLE TITLE</th>
            <th className="py-3">SAMPLE ARTIST</th>
            <th className="py-3">99:99</th>
            <th className="py-3">SAMPLE ALBUM</th>
          </tr>
        </tbody>
      </table>
    </>
  )
}

export default Playlist
