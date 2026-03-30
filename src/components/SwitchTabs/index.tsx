import { Tabs, TabsList, TabsTrigger } from "../ui/tabs"

type Props = {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
};

const SwitchTabs = ({activeTab,setActiveTab}:Props) => {
    
    return(
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList>
        <TabsTrigger value="groups">Fase de Grupos</TabsTrigger>
        <TabsTrigger value="knockout">Mata-Mata</TabsTrigger>
      </TabsList>
    </Tabs>
    )
}

export default SwitchTabs