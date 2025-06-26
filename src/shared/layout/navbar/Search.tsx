export default function Seach() {
  return (
    <div className="w-full flex border-[1px] border-gray-700 rounded-full ps-7 justify-between">
      <input placeholder="Busca en Multi Shop" className="flex-1 placeholder:text-lg placeholder:text-[#8a949c]
        outline-none bg-[#f8fdef]"/>
      <button className="btn btn-ghost w-12 h-12 min-h-0 btn-circle p-2 border-white text-white bg-gray-700
        hover:bg-gray-800">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" className="w-full h-full" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    </div>
  )
}
