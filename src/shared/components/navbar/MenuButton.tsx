export default function MenuButton() {
  return (
    <div className="flex justify-center items-center">
      <label className="btn btn-link decoration-transparent swap swap-rotate bg-transparent w-9 border-none shadow-none text-[#343e49] 
        hover:bg-transparent hover:border-none">
        <input type="checkbox" />
        <svg
          className="swap-off fill-current"
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 512 512">
          <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
        </svg>
        <svg
          className="swap-on fill-current"
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 512 512">
          <polygon
            points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
        </svg>
        <h2 className="text-2xl ml-10 font-medium text-[#343e49]">Menú</h2>
      </label>
    </div>
  )
}
