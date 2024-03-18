import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ChartData, FilterProps, Product, ProductWithPriceProps } from '../types/dashboardTypes';

const Filters: React.FC<FilterProps> = ({ productDetails, priceDetails }) => {
    const [categoryList, setCategoryList] = useState<string[]>([]);
    const [currentCategory, setCurrentCategory] = useState<string>('');
    const [productList, setProductList] = useState<Product[]>([]);
    const [currentProducts, setCurrentProducts] = useState<string[]>([]);
    const [selectProductDisabled, setSelectProductDisabled] = useState<boolean>(true);
    const [runDisabled, setRunDisabled] = useState<boolean>(true);
    const [totalProductsInCategory, setTotalProductsInCategory] = useState<ChartData[]>([]);
    const [allProductPrice, setAllProductsPrice] = useState<(ProductWithPriceProps | null)[]>();
    const titles: string[] = productList.map((item) => item.title);

    useEffect(() => {
        fetch('https://dummyjson.com/products/categories/')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('fetch categories failed');
                }
                return response.json();
            })
            .then((data) => {
                setCategoryList(data);
                setProductList([]);
            })
            .catch((error) => {
                console.error('something went wrong', error);
            })
    }, [])

    useEffect(() => {
        categoryList.forEach((category) => {
            fetch(`https://dummyjson.com/products/category/${category}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('fetch product failed');
                    }
                    return response.json();
                })
                .then((data) => {
                    setTotalProductsInCategory((prev) => [...prev, { name: category, y: data.total }]);
                })
                .catch((error) => {
                    console.error('something went wrong', error);
                })
        })
    }, [categoryList])

    useEffect(() => {
        if (currentCategory) {
            fetch(`https://dummyjson.com/products/category/${currentCategory}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('fetch product failed');
                    }
                    return response.json();
                })
                .then((data) => {
                    setProductList(data.products);
                })
                .catch((error) => {
                    console.error('something went wrong', error);
                })
        }
    }, [currentCategory])

    useEffect(() => {
        priceDetails(allProductPrice);
    }, [allProductPrice])

    useEffect(() => {
        productDetails(totalProductsInCategory);
    }, [totalProductsInCategory])

    const selectCategory = (event: SelectChangeEvent<string>) => {
        setCurrentCategory(event.target.value as string);
        setSelectProductDisabled(false);
        setRunDisabled(false);
        setCurrentProducts([]);
    };

    const selectProduct = (event: SelectChangeEvent<typeof currentProducts>) => {
        const { target: { value }, } = event;
        setCurrentProducts(typeof value === 'string' ? value.split(',') : value);
        setRunDisabled(false);
    };

    const handleClearButton = () => {
        setCurrentCategory('');
        setProductList([]);
        setCurrentProducts([]);
        setSelectProductDisabled(true);
        setRunDisabled(true);
        priceDetails([]);
    }

    const runReportButton = () => {
        let productWithPrice;
        if (currentProducts.length < 1) {
            productWithPrice = productList.map((item) => {
                return {
                    product: item.title,
                    price: item.price
                }
            })
        }
        else {
            productWithPrice = productList.map((item) => {
                if (currentProducts.includes(item.title)) {
                    return {
                        product: item.title,
                        price: item.price
                    }
                }
                return null
            }).filter((item) => item !== null);
        }
        productWithPrice && setAllProductsPrice(productWithPrice);
        setRunDisabled(true);
    }

    return (
        <div className="filters">
            <div className='dropdown-wrapper'>
                <Button variant="text" onClick={handleClearButton} style={{ float: 'right', marginBottom: '12px' }}>{`clear`}</Button>
                <FormControl fullWidth style={{ marginBottom: '40px' }}>
                    <InputLabel id={`label-category`}>{`Select category`}</InputLabel>
                    <Select
                        labelId={`select-category`}
                        id={`select-category`}
                        value={currentCategory}
                        onChange={(event) => selectCategory(event)}
                        disabled={false}
                    >
                        {
                            categoryList.map((item, index) => {
                                return (
                                    <MenuItem key={index} value={item}>{item}</MenuItem>
                                )
                            })
                        }
                    </Select>
                </FormControl >
                <FormControl fullWidth style={{ marginBottom: '40px' }}>
                    <InputLabel id={`label-product`}>{`Select product`}</InputLabel>
                    <Select
                        labelId={`select-product`}
                        id={`select-product`}
                        value={currentProducts}
                        onChange={(event) => selectProduct(event)}
                        disabled={selectProductDisabled}
                        multiple
                    >
                        {
                            titles.map((item, index) => {
                                return (
                                    <MenuItem key={index} value={item}>{item}</MenuItem>
                                )
                            })
                        }
                    </Select>
                </FormControl>
                <Button variant="outlined" onClick={runReportButton} disabled={runDisabled}>{`Run Report`}</Button>
            </div>
        </div>
    )
}

export default Filters;