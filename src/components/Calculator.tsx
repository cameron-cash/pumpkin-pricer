import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

enum Measurements {
    Cost = "cost",
    Circumference = "circumference",
    Height = "height",
}

export default function Calculator() {
    const [cost, setCost] = useState(0.60);
    const [circumference, setCircumference] = useState(0);
    const [height, setHeight] = useState(0);
    const [price, setPrice] = useState(0);
    const [measurement, setMeasurement] = useState("metric");

    useEffect(() => {
        if (cost === 0 || circumference === 0 || height === 0) {
            return;
        }

        let weight = 2.971766854 + (circumference * -0.017162338) + (height * -0.475716357) + (circumference * height * 0.008500845);

        if (measurement === "imperial") {
            // Convert kg to lbs
            weight = weight * 2.20462;
        }

        let newPrice = weight * cost;
        setPrice(parseFloat(newPrice.toFixed(2)));
    }, [cost, circumference, height, measurement]);

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        let measurement = e.target.name as Measurements;
        switch (measurement) {
            case Measurements.Cost:
                setCost(parseFloat(e.target.value));
                break;
            case Measurements.Circumference:
                setCircumference(parseFloat(e.target.value));
                break;
            case Measurements.Height:
                setHeight(parseFloat(e.target.value));
                break;
        }

        if (parseFloat(e.target.value) < 0 || parseFloat(e.target.value) === 0) {
            setPrice(0);
        }
    }

    return (
        <div className="flex flex-col space-y-4 bg-stone-50 max-w-md w-full p-8 md:rounded-lg shadow-lg">
            <h1 className="text-xl font-semibold">Pumpkin Price Calculator</h1>
            <Tabs defaultValue="metric">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="metric" onClick={() => setMeasurement("metric")}>Metric</TabsTrigger>
                    <TabsTrigger value="imperial" onClick={() => setMeasurement("imperial")}>Imperial</TabsTrigger>
                </TabsList>
                <TabsContent value="metric">
                    <form className="flex flex-col space-y-4">
                        <Label htmlFor="cost">Cost (&#xa2;/kg)</Label>
                        <Input type="number" name="cost" min="0" step="0.01" value={cost} onChange={handleInputChange} />
                        <Label htmlFor="circumference">Circumference (cm)</Label>
                        <Input type="number" name="circumference" min="0" step="0.1" value={circumference} onChange={handleInputChange} />
                        <Label htmlFor="height">Height (cm)</Label>
                        <Input type="number" name="height" min="0" step="1" value={height} onChange={handleInputChange} />
                    </form>
                </TabsContent>
                <TabsContent value="imperial">
                    <form className="flex flex-col space-y-4">
                        <Label htmlFor="cost">Cost (&#xa2;/lb)</Label>
                        <Input type="number" name="cost" min="0" step="0.01" value={cost} onChange={handleInputChange} />
                        <Label htmlFor="circumference">Circumference (cm)</Label>
                        <Input type="number" name="circumference" min="0" step="0.1" value={circumference} onChange={handleInputChange} />
                        <Label htmlFor="height">Height (cm)</Label>
                        <Input type="number" name="height" min="0" step="1" value={height} onChange={handleInputChange} />
                    </form>
                </TabsContent>
            </Tabs>

            {price > 0 ? (
                <div className="flex flex-col items-center bg-green-400 rounded-lg p-2 text-white">
                    <p className="text-lg font-bold">Estimated Price</p>
                    <p className="text-lg font-bold  text-center w-full">${price.toFixed(2)}</p>
                </div>
            ) : null}
        </div>
    )
}