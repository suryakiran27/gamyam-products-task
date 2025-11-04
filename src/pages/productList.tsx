import { useNavigate } from "react-router-dom";
import { CiBoxList, CiEdit, CiSquarePlus } from "react-icons/ci";
import { CiGrid41 } from "react-icons/ci";
import { useMemo, useState } from "react";
import { setCurrentPage, setViewMode, type ProductInterface } from "../features/products/productSlice";
import { useAppDispatch, useAppSelector } from "../features/hooks";
import { useDebounce } from "../hooks/useDebounce";
import ReactPaginate from 'react-paginate';
import { Loader } from "../components/loader";
import { NoDatFound } from "../components/no-data";

const ProductList = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { products, viewMode, itemsPerPage, currentPage } = useAppSelector((state) => state.products)
    const [searchValue, setSearchValue] = useState('');
    const debouncedSearch = useDebounce(searchValue, 500);
    const [isLoading, setIsLoading] = useState(true);

    // const ITEMS_PER_PAGE = 9;
    // filter product by search 
    const filteredProducts = useMemo(() => {
        if (!debouncedSearch) return products;
        return products.filter((product) => product.name.toLowerCase().includes(debouncedSearch.toLowerCase()))
    }, [debouncedSearch, products])

    const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginateProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage)

    const gotoAddProductHandler = (type: string, id?: number,) => {
        if (type === "add") {
            navigate('/add-product')
        } else {
            navigate(`/edit-product/${id}`)
        }
    }


    return (
        <div>
            {
                isLoading ? <Loader loading={isLoading} setLoading={setIsLoading} /> : <>
                    <div className='border-shadow p-4 m-2 flex justify-between justify-items-center'>
                        <div>
                            {/* <label htmlFor="Search">Search Product</label> */}
                            <input type='text' value={searchValue} onChange={(event) => setSearchValue(event.target.value)} className='input-field' placeholder='Product Name' />
                        </div>
                        <div className="flex gap-5">
                            <div className="flex gap-2 toggle-btn">
                                <div onClick={() => dispatch(setViewMode('list'))} className={`${viewMode === 'list' && 'active-view'} `}>
                                    <CiBoxList size={25} />
                                </div>
                                <div className="vertical-line" />
                                <div onClick={() => dispatch(setViewMode('card'))} className={`${viewMode === 'card' && 'active-view'}`}>
                                    <CiGrid41 size={25} />
                                </div>
                            </div>
                            <button className='button flex gap-2' onClick={() => gotoAddProductHandler('add')}> <CiSquarePlus size={25} />  Add Product</button>
                        </div>
                    </div>
                    <div>
                        {paginateProducts.length === 0 && <NoDatFound message="No Products Found" />}
                        {
                            viewMode === "list" ? <div className="list-view">
                                {paginateProducts.length ? paginateProducts.map((product: ProductInterface) => (
                                    <div key={product.id}>
                                        <div className="list-item">
                                            <p className="p-2 text-center">{product.id}</p>
                                            <p className="list-column p-2">{product.name}</p>
                                            <p className="list-column p-2">{product.description}</p>
                                            <p className="list-column p-2 text-right">{product.category}</p>
                                            <p className="list-column p-2 text-right">{product.stock}</p>
                                            <div className="mt-4 ms-12 cursor-pointer">
                                                <CiEdit size={25} onClick={() => gotoAddProductHandler('edit', product.id)} />
                                            </div>
                                        </div>
                                    </div>)) : ""} </div> :
                                <div className="card-view">
                                    {paginateProducts.length ? paginateProducts.map((product: ProductInterface) => (
                                        <div key={product.id} className="card-item" onClick={() => gotoAddProductHandler('edit', product.id)}>
                                            <h5>{product?.name}</h5>
                                            <p>{product?.description}</p>
                                            <p>{product?.category}</p>
                                            <p>{product?.stock}</p>
                                            <p>{product?.isActive}</p>
                                        </div>
                                    )) : ""}
                                </div>}
                        <div className="">
                            {
                                <ReactPaginate
                                    breakLabel="..."
                                    pageCount={pageCount}
                                    nextLabel=">"
                                    pageRangeDisplayed={3}
                                    previousLabel="<"
                                    onPageChange={(pages) => {
                                        dispatch(setCurrentPage(pages.selected + 1))
                                    }}
                                    renderOnZeroPageCount={null}
                                    forcePage={currentPage - 1}
                                    containerClassName={"pagination"}
                                    pageClassName={"page-item"}
                                    pageLinkClassName={"page-link"}
                                    activeClassName={"active"}
                                    previousClassName={"page-item"}
                                    previousLinkClassName={"page-link"}
                                    nextClassName={"page-item"}
                                    nextLinkClassName={"page-link"}
                                    breakClassName={"page-item"}
                                    breakLinkClassName={"page-link"}
                                />
                            }
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default ProductList;