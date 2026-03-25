import { Slider } from "../ui/slider";
import { SliderContent } from "./style";

const SliderComponent = () => {
    return(
        <SliderContent>
            <h1>Configuração dos grupos</h1>
            <Slider defaultValue={[75]} max={100} step={1} className="mx-auto w-full max-w-xs" />
        </SliderContent>
    )
};
export default SliderComponent