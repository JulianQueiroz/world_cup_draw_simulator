import { Slider } from "../ui/slider";
import { SliderContent } from "./style";

type Props = {
    title:string;
    sliderValue: number[]
    onChange: (value: number[]) => void
}


const SliderComponent = ({title,sliderValue, onChange}:Props) => {
    return(
        <SliderContent>
            <h1>{title}</h1>
            <Slider  value={sliderValue} onValueChange={onChange} step={1} min={1} max={16} className="mx-auto w-full max-w-xs" />
        </SliderContent>
    )
};
export default SliderComponent