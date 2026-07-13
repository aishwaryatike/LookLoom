import ProductDetails from "@/components/ProductDetails";
import { router, useLocalSearchParams } from "expo-router";

export default function ProductDetailsScreen() {
    const params = useLocalSearchParams();

    return (
        <ProductDetails
            image={params.image as string}
            name={params.name as string}
            description="Premium quality clothing designed for everyday comfort and style."
            price={Number(params.price)}
            rating={Number(params.rating)}
            reviews={128}
            onBack={() => router.back()}
            onAddToCart={(data) => {
                console.log(data);
            }}
        />
    );
}