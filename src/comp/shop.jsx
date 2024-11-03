import React, { useState, useEffect } from 'react'
import { AiFillHeart, AiFillEye, AiOutlineClose } from 'react-icons/ai';
import axios from 'axios';
import './shop.css'


const Shop = ({ shop, Filter, allcatefilter, addtocart }) => {

    // Toggle Product Detail
    const [showDetail, setShowDetail] = useState(false)
    // Detail Page Data
    const [detail, setDetail] = useState([])
    //Showing Detail Box
    const detailpage = (product) => {
        const detaildata = ([{ product }])
        const productdetail = detaildata[0]['product']
        // console.log(productdetail)
        setDetail(productdetail)
        setShowDetail(true)
    }
    const closedetail = () => {
        setShowDetail(false)
    }



    const [productsAll, setProductsAll] = useState([]);
    // Fetch all products from the server
    useEffect(() => {
        const fetchProductsAll = async () => {
            try {
                const response = await axios.get('http://localhost:8081/products');
                setProductsAll(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProductsAll();
    }, []);




    return (
        <>

            {
                showDetail ?
                    <>
                        <div className='product_detail'>
                            <button className='close_btn' onClick={closedetail}><AiOutlineClose /></button>
                            <div className='container'>
                                <div className='img_box'>
                                    <img src={detail.image} alt=''></img>
                                </div>
                                <div className='info'>
                                    <h4># {detail.cat}</h4>
                                    <h2>{detail.Name}</h2>
                                    <p>A Searchcreen Everyone Will Love: Whether your family is streaming or video chatting with friends tablet A8...</p>
                                    <h3>${detail.price}</h3>
                                    <button onClick={() => addtocart(detail)}>Add To Cart</button>
                                </div>
                            </div>
                        </div>
                    </>
                    : null
            }


            <div className='shop'>
                <h2 style={{ fontWeight: "bold", color: "#cd1e76" }}># shop</h2>

                <div style={{zIndex:"20", marginTop:"40px"}}  className='container'>
                    <div className='left_box'>
                        <div className='category'>
                            {/* <div className='header'>
                                <h3>all categories</h3>
                            </div> */}
                            <div className='box'>
                            <h3>all categories</h3>
                                <ul>
                                    <li onClick={() => allcatefilter()}># All</li>
                                    <li onClick={() => Filter("clothing")}># Clothing</li>
                                    <li onClick={() => Filter("tech")}># Tech Accessories</li>
                                    <li onClick={() => Filter("shoes")}># Shoes</li>
                                    <li onClick={() => Filter("kids")}># Kids Fashion</li>
                                    <li onClick={() => Filter("cosm")}># Cosmetics</li>
                                    <li onClick={() => Filter("sports")}># Activewear</li>
                                   
                                </ul>
                            </div>
                        </div>
                        <div className='banner'>
                            <div className='img_box'>
                                <img src='image/shopB21.png' alt=''></img>
                            </div>
                        </div>
                    </div>

                    <div className='right_box'>
                        <div className='banner'>
                            <div className='img_box'>
                                <img src='image/shop_top1.jpg' alt=''></img>
                            </div>
                        </div>
                        <div className='product_box'>
                            <h2>Shop Product</h2>
                            <div className='product_container'>
                                {
                                    shop.map((curElm) => {
                                        return (
                                            <>
                                                <div className='box'>
                                                    <div className='img_box'>
                                                        <img src={curElm.image} alt=''></img>
                                                        <div className='icon'>
                                                            <li><AiFillHeart /></li>
                                                            <li ><AiFillEye /></li>
                                                        </div>
                                                    </div>
                                                    <div className='detail'>
                                                        <h3>{curElm.Name}</h3>
                                                        <p>$ {curElm.price}</p>
                                                        <button onClick={() => addtocart(curElm)}>Add To Cart</button>

                                                    </div>
                                                </div>
                                            </>
                                        )
                                    })
                                }
                                {
                                    productsAll.map((curElm) => {
                                        return (
                                            <>
                                                <div className='box'>
                                                    <div className='img_box'>
                                                        <img
                                                            src={`data:${curElm.mime_type};base64,${curElm.image}`}
                                                            alt={curElm.Product_Name}
                                                            width="100"
                                                        />
                                                        <div className='icon'>
                                                            <li><AiFillHeart /></li>
                                                            <li ><AiFillEye /></li>
                                                        </div>
                                                    </div>
                                                    <div className='detail'>
                                                        <h3>{curElm.Product_Name}</h3>
                                                        <p>$ {curElm.Price}</p>
                                                        <button onClick={() => addtocart(curElm)}>Add To Cart</button>

                                                    </div>
                                                </div>
                                            </>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Shop