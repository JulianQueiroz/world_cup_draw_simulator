import { Slider } from "../ui/slider";
import { SliderContent } from "./style";

type Props = {
    title:string;
    sliderValue: number[]
    onChange: (value: number[]) => void
}


const SliderComponent = ({title,sliderValue, onChange}:Props) => {
    return(
        <SliderContent className="flex items-center">
            <h1>{title}</h1>
            <Slider  value={sliderValue} onValueChange={onChange} step={1} min={1} max={16} className="mx-auto w-full max-w-xs" />
            <h1 className="ml-4">{sliderValue}</h1>
        </SliderContent>
    )
};
export default SliderComponent