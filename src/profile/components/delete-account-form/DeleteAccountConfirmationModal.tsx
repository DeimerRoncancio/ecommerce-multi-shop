import { TiWarningOutline } from "react-icons/ti";
import { GoDatabase } from "react-icons/go";
import { FiUser } from "react-icons/fi";
import { GrConfigure } from "react-icons/gr";
import { TbAccessPoint } from "react-icons/tb";

export default function DeleteAccountConfirmationModal() {
  return (
    <div className="fixed w-full h-full bg-[#1c1c1c7c] top-0 left-0 z-20 flex justify-center items-center">
      <div className={`flex flex-col z-20 bg-white w-[446px] text-[#212529] min-h-[164px]
      rounded-lg transition-all duration-150 p-6 gap-3`}>
        <div className="bg-[#ffedd5] p-2 w-fit rounded-lg">
          <TiWarningOutline size={25} color="#ff6467" />
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold text-gray-900">Eliminar cuenta</h2>
          <p className="text-sm text-gray-600">
            Esta acción no se puede deshacer. Tu cuenta y todos los datos
            asociados serán eliminados permanentemente.
          </p>
        </div>
        <div className="p-3 rounded-xl bg-orange-50/80 border border-orange-100">
          <div className="text-sm text-[#71717a]">
            <h4 className="flex items-center gap-1 font-semibold">
              <GoDatabase className="text-orange-600" />
              Se eliminará:
            </h4>
            <ul className="p-2 space-y-2">
              <li className="flex items-center gap-2">
                <div className="p-1 bg-orange-100 text-orange-600 rounded-md">
                  <FiUser />
                </div>
                Todos tus datos personales
              </li>
              <li className="flex items-center gap-2">
                <div className="p-1 bg-orange-100 text-orange-600 rounded-md">
                  <GrConfigure />
                </div>
                Configuraciones y preferencias
              </li>
              <li className="flex items-center gap-2">
                <div className="p-1 bg-orange-100 text-orange-600 rounded-md">
                  <TbAccessPoint />
                </div>
                Acceso a algunos servicios
              </li>
            </ul>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="btn rounded-sm">Cancelar</div>
          <div className={`btn rounded-sm btn-error`}>
            Eliminar definitivamente
          </div>
        </div>
      </div>
    </div>
  );
}
