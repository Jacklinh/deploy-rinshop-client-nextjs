import { TypeProduct } from "@/types/type";
import productApi from "@/constanst/APIEndPoints/products";
import { globalSetting } from "@/constanst/configs";
import ButtonAddToCart from "../ButtonAddToCart";
import Link from "next/link";
import { formatPrice } from "@/utils/formatPrice";
import './ckeditor_article.css';
import ImageWithFallback from '../ImageWithFallback'
interface ProductDetailProps {
    slug: string;
}
export default async function ProductDetail({ slug }: ProductDetailProps) {
    const response = await productApi.getProductDetail(slug);
    const products = response.data;
    const product_detail = products.product_detail;
    const related_products = products.related_products;
    return (
        <>
            {
                product_detail && (
                    <>
                        <section className="sec_product_cate">
                            <div className="container mx-auto">
                                <div className="article_product_cate">
                                    <div className="product_cate_list">
                                        <div className="product_box product_box_detail">
                                            <div className="product_image">
                                                <ImageWithFallback
                                                    src={`${globalSetting.UPLOAD_DIRECTORY}/${product_detail.thumbnail}`}
                                                    width={500}
                                                    height={500}
                                                    alt={product_detail.product_name}
                                                    loading="lazy"
                                                />
                                            </div>
                                            <div className="product_detail">
                                                <h3>{product_detail.product_name}</h3>
                                                <p className='price_unit'>Đơn vị: {product_detail.unit}</p>
                                                <div className="product_price">
                                                    <p className='price'>
                                                        {
                                                            product_detail.discount > 0 ?
                                                                (
                                                                    <>
                                                                        <span className='product_discount'>Khuyến mãi giảm {formatPrice(product_detail.discount)} %</span>
                                                                        <del>{formatPrice(product_detail.price)} VNĐ</del>
                                                                        <span className='price_new'>{formatPrice(product_detail.price - (product_detail.price * product_detail.discount / 100))}</span>
                                                                    </>
                                                                ) :
                                                                (
                                                                    <span className='price_new'>{formatPrice(product_detail.price)}</span>
                                                                )
                                                        }

                                                    </p>
                                                    <p className="cate">Danh mục: {product_detail.category.category_name}</p>
                                                    <ButtonAddToCart
                                                        data={{
                                                            _id: product_detail._id,
                                                            product_name: product_detail.product_name,
                                                            price: product_detail.price,
                                                            discount: product_detail.discount,
                                                            thumbnail: product_detail.thumbnail,
                                                            quantity: 1,
                                                            stock: product_detail.stock
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="product_description">
                                            <article className="article-content" dangerouslySetInnerHTML={{ __html: product_detail.description || '' }}></article>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className="sec_related_products">
                            <div className="container mx-auto">
                                <div className="related_products">
                                    <h2 className="sec_heading">Sản phẩm liên quan</h2>
                                    <ul className="product_list">
                                        {
                                            related_products.map((p: TypeProduct) => (
                                                <li key={p._id}>
                                                    <div className="product_box">
                                                        <div className="product_image">
                                                            <Link href={`/product/${p.slug}`}>
                                                                <ImageWithFallback
                                                                    src={`${globalSetting.UPLOAD_DIRECTORY}/${p.thumbnail}`}
                                                                    width={500}
                                                                    height={500}
                                                                    alt={p.product_name}
                                                                    loading="lazy"
                                                                />
                                                            </Link>
                                                        </div>
                                                        <div className="product_detail">
                                                            <h3><Link href={`/product/${p.slug}`}>{p.product_name}</Link></h3>
                                                            <p className='price_unit'>{p.unit}</p>
                                                            <div className="product_price">
                                                                <p className='price'>
                                                                    {
                                                                        p.discount > 0 ?
                                                                            (
                                                                                <>
                                                                                    <span className="product_discount">{p.discount} %</span>
                                                                                    <del>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p.price)}</del>
                                                                                    <span className="price_new">
                                                                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p.price - (p.price * p.discount / 100))}
                                                                                    </span>
                                                                                </>
                                                                            ) :
                                                                            (
                                                                                <span className='price_new'>{p.price.toLocaleString('vi-VN')} VNĐ</span>
                                                                            )
                                                                    }

                                                                </p>

                                                            </div>
                                                        </div>
                                                        <ButtonAddToCart
                                                            data={{
                                                                _id: p._id,
                                                                product_name: p.product_name,
                                                                price: p.price,
                                                                discount: p.discount,
                                                                thumbnail: p.thumbnail,
                                                                quantity: 1,
                                                                stock: p.stock
                                                            }}
                                                        />
                                                    </div>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </div>
                        </section>
                    </>
                )
            }
        </>
    )
}
