type UserUpdateAlertProps = {
  showAlert: boolean;
  closeAlert: () => void
}

export default function UserUpdateAlert({ showAlert, closeAlert }: UserUpdateAlertProps) {
  return (
    <div role="alert" className={`alert alert-success fixed bottom-5 right-5 transition-all duration-300
      ${showAlert ? 'opacity-100 visible -translate-x-0' : 'opacity-0 invisible translate-x-full'}`}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Tus datos han sido actualizados!</span>
        <button className="btn btn-sm bg-[#186c56] border-none text-[#053b2d] shadow-none rounded-full p-0 m-0 h-fit
        ml-10" onClick={closeAlert}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>
  )
}
