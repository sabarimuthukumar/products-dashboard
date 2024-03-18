import ChartsProps from '../components/charts';
import Filters from '../components/filters';
import { useState } from 'react';
import { ChartData, ProductWithPriceProps } from '../types/dashboardTypes';
const Dashboard: React.FC = () => {

    const [totalProductsInCategory, setTotalProductsInCategory] = useState<ChartData[]>([]);
    const [productPriceDetails, setProductPriceDetails] = useState<(ProductWithPriceProps | null)[] | undefined>([]);

    const handleProductDetails = (newData: ChartData[]) => {
        setTotalProductsInCategory(newData);
    };

    const handlePriceDetails = (newData: (ProductWithPriceProps | null)[] | undefined) => {
        setProductPriceDetails(newData);
    };
    return (
        <div className="dashboard">
            <Filters productDetails={handleProductDetails} priceDetails={handlePriceDetails} />
            <ChartsProps productDetails={totalProductsInCategory} priceDetails={productPriceDetails} />
        </div>
    );
}

export default Dashboard;