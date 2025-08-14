import { CiHeart } from "react-icons/ci";
import { FiZap } from "react-icons/fi";
import { IoMdStarOutline } from "react-icons/io";

export function WarrantyCard() {
  return (
    <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-0 rounded-3xl mt-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div>
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <FiZap className="w-6 h-6 text-blue-600" />
          </div>
          <p className="font-medium">Rapido envío</p>
          <p className="text-sm text-gray-600">Envío gratuito en 2 días</p>
        </div>
        <div>
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <IoMdStarOutline className="w-6 h-6 text-green-600" />
          </div>
          <p className="font-medium">1 año de garantia</p>
          <p className="text-sm text-gray-600">Completa cobertura</p>
        </div>
        <div>
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <CiHeart className="w-6 h-6 text-purple-600" />
          </div>
          <p className="font-medium">Devolución: 30 días</p>
          <p className="text-sm text-gray-600">Sin preguntas</p>
        </div>
      </div>
    </div>
  );
}
