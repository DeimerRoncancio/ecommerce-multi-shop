import useGetProducts from "../../shared/hooks/api/useGetProducts"

export default function WishList() {
  const { products } = useGetProducts();

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl text-[#5e472d]">Lista de deseos</h2>
        <button className="btn">Agregar el carrito</button>
      </div>
      <div>
        <ul className="flex flex-wrap gap-6">
          {
            products.map(product => (
              <li key={product.id} className="bg-white border border-[#e5e7eb] hover:border-[#ea5721] z-10
              rounded-2xl transition-all duration-300">
                <div className="w-[243px] h-40 rounded-2xl overflow-hidden">
                  <img
                    src={product.productImages[0].imageUrl}
                    className="w-full h-full object-contain rounded-2xl hover:scale-110 transition-all duration-300"
                    alt=""
                  />
                </div>
                <div className="flex flex-col p-4 gap-1 bg-white rounded-2xl">
                  <h2 className="text-[#5e472d] text-base">{product.productName}</h2>
                  <div className="flex items-center gap-1 text-sm">
                    <div className="rating w-20">
                      <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" aria-label="1 star" defaultChecked/>
                      <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" aria-label="2 star" defaultChecked />
                      <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" aria-label="3 star" defaultChecked/>
                      <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" aria-label="4 star" />
                      <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" aria-label="5 star" />
                    </div>
                    <p className="text-[#8c8e91]">(4/3)</p>
                  </div>
                  <p className="text-[#5e4a2d] text-lg font-semibold">$ {new Intl.NumberFormat("es-ES").format(product.price)}</p>
                  <button className="btn btn-neutral mt-3">Agregar al carrito</button>
                </div>
              </li>
            ))
          }
        </ul>
      </div>
    </>
  )
}
