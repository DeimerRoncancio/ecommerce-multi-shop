export default function DeleteForm() {
  const onSubmit = () => {
    console.log();
  }
  
  return (
    <form onSubmit={onSubmit}>
      <div className="mt-7 text-base border border-red-100 p-6 rounded-2xl text-black">
        <h2 className="mb-3 text-lg font-semibold text-red-400">Eliminar Cuenta</h2>
        <p className="text-[#4d5154] mb-3">
          Una vez eliminada tu cuenta, no podras deshacer los cambios. Por favor, asegurate.
        </p>
        <button className={`btn btn-error p-1 px-7 h-9`} type="submit">
          Eliminar cuenta
        </button>
      </div>
    </form>
  );
}
